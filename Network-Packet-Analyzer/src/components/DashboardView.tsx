import React, { useRef, useEffect } from 'react';
import { Play, Square, Filter, ChevronRight, Activity, Zap, Shield, ArrowUpRight, Terminal, FileSpreadsheet, Download } from 'lucide-react';
import { NetworkLogo } from './NetworkLogo';
import { Packet, ProtocolType } from '../types/network';

interface DashboardViewProps {
  isCapturing: boolean;
  onToggleCapture: () => void;
  packets: Packet[];
  activeProtocols: ProtocolType[];
  onToggleProtocol: (proto: ProtocolType) => void;
  onOpenProtocolDetail: (proto: ProtocolType) => void;
  onSelectPacket: (packet: Packet) => void;
  onNavigateToPackets: () => void;
  onNavigateToAnalysis: () => void;
  onOpenPythonBackend: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  isCapturing,
  onToggleCapture,
  packets,
  activeProtocols,
  onToggleProtocol,
  onOpenProtocolDetail,
  onSelectPacket,
  onNavigateToPackets,
  onNavigateToAnalysis,
  onOpenPythonBackend,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Counts by protocol
  const tcpCount = packets.filter((p) => p.protocol === 'TCP').length;
  const udpCount = packets.filter((p) => p.protocol === 'UDP').length;
  const icmpCount = packets.filter((p) => p.protocol === 'ICMP').length;
  const totalBytes = packets.reduce((acc, p) => acc + p.length, 0);

  // Animated live traffic wave canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = (now: number) => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Use elapsed real time instead of incrementing a frame counter.
      // This keeps the waveform smooth even when the browser drops frames.
      const phase = now * 0.00065;

      // Background subtle grid
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (isCapturing) {
        // Draw dynamic live packet signal waves
        // TCP Wave (Cyan)
        ctx.beginPath();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        for (let x = 0; x < width; x++) {
          const y =
            height / 2 +
            Math.sin(x * 0.035 + phase) * 13 +
            Math.cos(x * 0.018 - phase * 0.65) * 5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // UDP Wave (Emerald)
        ctx.beginPath();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < width; x++) {
          const y =
            height / 2 +
            Math.cos(x * 0.042 - phase * 0.78) * 10 +
            Math.sin(x * 0.026 + phase * 0.45) * 4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

      } else {
        // Idle flatline with subtle pulse
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(71, 85, 105, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isCapturing]);

  const recentPackets = packets.slice(-5).reverse();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Center Branding Hero from Sketch:
          [ LOGO ]
          NETWORK PACKET ANALYZER
          REAL TIME TRAFFIC MONITORING
      */}
      <div className="flex flex-col items-center text-center pt-4 sm:pt-6 space-y-4">
        <NetworkLogo isCapturing={isCapturing} size="lg" />

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wider uppercase text-slate-100 font-mono">
            NETWORK PACKET ANALYZER
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-cyan-400 font-mono">
            REAL TIME TRAFFIC MONITORING
          </p>
        </div>

        {/* Live Traffic Canvas Wave */}
        <div className="w-full max-w-2xl h-16 rounded-xl bg-slate-950/70 border border-slate-800/80 overflow-hidden relative shadow-inner">
          <canvas ref={canvasRef} width={640} height={64} className="w-full h-full block" />
          <div className="absolute top-2 right-3 flex items-center gap-2 text-[10px] font-mono">
            <span className="flex items-center gap-1 text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" /> TCP
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> UDP
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" /> ICMP
            </span>
          </div>
        </div>
      </div>

      {/* Main Controls Grid matching sketch:
          START CAPTURING button + PROTOCOL box (TCP, UDP, ICMP)
      */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): START CAPTURING Action Card */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Primary Capture Controller
              </span>
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded ${
                  isCapturing
                    ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isCapturing ? 'STREAMING ACTIVE' : 'INACTIVE'}
              </span>
            </div>

