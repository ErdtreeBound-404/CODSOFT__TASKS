import React from 'react';
import { BarChart3, Wifi, Server, ShieldCheck, Activity, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Packet, NetworkInterface, ProtocolType } from '../types/network';

interface OverviewViewProps {
  packets: Packet[];
  interfaces: NetworkInterface[];
  onSelectProtocol: (proto: ProtocolType) => void;
  onSelectPacket: (packet: Packet) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  packets,
  interfaces,
  onSelectProtocol,
  onSelectPacket,
}) => {
  const tcpPackets = packets.filter((p) => p.protocol === 'TCP');
  const udpPackets = packets.filter((p) => p.protocol === 'UDP');
  const icmpPackets = packets.filter((p) => p.protocol === 'ICMP');

  const total = packets.length || 1;
  const tcpPct = Math.round((tcpPackets.length / total) * 100);
  const udpPct = Math.round((udpPackets.length / total) * 100);
  const icmpPct = Math.max(0, 100 - tcpPct - udpPct);

  const totalBytes = packets.reduce((acc, p) => acc + p.length, 0);

  // Top source IPs
  const srcCounts: Record<string, { count: number; bytes: number; lastProtocol: ProtocolType }> = {};
  packets.forEach((p) => {
    if (!srcCounts[p.srcIp]) {
      srcCounts[p.srcIp] = { count: 0, bytes: 0, lastProtocol: p.protocol };
    }
    srcCounts[p.srcIp].count += 1;
    srcCounts[p.srcIp].bytes += p.length;
  });

  const topTalkers = Object.entries(srcCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider font-mono text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>NETWORK OVERVIEW & TELEMETRY</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Aggregated traffic distributions, physical network interfaces, and host endpoint metrics
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            TOTAL INGRESS: {(totalBytes / 1024).toFixed(1)} KB
          </span>
          <span className="px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold">
            NIC STATUS: HEALTHY
          </span>
        </div>
      </div>

      {/* Protocol Distribution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        {/* TCP Card */}
        <div
          onClick={() => onSelectProtocol('TCP')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer shadow-lg group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase text-slate-400 font-bold">TCP TRAFFIC</span>
            <span className="text-xs text-cyan-400 font-bold">{tcpPct}%</span>
          </div>
          <div className="text-2xl font-bold text-slate-100 mb-2 tabular-nums">
            {tcpPackets.length.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-400">packets</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden mb-3">
            <div
              className="h-full bg-cyan-500 transition-all duration-300"
              style={{ width: `${tcpPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>
              Vol: {(tcpPackets.reduce((a, b) => a + b.length, 0) / 1024).toFixed(1)} KB
            </span>
            <span className="text-cyan-400 group-hover:underline">Inspect TCP →</span>
          </div>
        </div>

        {/* UDP Card */}
        <div
          onClick={() => onSelectProtocol('UDP')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer shadow-lg group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase text-slate-400 font-bold">UDP TRAFFIC</span>
            <span className="text-xs text-emerald-400 font-bold">{udpPct}%</span>
          </div>
          <div className="text-2xl font-bold text-slate-100 mb-2 tabular-nums">
            {udpPackets.length.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-400">packets</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden mb-3">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${udpPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>
              Vol: {(udpPackets.reduce((a, b) => a + b.length, 0) / 1024).toFixed(1)} KB
            </span>
            <span className="text-emerald-400 group-hover:underline">Inspect UDP →</span>
          </div>
        </div>

        {/* ICMP Card */}
        <div
          onClick={() => onSelectProtocol('ICMP')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer shadow-lg group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase text-slate-400 font-bold">ICMP TRAFFIC</span>
            <span className="text-xs text-amber-400 font-bold">{icmpPct}%</span>
          </div>
          <div className="text-2xl font-bold text-slate-100 mb-2 tabular-nums">
            {icmpPackets.length.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-400">packets</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden mb-3">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${icmpPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>
              Vol: {(icmpPackets.reduce((a, b) => a + b.length, 0) / 1024).toFixed(1)} KB
            </span>
            <span className="text-amber-400 group-hover:underline">Inspect ICMP →</span>
          </div>
        </div>
      </div>

      {/* Hardware Interfaces Status */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-200">
              Attached Network Interfaces
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Kernel Hardware Sockets</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {interfaces.map((iface) => (
            <div
              key={iface.name}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-slate-200 text-sm">{iface.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 border border-emerald-500/40 text-emerald-300 uppercase">
                  {iface.status}
                </span>
              </div>

              <div className="space-y-1 text-slate-400 text-[11px]">
                <div className="flex justify-between">
                  <span>IPv4 Address:</span>
                  <span className="text-slate-200">{iface.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span>MAC Address:</span>
                  <span className="text-slate-400">{iface.mac}</span>
                </div>
                <div className="flex justify-between">
                  <span>MTU Size:</span>
                  <span className="text-slate-300">{iface.mtu} bytes</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px]">
                <div className="flex items-center gap-1 text-slate-400">
                  <ArrowDownLeft className="w-3 h-3 text-emerald-400" />
                  <span>RX: {(iface.rxBytes / 1024).toFixed(0)} KB</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  <span>TX: {(iface.txBytes / 1024).toFixed(0)} KB</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Talker Endpoints */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-200">
              Top Active Endpoint Hosts
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Sorted by packet ingress</span>
        </div>

        {topTalkers.length === 0 ? (
          <div className="py-8 text-center text-xs font-mono text-slate-500 bg-slate-950/40 rounded-xl">
            No endpoint activity recorded yet. Start capturing on the Dashboard to aggregate host statistics.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                  <th className="pb-3 pl-3">Source Endpoint</th>
                  <th className="pb-3">Last Protocol</th>
                  <th className="pb-3 text-right">Packets</th>
                  <th className="pb-3 text-right">Bytes</th>
                  <th className="pb-3 text-right pr-3">Traffic Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {topTalkers.map(([ip, data]) => {
                  const share = Math.round((data.count / total) * 100);
                  return (
                    <tr key={ip} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 pl-3 font-semibold text-slate-200">{ip}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            data.lastProtocol === 'TCP'
                              ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                              : data.lastProtocol === 'UDP'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {data.lastProtocol}
                        </span>
                      </td>
                      <td className="py-3 text-right tabular-nums text-slate-200">
                        {data.count.toLocaleString()}
                      </td>
                      <td className="py-3 text-right tabular-nums text-slate-400">
                        {(data.bytes / 1024).toFixed(1)} KB
                      </td>
                      <td className="py-3 text-right pr-3 font-bold text-cyan-400 tabular-nums">
                        {share}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
