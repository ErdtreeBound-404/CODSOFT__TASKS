import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { spawn, ChildProcess } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const CSV_FILE = path.join(__dirname, 'captured_packets.csv');
const REPLAY_FILE = path.join(__dirname, 'replay_packets.csv');
const PYTHON_SCRIPT = path.join(__dirname, 'packet_analyzer.py');

app.use(express.json());

// Track active Python capture process
let activePythonProcess: ChildProcess | null = null;
let replayTimer: ReturnType<typeof setTimeout> | null = null;
let replayRows: ReplayPacket[] = [];
let replayIndex = 0;
let replayStartMs = 0;
let replaySpeed = 1;
let captureState = {
  isCapturing: false,
  mode: 'all',
  startedAt: null as string | null,
  packetsCapturedThisSession: 0,
};

// Helper: Ensure CSV file exists with header
function ensureCsvFile() {
  if (!fs.existsSync(CSV_FILE) || fs.statSync(CSV_FILE).size === 0) {
    fs.writeFileSync(
      CSV_FILE,
      'time,source,destination,protocol,length,data,alert\n',
      'utf8'
    );
  }
}
ensureCsvFile();

// Replay packet schema. The uploaded 1,000-packet CSV is the source of truth.
type ReplayPacket = {
  sourceTime: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  data: string;
  alert: string;
  offsetMs: number;
};

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') { current += '"'; i++; }
      else quoted = !quoted;
    } else if (ch === ',' && !quoted) {
      values.push(current); current = '';
    } else current += ch;
  }
  values.push(current);
  return values;
}

function timeToSeconds(value: string): number {
  const [h, m, sec] = value.trim().split(':').map(Number);
  return (h || 0) * 3600 + (m || 0) * 60 + (sec || 0);
}

function loadReplayRows(mode = 'all'): ReplayPacket[] {
  if (!fs.existsSync(REPLAY_FILE)) return [];
  const content = fs.readFileSync(REPLAY_FILE, 'utf8').trim();
  const lines = content.split(/\r?\n/);
  if (lines.length <= 1) return [];
  const header = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
  const idx = (name: string) => header.indexOf(name);
  const timeIdx = idx('time'), sourceIdx = idx('source'), destIdx = idx('destination');
  const protoIdx = idx('protocol'), lengthIdx = idx('length'), dataIdx = idx('data'), alertIdx = idx('alert');
  const firstTime = timeIdx >= 0 ? timeToSeconds(parseCsvLine(lines[1])[timeIdx]) : 0;
  const rows: ReplayPacket[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const p = parseCsvLine(lines[i]);
    const protocol = (p[protoIdx] || 'TCP').toUpperCase();
    if (mode !== 'all' && protocol.toLowerCase() !== mode) continue;
    const sourceTime = p[timeIdx] || '00:00:00';
    let offsetMs = Math.max(0, (timeToSeconds(sourceTime) - firstTime) * 1000);
    // Keep replay monotonic if the source crosses midnight.
    if (rows.length && offsetMs < rows[rows.length - 1].offsetMs) offsetMs = rows[rows.length - 1].offsetMs;
    rows.push({
      sourceTime,
      source: p[sourceIdx] || '',
      destination: p[destIdx] || '',
      protocol,
      length: Number(p[lengthIdx]) || 0,
      data: p[dataIdx] || '',
      alert: p[alertIdx] || '',
      offsetMs,
    });
  }
  return rows;
}

function formatLocalTime(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleTimeString('en-GB', { hour12: false });
}

function resetCapturedCsv() {
  fs.writeFileSync(CSV_FILE, 'time,source,destination,protocol,length,data,alert\n', 'utf8');
}

function stopReplay() {
  if (replayTimer) clearTimeout(replayTimer);
  replayTimer = null;
  replayRows = [];
  replayIndex = 0;
}

function emitNextReplayPacket() {
  if (!captureState.isCapturing || replayIndex >= replayRows.length) {
    replayTimer = null;
    if (replayIndex >= replayRows.length) captureState.isCapturing = false;
    return;
  }
  const row = replayRows[replayIndex];
  const displayTime = formatLocalTime(replayStartMs + row.offsetMs / replaySpeed);
  const csvRow = [displayTime, row.source, row.destination, row.protocol, row.length, row.data, row.alert]
    .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',') + '\n';
  fs.appendFileSync(CSV_FILE, csvRow, 'utf8');
  captureState.packetsCapturedThisSession++;
  replayIndex++;
  if (replayIndex < replayRows.length) {
    const delay = Math.max(0, (replayRows[replayIndex].offsetMs - row.offsetMs) / replaySpeed);
    replayTimer = setTimeout(emitNextReplayPacket, delay);
  } else {
    replayTimer = null;
    captureState.isCapturing = false;
  }
}

