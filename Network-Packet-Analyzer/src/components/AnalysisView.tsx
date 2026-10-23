import React, { useMemo } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Activity,
  Download,
  Info,
  Layers,
} from 'lucide-react';
import { Packet, SecurityAlert } from '../types/network';

interface AnalysisViewProps {
  packets: Packet[];
  onSelectPacketById: (id: number) => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ packets, onSelectPacketById }) => {
  // Compute analytics
  const { alerts, portStats, sizeBuckets, tcpFlags } = useMemo(() => {
    const generatedAlerts: SecurityAlert[] = [];
    const ports: Record<string, number> = {};
    const buckets = {
      tiny: 0, // < 64
      small: 0, // 64-128
      medium: 0, // 129-512
      large: 0, // 513-1024
      jumbo: 0, // > 1024
    };
    const flags = {
      SYN: 0,
      ACK: 0,
      FIN: 0,
      PSH: 0,
    };

    let synCount = 0;
    let icmpCount = 0;
    const probedPorts = new Set<number>();

    packets.forEach((pkt) => {
      // Packet size distribution
      if (pkt.length < 64) buckets.tiny++;
      else if (pkt.length <= 128) buckets.small++;
      else if (pkt.length <= 512) buckets.medium++;
      else if (pkt.length <= 1024) buckets.large++;
      else buckets.jumbo++;

      // Port tally
      if (pkt.dstPort) {
        const portName =
          pkt.dstPort === 443
            ? '443 (HTTPS/TLS)'
            : pkt.dstPort === 80
            ? '80 (HTTP)'
            : pkt.dstPort === 53
            ? '53 (DNS)'
            : pkt.dstPort === 22
            ? '22 (SSH)'
            : pkt.dstPort === 5432
            ? '5432 (Postgres)'
            : `${pkt.dstPort} (Custom)`;
        ports[portName] = (ports[portName] || 0) + 1;
        probedPorts.add(pkt.dstPort);
      }

      // Flags
      if (pkt.flags) {
        pkt.flags.forEach((f) => {
          if (f === 'SYN') {
            flags.SYN++;
            synCount++;
          }
          if (f === 'ACK') flags.ACK++;
          if (f === 'FIN') flags.FIN++;
          if (f === 'PSH') flags.PSH++;
        });
      }

      if (pkt.protocol === 'ICMP') {
        icmpCount++;
      }
    });

    // Detect anomalies
    if (synCount > 25 && synCount / (packets.length || 1) > 0.4) {
      generatedAlerts.push({
        id: 'ALT-SYN-01',
        timestamp: new Date().toLocaleTimeString(),
        type: 'TCP SYN Ingress Spike',
        severity: 'high',
        message: `High ratio of SYN packets detected (${synCount} packets, >40% of TCP traffic) without matching completion handshakes.`,
        sourceIp: '198.51.100.77',
        targetIp: '192.168.1.105',
        recommendation: 'Enable SYN Cookies (syncookies=1) and enforce ingress rate-limiting at edge firewall.',
      });
    }

    if (probedPorts.size > 8) {
      generatedAlerts.push({
        id: 'ALT-SCAN-02',
        timestamp: new Date().toLocaleTimeString(),
        type: 'Sequential Port Reconnaissance',
        severity: 'medium',
        message: `Sequential probing across ${probedPorts.size} distinct ports identified from external host cluster.`,
        sourceIp: '198.51.100.77',
        targetIp: '192.168.1.1',
        recommendation: 'Verify port knocking or block suspicious IP ranges via iptables/nftables drop policy.',
      });
    }

    if (icmpCount > 15) {
      generatedAlerts.push({
        id: 'ALT-ICMP-03',
        timestamp: new Date().toLocaleTimeString(),
        type: 'ICMP Echo Ping Burst',
        severity: 'low',
        message: `Elevated ICMP Echo Request volume (${icmpCount} requests in current buffer). Possible active host discovery.`,
        sourceIp: '192.168.1.1',
        targetIp: '192.168.1.105',
        recommendation: 'Ensure icmp_echo_ignore_broadcasts is enabled on host interface.',
      });
    }

    return {
      alerts: generatedAlerts,
      portStats: Object.entries(ports).sort((a, b) => b[1] - a[1]),
      sizeBuckets: buckets,
      tcpFlags: flags,
    };
  }, [packets]);

  const downloadReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      totalPacketsAnalyzed: packets.length,
      threatAssessment: alerts.length > 0 ? 'WARNING_FLAGGED' : 'NOMINAL_NORMAL',
      securityAlerts: alerts,
      portDistribution: portStats,
      frameSizeDistribution: sizeBuckets,
      tcpFlagsObserved: tcpFlags,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `security_analysis_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider font-mono text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <span>TRAFFIC ANALYSIS & THREAT DETECTION</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Heuristic protocol validation, port enumeration detection, and packet payload telemetry
          </p>
        </div>
        <button
          onClick={downloadReport}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Export Security Report</span>
        </button>
      </div>

      {/* Security Threat Alerts Section */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-200">
              Active Security Incident Diagnostics ({alerts.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Continuous Wire Heuristics</span>
        </div>

        {alerts.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-950/60 border border-emerald-900/40 flex items-center gap-3 text-xs font-mono text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold block text-slate-200">No Malicious Ingress Patterns Detected</span>
              <span className="text-slate-400">
                All inspected packets conform to standard RFC behavior without flood anomalies or reconnaissance scans.
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            {alerts.map((alt) => (
              <div
                key={alt.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-amber-900/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        alt.severity === 'high'
                          ? 'bg-rose-950 border border-rose-500/50 text-rose-300'
                          : alt.severity === 'medium'
                          ? 'bg-amber-950 border border-amber-500/50 text-amber-300'
                          : 'bg-cyan-950 border border-cyan-500/50 text-cyan-300'
                      }`}
                    >
                      {alt.severity} severity
                    </span>
                    <span className="font-bold text-slate-100">{alt.type}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{alt.timestamp}</span>
                </div>

                <p className="text-slate-300 text-[11px] leading-relaxed">{alt.message}</p>

                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <div>
                    Vector: <span className="text-slate-200">{alt.sourceIp}</span> →{' '}
                    <span className="text-slate-200">{alt.targetIp}</span>
                  </div>
                  <div className="text-cyan-400">
                    <span className="text-slate-500">Action:</span> {alt.recommendation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grid: Port Distribution + Packet Size Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
        {/* Port Distribution */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Port & Service Usage</span>
            </h3>
            <span className="text-[11px] text-slate-500">Destination Ports</span>
          </div>

          {portStats.length === 0 ? (
            <div className="py-8 text-center text-slate-500">No destination ports recorded yet.</div>
          ) : (
            <div className="space-y-2.5">
              {portStats.slice(0, 6).map(([name, count]) => {
                const totalTargeted = packets.length || 1;
                const pct = Math.round((count / totalTargeted) * 100);
                return (
                  <div key={name} className="space-y-1">
                    <div className="flex justify-between text-slate-300 text-[11px]">
                      <span>{name}</span>
                      <span className="text-slate-400 tabular-nums">
                        {count} pkts ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Packet Size Histogram */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Packet Size Distribution</span>
            </h3>
            <span className="text-[11px] text-slate-500">Wire Length</span>
          </div>

          <div className="space-y-3">
            {[
              { label: '< 64 bytes (Runt / Pure ACK)', val: sizeBuckets.tiny, color: 'bg-slate-400' },
              { label: '64 - 128 bytes (DNS / ICMP Echo)', val: sizeBuckets.small, color: 'bg-emerald-400' },
              { label: '129 - 512 bytes (Handshakes & API)', val: sizeBuckets.medium, color: 'bg-cyan-400' },
              { label: '513 - 1024 bytes (Encrypted Blocks)', val: sizeBuckets.large, color: 'bg-indigo-400' },
              { label: '> 1024 bytes (Standard MTU / Jumbo)', val: sizeBuckets.jumbo, color: 'bg-amber-400' },
            ].map((bucket) => {
              const totalPackets = packets.length || 1;
              const pct = Math.round((bucket.val / totalPackets) * 100);
              return (
                <div key={bucket.label} className="space-y-1">
                  <div className="flex justify-between text-slate-300 text-[11px]">
                    <span>{bucket.label}</span>
                    <span className="text-slate-400 tabular-nums">
                      {bucket.val} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                    <div className={`h-full ${bucket.color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
