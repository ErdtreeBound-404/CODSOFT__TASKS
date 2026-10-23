import { Packet, ProtocolType } from '../types/network';

const COMMON_HOSTS = [
  { ip: '192.168.1.105', mac: '00:1a:2b:3c:4d:5e', role: 'Local Workstation' },
  { ip: '192.168.1.1', mac: 'c8:3a:35:11:22:33', role: 'Default Gateway (Router)' },
  { ip: '10.0.0.45', mac: '52:54:00:12:34:56', role: 'Internal API Server' },
  { ip: '142.250.190.46', mac: 'e4:aa:5d:08:92:1f', role: 'Google Cloud Services' },
  { ip: '104.21.28.181', mac: 'ac:1f:6b:44:88:99', role: 'Cloudflare Edge CDN' },
  { ip: '140.82.121.4', mac: '90:b1:1c:77:45:21', role: 'GitHub Cluster' },
  { ip: '1.1.1.1', mac: 'ac:1f:6b:11:22:33', role: 'Cloudflare DNS' },
  { ip: '8.8.8.8', mac: 'e4:aa:5d:aa:bb:cc', role: 'Google Public DNS' },
  { ip: '172.16.4.88', mac: '34:27:92:ef:01:23', role: 'Database Server (Postgres)' },
  { ip: '198.51.100.77', mac: '00:50:56:c0:00:08', role: 'External Remote Client' },
];

const DOMAINS = ['api.github.com', 'auth.google.com', 'telemetry.cloud.io', 'metrics.prometheus.org', 'cdn.jsdelivr.net'];

let packetIdCounter = 1;
const captureStartTimestamp = Date.now();

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toHex(num: number, len = 2): string {
  return num.toString(16).padStart(len, '0');
}

export function generateHexAndAscii(length: number, protocol: ProtocolType, info: string): { hex: string; ascii: string } {
  const bytes: number[] = [];
  // Ethernet header: 14 bytes
  for (let i = 0; i < 14; i++) bytes.push(randomInt(0, 255));
  // IP header: 20 bytes
  bytes.push(0x45); // IPv4, 20 bytes
  bytes.push(0x00); // DSCP
  bytes.push((length >> 8) & 0xff);
  bytes.push(length & 0xff);
  for (let i = 4; i < 20; i++) bytes.push(randomInt(0, 255));

  // Protocol payload
  const sampleAscii = `${protocol} TRAFFIC [${info.slice(0, 40)}] SECURE PACKET MONITOR PAYLOAD DATA CHUNK`;
  for (let i = 34; i < length; i++) {
    const charCode = sampleAscii.charCodeAt((i - 34) % sampleAscii.length);
    bytes.push(charCode);
  }

  // Format into 16-byte rows
  const hexLines: string[] = [];
  const asciiLines: string[] = [];

  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.slice(i, i + 16);
    const offset = toHex(i, 4);
    const hexPart = chunk.map((b) => toHex(b)).join(' ');
    const asciiPart = chunk
      .map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.'))
      .join('');

    hexLines.push(`${offset}  ${hexPart.padEnd(48, ' ')}`);
    asciiLines.push(asciiPart);
  }

  return {
    hex: hexLines.join('\n'),
    ascii: asciiLines.join('\n'),
  };
}

