import React from 'react';
import { X, Shield, ArrowUpRight, Cpu, Layers, Play } from 'lucide-react';
import { ProtocolType, Packet } from '../types/network';

interface ProtocolDetailModalProps {
  protocol: ProtocolType | null;
  packets: Packet[];
  onClose: () => void;
  onFilterProtocol: (proto: ProtocolType) => void;
  onInjectPacket: (proto: ProtocolType) => void;
}

export const ProtocolDetailModal: React.FC<ProtocolDetailModalProps> = ({
  protocol,
  packets,
  onClose,
  onFilterProtocol,
  onInjectPacket,
}) => {
  if (!protocol) return null;

  const protocolPackets = packets.filter((p) => p.protocol === protocol);
  const totalBytes = protocolPackets.reduce((acc, p) => acc + p.length, 0);
  const avgSize = protocolPackets.length > 0 ? Math.round(totalBytes / protocolPackets.length) : 0;

  const infoData = {
    TCP: {
      fullName: 'Transmission Control Protocol',
      rfc: 'RFC 793 / RFC 9293',
      layer: 'Layer 4 (Transport Layer)',
      nature: 'Connection-oriented, reliable, ordered byte-stream delivery with flow control and congestion avoidance.',
      features: ['3-Way Handshake (SYN, SYN-ACK, ACK)', 'Sliding Window Flow Control', 'Cumulative Acknowledgments', 'Fast Retransmit & SACK'],
      commonPorts: ['80 (HTTP)', '443 (HTTPS/TLS)', '22 (SSH)', '5432 (PostgreSQL)', '3306 (MySQL)'],
      color: 'cyan',
    },
    UDP: {
      fullName: 'User Datagram Protocol',
      rfc: 'RFC 768',
      layer: 'Layer 4 (Transport Layer)',
      nature: 'Connectionless, lightweight, low-latency transmission protocol without handshakes or delivery guarantees.',
      features: ['Minimal 8-byte Header Overhead', 'No Connection Setup Latency', 'Unordered & Unchecked Datagrams', 'Ideal for Streaming, DNS, and Gaming'],
      commonPorts: ['53 (DNS)', '123 (NTP)', '5353 (mDNS)', '443 (QUIC / HTTP/3)', '67/68 (DHCP)'],
      color: 'emerald',
    },
    ICMP: {
      fullName: 'Internet Control Message Protocol',
      rfc: 'RFC 792 / RFC 4443',
      layer: 'Layer 3/4 (Network Control Layer)',
      nature: 'Diagnostic and reporting mechanism utilized by routers and hosts to signal operational network conditions and errors.',
      features: ['Echo Request & Echo Reply (Ping)', 'Destination Unreachable (Type 3)', 'Time-to-Live (TTL) Exceeded (Traceroute)', 'Parameter Problem Reporting'],
      commonPorts: ['N/A (Operates without Port numbers via Type & Code fields)'],
      color: 'amber',
    },
  }[protocol];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 border border-slate-700">
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-100 font-mono">{protocol} Protocol</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {infoData.rfc}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">{infoData.fullName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-xs text-slate-400 block mb-1">Packets in Buffer</span>
              <span className="text-xl font-bold font-mono tabular-nums text-slate-100">
                {protocolPackets.length.toLocaleString()}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-xs text-slate-400 block mb-1">Total Volume</span>
              <span className="text-xl font-bold font-mono tabular-nums text-slate-100">
                {(totalBytes / 1024).toFixed(1)} KB
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-xs text-slate-400 block mb-1">Average Size</span>
              <span className="text-xl font-bold font-mono tabular-nums text-slate-100">
                {avgSize} B
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Protocol Mechanics
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/60">
              {infoData.nature}
            </p>
          </div>

          {/* Key Capabilities */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Key Architecture Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {infoData.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/50 text-slate-300"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ports & Services */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Typical Associated Ports & Services
            </h4>
            <div className="flex flex-wrap gap-2">
              {infoData.commonPorts.map((port, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700/60"
                >
                  {port}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/50 gap-3">
          <button
            onClick={() => {
              onInjectPacket(protocol);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Inject Test {protocol} Packet</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onFilterProtocol(protocol);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              <span>View Packets for {protocol}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
