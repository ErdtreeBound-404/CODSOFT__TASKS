import React, { useState } from 'react';
import { X, Copy, Check, ChevronDown, ChevronRight, Layers, FileCode } from 'lucide-react';
import { Packet } from '../types/network';

interface PacketDetailModalProps {
  packet: Packet | null;
  onClose: () => void;
}

export const PacketDetailModal: React.FC<PacketDetailModalProps> = ({ packet, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [expandedLayers, setExpandedLayers] = useState({
    frame: true,
    ip: true,
    transport: true,
    payload: true,
  });

  if (!packet) return null;

  const toggleLayer = (layer: keyof typeof expandedLayers) => {
    setExpandedLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const copyPayload = () => {
    navigator.clipboard.writeText(`${packet.payloadHex}\n\nASCII:\n${packet.payloadAscii}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
              #{packet.id}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-100 font-mono">
                  Packet #{packet.id} · {packet.protocol}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {packet.length} bytes
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono truncate max-w-md sm:max-w-xl">
                {packet.info}
              </p>
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

        {/* Modal Body: Split into OSI Layer Tree + Hex/ASCII View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Quick Route Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-500 block mb-0.5">SOURCE</span>
              <span className="text-slate-200 font-semibold">{packet.srcIp}</span>
              {packet.srcPort && <span className="text-cyan-400">:{packet.srcPort}</span>}
              <span className="text-slate-500 text-[11px] block mt-0.5">MAC: {packet.srcMac}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">DESTINATION</span>
              <span className="text-slate-200 font-semibold">{packet.dstIp}</span>
              {packet.dstPort && <span className="text-cyan-400">:{packet.dstPort}</span>}
              <span className="text-slate-500 text-[11px] block mt-0.5">MAC: {packet.dstMac}</span>
            </div>
          </div>

          {/* Layer Tree */}
          <div className="space-y-2 text-xs font-mono">
            {/* Layer 2: Ethernet II */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden">
              <button
                onClick={() => toggleLayer('frame')}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/70 text-slate-200 text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  {expandedLayers.frame ? <ChevronDown className="w-4 h-4 text-cyan-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold">Ethernet II (Data Link Layer)</span>
                </div>
                <span className="text-slate-500 text-[11px]">Src: {packet.srcMac} → Dst: {packet.dstMac}</span>
              </button>
              {expandedLayers.frame && (
                <div className="p-3.5 space-y-1 text-slate-300 bg-slate-950/30 border-t border-slate-800/60 pl-8">
                  <div>Destination: {packet.dstMac}</div>
                  <div>Source: {packet.srcMac}</div>
                  <div>Type: IPv4 (0x0800)</div>
                  <div>Frame Length: {packet.length} bytes ({packet.length * 8} bits) on wire</div>
                </div>
              )}
            </div>

            {/* Layer 3: IPv4 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden">
              <button
                onClick={() => toggleLayer('ip')}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/70 text-slate-200 text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  {expandedLayers.ip ? <ChevronDown className="w-4 h-4 text-cyan-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold">Internet Protocol Version 4 (Network Layer)</span>
                </div>
                <span className="text-slate-500 text-[11px]">Src: {packet.srcIp} → Dst: {packet.dstIp}</span>
              </button>
              {expandedLayers.ip && (
                <div className="p-3.5 space-y-1 text-slate-300 bg-slate-950/30 border-t border-slate-800/60 pl-8">
                  <div>Version: 4</div>
                  <div>Header Length: 20 bytes</div>
                  <div>Differentiated Services Field: 0x00 (DSCP: CS0, ECN: Not-ECT)</div>
                  <div>Total Length: {packet.length - 14} bytes</div>
                  <div>Identification: {packet.identification}</div>
                  <div>Time to Live (TTL): {packet.ttl} hops</div>
                  <div>Protocol: {packet.protocol} ({packet.protocol === 'TCP' ? 6 : packet.protocol === 'UDP' ? 17 : 1})</div>
                  <div>Header Checksum: {packet.checksum} [status: verified]</div>
                  <div>Source Address: {packet.srcIp}</div>
                  <div>Destination Address: {packet.dstIp}</div>
                </div>
              )}
            </div>

            {/* Layer 4: Protocol Transport */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden">
              <button
                onClick={() => toggleLayer('transport')}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-800/40 hover:bg-slate-800/70 text-slate-200 text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  {expandedLayers.transport ? <ChevronDown className="w-4 h-4 text-cyan-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold">
                    {packet.protocol === 'TCP' && 'Transmission Control Protocol (Transport Layer)'}
                    {packet.protocol === 'UDP' && 'User Datagram Protocol (Transport Layer)'}
                    {packet.protocol === 'ICMP' && 'Internet Control Message Protocol'}
                  </span>
                </div>
                <span className="text-slate-500 text-[11px]">
                  {packet.srcPort && packet.dstPort ? `${packet.srcPort} → ${packet.dstPort}` : packet.protocol}
                </span>
              </button>
              {expandedLayers.transport && (
                <div className="p-3.5 space-y-1 text-slate-300 bg-slate-950/30 border-t border-slate-800/60 pl-8">
                  {packet.protocol === 'TCP' && (
                    <>
                      <div>Source Port: {packet.srcPort}</div>
                      <div>Destination Port: {packet.dstPort}</div>
                      <div>Sequence Number: {packet.sequenceNumber}</div>
                      <div>Acknowledgment Number: {packet.ackNumber}</div>
                      <div>Flags: {packet.flags ? packet.flags.join(', ') : 'None'}</div>
                      <div>Window Size: {packet.windowSize} bytes</div>
                      <div>Checksum: {packet.checksum}</div>
                    </>
                  )}
                  {packet.protocol === 'UDP' && (
                    <>
                      <div>Source Port: {packet.srcPort}</div>
                      <div>Destination Port: {packet.dstPort}</div>
                      <div>Length: {packet.length - 34} bytes</div>
                      <div>Checksum: {packet.checksum}</div>
                    </>
                  )}
                  {packet.protocol === 'ICMP' && (
                    <>
                      <div>Type: {packet.icmpType || 'Echo Request'}</div>
                      <div>Code: {packet.icmpCode ?? 0}</div>
                      <div>Checksum: {packet.checksum}</div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Hex Dump & ASCII Inspector */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/40 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-slate-200">Packet Payload & Byte Inspector</span>
                </div>
                <button
                  onClick={copyPayload}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Bytes'}</span>
                </button>
              </div>
              <div className="p-4 bg-slate-950 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8 text-cyan-300 whitespace-pre overflow-x-auto selection:bg-cyan-900 selection:text-white">
                  {packet.payloadHex}
                </div>
                <div className="md:col-span-4 text-slate-400 whitespace-pre overflow-x-auto border-l border-slate-800/80 md:pl-4 selection:bg-slate-800 selection:text-white">
                  {packet.payloadAscii}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-800 bg-slate-950/50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