            {/* Prominent START / STOP CAPTURING Button matching Sketch */}
            <button
              onClick={onToggleCapture}
              type="button"
              className={`w-full py-5 px-6 rounded-2xl font-mono font-black text-base sm:text-lg tracking-wider uppercase flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg cursor-pointer ${
                isCapturing
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/50 border-2 border-rose-400/50 ring-4 ring-rose-500/20'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-950/50 border-2 border-cyan-300/60 ring-4 ring-cyan-500/20'
              }`}
            >
              {isCapturing ? (
                <>
                  <Square className="w-6 h-6 fill-current animate-pulse" />
                  <span>STOP CAPTURING</span>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 fill-current" />
                  <span>START CAPTURING</span>
                </>
              )}
            </button>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-0.5">CAPTURED PACKETS</span>
                <span className="text-lg font-bold tabular-nums text-slate-100">
                  {packets.length.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-0.5">THROUGHPUT</span>
                <span className="text-lg font-bold tabular-nums text-slate-100">
                  {(totalBytes / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>

            {/* Python Engine & CSV File Storage Status Box */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-900/40 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Python Backend + CSV</span>
                </span>
                <span className="text-[10px] text-slate-400">captured_packets.csv</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Engine: packet_analyzer.py</span>
                <span className="text-cyan-400">{isCapturing ? 'Logging Active' : 'Synced'}</span>
              </div>
              <div className="pt-1 flex items-center justify-between gap-2">
                <button
                  onClick={onOpenPythonBackend}
                  type="button"
                  className="flex-1 py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer text-center"
                >
                  Inspect Python Code
                </button>
                <a
                  href="/api/download-csv"
                  download="captured_packets.csv"
                  className="flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-300 text-[11px] transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>CSV</span>
                </a>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 text-center font-mono">
              {isCapturing
                ? 'Python packet analyzer actively capturing & appending to CSV...'
                : 'Click button to launch Python packet sniffer daemon'}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): PROTOCOL Box matching sketch with TCP, UDP, ICMP */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border-2 border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-200">
                  PROTOCOL
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Click protocol to inspect or toggle filter
              </span>
            </div>

            {/* The 3 Protocols as explicitly specified in the sketch: TCP, UDP, ICMP */}
            <div className="space-y-3 font-mono">
              {/* TCP Option */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={activeProtocols.includes('TCP')}
                    onChange={() => onToggleProtocol('TCP')}
                    id="proto-tcp"
                    className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                  />
                  <label htmlFor="proto-tcp" className="cursor-pointer">
                    <span className="text-base font-bold text-slate-100 block">TCP</span>
                    <span className="text-[11px] text-slate-400">
                      Transmission Control Protocol (HTTP, TLS, SSH)
                    </span>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-cyan-400 tabular-nums">
                    {tcpCount.toLocaleString()} pkts
                  </span>
                  <button
                    onClick={() => onOpenProtocolDetail('TCP')}
                    type="button"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
                    title="Inspect TCP Protocol"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* UDP Option */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={activeProtocols.includes('UDP')}
                    onChange={() => onToggleProtocol('UDP')}
                    id="proto-udp"
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                  <label htmlFor="proto-udp" className="cursor-pointer">
                    <span className="text-base font-bold text-slate-100 block">UDP</span>
                    <span className="text-[11px] text-slate-400">
                      User Datagram Protocol (DNS, NTP, QUIC)
                    </span>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-400 tabular-nums">
                    {udpCount.toLocaleString()} pkts
                  </span>
                  <button
                    onClick={() => onOpenProtocolDetail('UDP')}
                    type="button"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
                    title="Inspect UDP Protocol"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* ICMP Option */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={activeProtocols.includes('ICMP')}
                    onChange={() => onToggleProtocol('ICMP')}
                    id="proto-icmp"
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <label htmlFor="proto-icmp" className="cursor-pointer">
                    <span className="text-base font-bold text-slate-100 block">ICMP</span>
                    <span className="text-[11px] text-slate-400">
                      Internet Control Message Protocol (Ping, Traceroute)
                    </span>
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-400 tabular-nums">
                    {icmpCount.toLocaleString()} pkts
                  </span>
                  <button
                    onClick={() => onOpenProtocolDetail('ICMP')}
                    type="button"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
                    title="Inspect ICMP Protocol"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono">
              <button
                onClick={onNavigateToPackets}
                type="button"
                className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
              >
                <span>Open Full Packet Inspector</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onNavigateToAnalysis}
                type="button"
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <span>Security Diagnostics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Ingress Mini-Stream */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300">
              Live Ingress Feed ({recentPackets.length} recent)
            </h3>
          </div>
          <button
            onClick={onNavigateToPackets}
            className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
          >
            View all {packets.length} packets →
          </button>
        </div>

        {recentPackets.length === 0 ? (
          <div className="py-6 text-center text-xs font-mono text-slate-500 bg-slate-950/40 rounded-xl border border-slate-800/50">
            No packets in buffer yet. Click [ START CAPTURING ] above to stream real-time wire data.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60 font-mono text-xs">
            {recentPackets.map((pkt) => (
              <div
                key={pkt.id}
                onClick={() => onSelectPacket(pkt)}
                className="py-2.5 px-3 rounded-lg hover:bg-slate-800/50 flex items-center justify-between gap-4 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-slate-500 tabular-nums w-12 text-[11px]">#{pkt.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      pkt.protocol === 'TCP'
                        ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/30'
                        : pkt.protocol === 'UDP'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {pkt.protocol}
                  </span>
                  <span className="text-slate-300 truncate text-[11px]">
                    {pkt.srcIp}:{pkt.srcPort || '—'} → {pkt.dstIp}:{pkt.dstPort || '—'}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-slate-400 text-[11px]">
                  <span className="truncate max-w-[200px] hidden sm:inline">{pkt.info}</span>
                  <span className="tabular-nums text-slate-500">{pkt.length} B</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