export function generateSimulatedPacket(enabledProtocols: ProtocolType[] = ['TCP', 'UDP', 'ICMP']): Packet {
  const activeProtocols: ProtocolType[] = enabledProtocols.length > 0 ? enabledProtocols : ['TCP', 'UDP', 'ICMP'];
  
  // Weighted protocol choice if all are enabled: TCP 65%, UDP 25%, ICMP 10%
  let protocol: ProtocolType;
  if (activeProtocols.length === 3) {
    const r = Math.random();
    if (r < 0.65) protocol = 'TCP';
    else if (r < 0.90) protocol = 'UDP';
    else protocol = 'ICMP';
  } else {
    protocol = randomChoice(activeProtocols);
  }

  const id = packetIdCounter++;
  const now = Date.now();
  const elapsedSec = ((now - captureStartTimestamp) / 1000).toFixed(6);

  const srcHost = randomChoice(COMMON_HOSTS);
  let dstHost = randomChoice(COMMON_HOSTS);
  while (dstHost.ip === srcHost.ip) {
    dstHost = randomChoice(COMMON_HOSTS);
  }

  let info = '';
  let flags: string[] | undefined = undefined;
  let srcPort: number | undefined = undefined;
  let dstPort: number | undefined = undefined;
  let length = 64;
  let seq: number | undefined = undefined;
  let ack: number | undefined = undefined;
  let win: number | undefined = undefined;
  let icmpType: string | undefined = undefined;
  let icmpCode: number | undefined = undefined;
  let threatLevel: 'normal' | 'suspicious' | 'warning' = 'normal';

  if (protocol === 'TCP') {
    const tcpScenarios = [
      { srcP: randomInt(49152, 65535), dstP: 443, flags: ['SYN'], info: 'Client Hello Handshake [SYN] Seq=0 Win=64240 MSS=1460' },
      { srcP: 443, dstP: randomInt(49152, 65535), flags: ['SYN', 'ACK'], info: 'Server Response [SYN, ACK] Seq=0 Ack=1 Win=65160' },
      { srcP: randomInt(49152, 65535), dstP: 443, flags: ['ACK'], info: 'Session Established [ACK] Seq=1 Ack=1 Win=64240' },
      { srcP: randomInt(49152, 65535), dstP: 443, flags: ['PSH', 'ACK'], info: 'TLSv1.3 Encrypted Application Data Len=312' },
      { srcP: 443, dstP: randomInt(49152, 65535), flags: ['PSH', 'ACK'], info: 'TLSv1.3 Application Data Response Len=1420' },
      { srcP: randomInt(49152, 65535), dstP: 80, flags: ['PSH', 'ACK'], info: 'HTTP GET /api/v1/telemetry/feed HTTP/1.1' },
      { srcP: 80, dstP: randomInt(49152, 65535), flags: ['PSH', 'ACK'], info: 'HTTP/1.1 200 OK (application/json) Content-Length: 486' },
      { srcP: randomInt(49152, 65535), dstP: 22, flags: ['PSH', 'ACK'], info: 'SSH-2.0-OpenSSH_9.2p1 Encrypted Packet' },
      { srcP: randomInt(49152, 65535), dstP: 5432, flags: ['PSH', 'ACK'], info: 'PostgreSQL Query: SELECT * FROM network_nodes LIMIT 50' },
      { srcP: randomInt(49152, 65535), dstP: 443, flags: ['FIN', 'ACK'], info: 'Connection Teardown [FIN, ACK] Seq=540 Ack=1200' },
      { srcP: randomInt(49152, 65535), dstP: 8080, flags: ['SYN'], info: 'SYN Probe to unusual port [SYN] Seq=0', suspicious: true },
    ];
    const scen = randomChoice(tcpScenarios);
    srcPort = scen.srcP;
    dstPort = scen.dstP;
    flags = scen.flags;
    info = scen.info;
    seq = randomInt(1000000, 9999999);
    ack = randomInt(1000000, 9999999);
    win = randomChoice([64240, 65160, 131072, 262144, 524288]);
    length = randomChoice([54, 60, 66, 128, 256, 512, 1024, 1420, 1514]);
    if (scen.suspicious) threatLevel = 'suspicious';
  } else if (protocol === 'UDP') {
    const udpScenarios = [
      { srcP: randomInt(49152, 65535), dstP: 53, info: `Standard query 0x${toHex(randomInt(1000, 9999))} A ${randomChoice(DOMAINS)}`, len: 78 },
      { srcP: 53, dstP: randomInt(49152, 65535), info: `Standard query response 0x${toHex(randomInt(1000, 9999))} A 104.21.28.181`, len: 94 },
      { srcP: randomInt(49152, 65535), dstP: 443, info: 'QUIC Initial: DCID=0a9b3c4d, Crypto Exchange Packet', len: 1250 },
      { srcP: 443, dstP: randomInt(49152, 65535), info: 'QUIC Handshake: SCID=fa018c22, Protected 1-RTT', len: 1280 },
      { srcP: 123, dstP: 123, info: 'NTP Client to Server: Stratum 2 Sync Request', len: 90 },
      { srcP: 5353, dstP: 5353, info: 'mDNS Multicast Query PTR _workstation._tcp.local', len: 142 },
    ];
    const scen = randomChoice(udpScenarios);
    srcPort = scen.srcP;
    dstPort = scen.dstP;
    info = scen.info;
    length = scen.len;
  } else {
    // ICMP
    const isRequest = Math.random() > 0.45;
    icmpType = isRequest ? 'Echo (ping) request' : 'Echo (ping) reply';
    icmpCode = 0;
    const icmpId = randomInt(1, 65535);
    const icmpSeq = randomInt(1, 100);
    info = `${icmpType} id=0x${toHex(icmpId, 4)}, seq=${icmpSeq}/0x${toHex(icmpSeq, 4)}, ttl=${randomChoice([64, 128, 255])}`;
    length = randomChoice([64, 84, 98]);
  }

  const { hex, ascii } = generateHexAndAscii(length, protocol, info);

  return {
    id,
    timestamp: now,
    timeOffset: elapsedSec,
    srcIp: srcHost.ip,
    srcPort,
    dstIp: dstHost.ip,
    dstPort,
    protocol,
    length,
    info,
    flags,
    srcMac: srcHost.mac,
    dstMac: dstHost.mac,
    ttl: randomChoice([64, 128, 56, 112]),
    checksum: `0x${toHex(randomInt(0x1000, 0xffff), 4)}`,
    identification: `0x${toHex(randomInt(0x1000, 0xffff), 4)}`,
    sequenceNumber: seq,
    ackNumber: ack,
    windowSize: win,
    icmpType,
    icmpCode,
    payloadHex: hex,
    payloadAscii: ascii,
    threatLevel,
  };
}