function readPacketsFromCsv(): Array<{ id: number; time: string; source: string; destination: string; protocol: string; length: number; data: string; alert: string }> {
  ensureCsvFile();
  try {
    const content = fs.readFileSync(CSV_FILE, 'utf8').trim();
    if (!content) return [];
    const lines = content.split(/\r?\n/);
    if (lines.length <= 1) return [];
    const header = parseCsvLine(lines[0]).map((h) => h.trim().toLowerCase());
    const idx = (name: string) => header.indexOf(name);
    const out: Array<{ id: number; time: string; source: string; destination: string; protocol: string; length: number; data: string; alert: string }> = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const p = parseCsvLine(lines[i]);
      out.push({ id: out.length + 1, time: p[idx('time')] || '', source: p[idx('source')] || '', destination: p[idx('destination')] || '', protocol: p[idx('protocol')] || '', length: Number(p[idx('length')]) || 0, data: p[idx('data')] || '', alert: p[idx('alert')] || '' });
    }
    return out;
  } catch (err) { console.error('Error reading CSV:', err); return []; }
}

// -------------------------------------------------------------
// REST API ENDPOINTS
// -------------------------------------------------------------

// 1. Get backend status & capture metrics
app.get('/api/status', (req, res) => {
  ensureCsvFile();
  const stat = fs.statSync(CSV_FILE);
  const packets = readPacketsFromCsv();

  res.json({
    isCapturing: captureState.isCapturing,
    mode: captureState.mode,
    startedAt: captureState.startedAt,
    sessionPackets: captureState.packetsCapturedThisSession,
    totalCsvPackets: packets.length,
    csvSizeBytes: stat.size,
    csvFilePath: 'captured_packets.csv',
    pythonScript: 'packet_analyzer.py',
  });
});

// 2. Get captured packets from CSV
app.get('/api/packets', (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 500;
  const protocol = (req.query.protocol as string)?.toUpperCase();
  let packets = readPacketsFromCsv();

  if (protocol && protocol !== 'ALL') {
    packets = packets.filter((p) => p.protocol === protocol);
  }

  // Return last `limit` packets
  if (limit > 0 && packets.length > limit) {
    packets = packets.slice(-limit);
  }

  res.json({
    total: packets.length,
    packets,
  });
});

// 3. Start 1,000-packet timed replay
app.post('/api/capture/start', (req, res) => {
  const { mode = 'all', speed = 1 } = req.body;
  const captureMode = ['all', 'tcp', 'udp', 'icmp'].includes(String(mode).toLowerCase()) ? String(mode).toLowerCase() : 'all';
  const requestedSpeed = Number(speed);
  replaySpeed = Number.isFinite(requestedSpeed) && requestedSpeed > 0 ? requestedSpeed : 1;
  stopReplay();
  resetCapturedCsv();
  replayRows = loadReplayRows(captureMode);
  replayIndex = 0;
  replayStartMs = Date.now();
  captureState = { isCapturing: replayRows.length > 0, mode: captureMode, startedAt: new Date(replayStartMs).toISOString(), packetsCapturedThisSession: 0 };
  if (replayRows.length > 0) emitNextReplayPacket();
  res.json({ status: 'started', mode: captureMode, replaySpeed, sourcePackets: replayRows.length, message: `Timed replay started from replay_packets.csv at ${replaySpeed}x speed` });
});

// 4. Stop timed replay
app.post('/api/capture/stop', (req, res) => {
  stopReplay();
  captureState.isCapturing = false;
  res.json({ status: 'stopped', message: 'Timed packet replay halted. Data saved to captured_packets.csv' });
});

// 5. Download captured_packets.csv file
app.get('/api/download-csv', (req, res) => {
  ensureCsvFile();
  res.download(CSV_FILE, 'captured_packets.csv');
});

// 6. Clear CSV file
app.post('/api/clear-csv', (req, res) => {
  fs.writeFileSync(
    CSV_FILE,
    'time,source,destination,protocol,length,data,alert\n',
    'utf8'
  );
  captureState.packetsCapturedThisSession = 0;
  res.json({ status: 'cleared', message: 'captured_packets.csv reset.' });
});

// 7. Inject simulated packet directly to CSV
app.post('/api/inject-packet', (req, res) => {
  const { protocol = 'TCP', source, destination, length = 64 } = req.body;
  const time = new Date().toTimeString().split(' ')[0];
  const src = source || '192.168.1.105';
  const dst = destination || '142.250.190.46';
  const proto = protocol.toUpperCase();
  const hex = '0800' + Array.from({ length: 48 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');

  const row = `${time},${src},${dst},${proto},${length},${hex},\n`;
  fs.appendFileSync(CSV_FILE, row, 'utf8');

  res.json({
    status: 'injected',
    packet: { time, source: src, destination: dst, protocol: proto, length, data: hex },
  });
});

// 8. Get Python script source code for user review/copy
app.get('/api/python-code', (req, res) => {
  try {
    const analyzerCode = fs.readFileSync(PYTHON_SCRIPT, 'utf8');
    const scapyCode = fs.existsSync(path.join(__dirname, 'scapy_sniffer.py'))
      ? fs.readFileSync(path.join(__dirname, 'scapy_sniffer.py'), 'utf8')
      : '';
    res.json({
      analyzer: analyzerCode,
      scapy: scapyCode,
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// -------------------------------------------------------------
// VITE DEV SERVER / STATIC ASSETS
// -------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> Network Packet Analyzer running on http://0.0.0.0:${PORT}`);
    console.log(`> Python Backend: ${PYTHON_SCRIPT}`);
    console.log(`> Packet Storage: ${CSV_FILE}`);
  });
}

startServer();