// Simple Web Audio feedback synthesizer for realistic packet clicks
let audioCtx: AudioContext | null = null;
export function playPacketChirp(protocol: ProtocolType) {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'running') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      const freq = protocol === 'TCP' ? 880 : protocol === 'UDP' ? 1200 : 540;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    }
  } catch {
    // Ignore audio restrictions
  }
}

export function csvPacketToPacket(csvPkt: {
  id: number;
  time: string;
  source: string;
  destination: string;
  protocol: ProtocolType | string;
  length: number;
  data: string;
  alert?: string;
}): Packet {
  const protocol: ProtocolType =
    csvPkt.protocol === 'UDP' ? 'UDP' : csvPkt.protocol === 'ICMP' ? 'ICMP' : 'TCP';

  // Decode hex data string to formatted lines
  const rawHex = csvPkt.data || '00';
  const bytes: number[] = [];
  for (let i = 0; i < rawHex.length; i += 2) {
    bytes.push(parseInt(rawHex.substr(i, 2), 16) || 0);
  }

  const hexLines: string[] = [];
  const asciiLines: string[] = [];

  for (let i = 0; i < bytes.length; i += 16) {
    const chunk = bytes.slice(i, i + 16);
    const offset = toHex(i, 4);
    const hexPart = chunk.map((b) => toHex(b)).join(' ');
    const asciiPart = chunk
      .map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.'))
      .join('');

    hexLines.push(`${offset}  ${hexPart.padEnd(48, ' ')}`);
    asciiLines.push(asciiPart);
  }

  // Derive plausible port info
  let srcPort: number | undefined = undefined;
  let dstPort: number | undefined = undefined;
  let info = '';

  if (protocol === 'TCP') {
    srcPort = 49152 + (csvPkt.id * 17) % 15000;
    dstPort = [443, 80, 22, 5432][csvPkt.id % 4];
    info = `${srcPort} → ${dstPort} [ACK, PSH] Len=${csvPkt.length} (Captured by Python)`;
  } else if (protocol === 'UDP') {
    srcPort = 53530 + (csvPkt.id * 11) % 10000;
    dstPort = 53;
    info = `DNS Query/Response Len=${csvPkt.length} (Captured by Python)`;
  } else {
    info = `ICMP Echo Request/Reply Len=${csvPkt.length} (Captured by Python)`;
  }

  return {
    id: csvPkt.id,
    timestamp: Date.now(),
    timeOffset: csvPkt.time,
    srcIp: csvPkt.source,
    srcPort,
    dstIp: csvPkt.destination,
    dstPort,
    protocol,
    length: csvPkt.length,
    info,
    flags: protocol === 'TCP' ? ['ACK'] : undefined,
    srcMac: '00:1a:2b:3c:4d:5e',
    dstMac: 'c8:3a:35:11:22:33',
    ttl: 64,
    checksum: '0x' + toHex((csvPkt.length * 37) % 65535, 4),
    identification: '0x' + toHex((csvPkt.id * 89) % 65535, 4),
    sequenceNumber: 100000 + csvPkt.id * 40,
    ackNumber: 200000 + csvPkt.id * 40,
    windowSize: 64240,
    payloadHex: hexLines.join('\n') || rawHex,
    payloadAscii: asciiLines.join('\n') || '....',
    threatLevel: csvPkt.alert?.startsWith('HIGH') ? 'suspicious' : csvPkt.alert?.startsWith('MEDIUM') ? 'warning' : 'normal',
  };
}

