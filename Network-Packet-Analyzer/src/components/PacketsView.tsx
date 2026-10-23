import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Database,
  Search,
  Filter,
  Download,
  Trash2,
  Play,
  Pause,
  PlusCircle,
  ArrowUpDown,
  ExternalLink,
} from 'lucide-react';
import { Packet, ProtocolType } from '../types/network';

interface PacketsViewProps {
  packets: Packet[];
  isCapturing: boolean;
  onToggleCapture: () => void;
  onClearPackets: () => void;
  onSelectPacket: (packet: Packet) => void;
  onInjectPacket: (proto: ProtocolType) => void;
  initialProtocolFilter?: ProtocolType | null;
}

export const PacketsView: React.FC<PacketsViewProps> = ({
  packets,
  isCapturing,
  onToggleCapture,
  onClearPackets,
  onSelectPacket,
  onInjectPacket,
  initialProtocolFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState<string>(initialProtocolFilter || 'ALL');
  const [autoScroll, setAutoScroll] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const tableEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialProtocolFilter) {
      setSelectedProtocol(initialProtocolFilter);
    }
  }, [initialProtocolFilter]);

  // Filtered packets
  const filteredPackets = useMemo(() => {
    return packets.filter((pkt) => {
      // Protocol filter
      if (selectedProtocol !== 'ALL' && pkt.protocol !== selectedProtocol) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesIp =
          pkt.srcIp.toLowerCase().includes(q) || pkt.dstIp.toLowerCase().includes(q);
        const matchesInfo = pkt.info.toLowerCase().includes(q);
        const matchesPort =
          (pkt.srcPort && pkt.srcPort.toString().includes(q)) ||
          (pkt.dstPort && pkt.dstPort.toString().includes(q));
        const matchesId = pkt.id.toString().includes(q);
        return matchesIp || matchesInfo || matchesPort || matchesId;
      }
      return true;
    });
  }, [packets, selectedProtocol, searchQuery]);

  const displayedPackets = useMemo(() => {
    if (sortOrder === 'desc') {
      return [...filteredPackets].reverse();
    }
    return filteredPackets;
  }, [filteredPackets, sortOrder]);

  // Auto-scroll when new packets arrive if enabled
  useEffect(() => {
    if (autoScroll && sortOrder === 'asc' && tableEndRef.current) {
      tableEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [packets.length, autoScroll, sortOrder]);

  const exportAsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(packets, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `packet_capture_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportAsCSV = () => {
    const headers = ['No', 'Time', 'Source', 'SrcPort', 'Destination', 'DstPort', 'Protocol', 'Length', 'Info'];
    const rows = packets.map((p) => [
      p.id,
      p.timeOffset,
      p.srcIp,
      p.srcPort || '',
      p.dstIp,
      p.dstPort || '',
      p.protocol,
      p.length,
      `"${p.info.replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `packet_capture_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12 flex flex-col h-[calc(100vh-140px)] min-h-[600px]">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 sm:p-4 rounded-2xl shrink-0">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter by IP, Port, Info, or ID (e.g. 192.168.1.1, 443, SYN)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Protocol Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          {['ALL', 'TCP', 'UDP', 'ICMP'].map((proto) => (
            <button
              key={proto}
              onClick={() => setSelectedProtocol(proto)}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                selectedProtocol === proto
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {proto}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Pause / Resume capture */}
          <button
            onClick={onToggleCapture}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              isCapturing
                ? 'bg-rose-950/60 border-rose-500/40 text-rose-300 hover:bg-rose-900/60'
                : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
            }`}
          >
            {isCapturing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isCapturing ? 'Pause' : 'Resume'}</span>
          </button>

          {/* Auto-scroll toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-2.5 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              autoScroll
                ? 'bg-slate-800 text-cyan-300 border-cyan-500/30'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
            title="Auto-scroll to latest packets"
          >
            Scroll: {autoScroll ? 'ON' : 'OFF'}
          </button>

          {/* Inject Packet */}
          <button
            onClick={() => onInjectPacket('TCP')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Inject simulated packet"
          >
            <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Inject</span>
          </button>

          {/* Export dropdown */}
          <div className="flex items-center gap-1.5">
            <a
              href="/api/download-csv"
              download="captured_packets.csv"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/50 transition-colors cursor-pointer text-xs font-bold"
              title="Download on-disk captured_packets.csv from Python backend"
            >
              <Download className="w-3.5 h-3.5" />
              <span>captured_packets.csv</span>
            </a>
            <button
              onClick={exportAsJSON}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title="Export visible view as JSON"
            >
              JSON
            </button>
          </div>

          {/* Clear Buffer */}
          <button
            onClick={onClearPackets}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-700 transition-colors cursor-pointer"
            title="Clear packet buffer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Packet Table Container */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-xl">
        <div className="overflow-x-auto flex-1 font-mono text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-950/90 sticky top-0 z-10 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="py-2.5 px-3 w-16 cursor-pointer hover:text-cyan-400"
                >
                  <div className="flex items-center gap-1">
                    <span>No.</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-2.5 px-3 w-24">Time (s)</th>
                <th className="py-2.5 px-3 w-48">Source</th>
                <th className="py-2.5 px-3 w-48">Destination</th>
                <th className="py-2.5 px-3 w-20">Protocol</th>
                <th className="py-2.5 px-3 w-20 text-right">Length</th>
                <th className="py-2.5 px-3">Information & Flags</th>
                <th className="py-2.5 px-3 w-14 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {displayedPackets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-500">
                    <Database className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    <p className="text-sm font-semibold text-slate-400">No packets to display</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {packets.length === 0
                        ? 'Initiate packet capture or inject a test packet.'
                        : 'No packets match your active search and filter criteria.'}
                    </p>
                  </td>
                </tr>
              ) : (
                displayedPackets.map((pkt) => (
                  <tr
                    key={pkt.id}
                    onClick={() => onSelectPacket(pkt)}
                    className="hover:bg-slate-800/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-2 px-3 text-slate-500 tabular-nums font-semibold">
                      {pkt.id}
                    </td>
                    <td className="py-2 px-3 text-slate-400 tabular-nums">
                      {pkt.timeOffset}
                    </td>
                    <td className="py-2 px-3 text-slate-200 truncate max-w-[160px]">
                      {pkt.srcIp}
                      {pkt.srcPort && <span className="text-slate-400">:{pkt.srcPort}</span>}
                    </td>
                    <td className="py-2 px-3 text-slate-200 truncate max-w-[160px]">
                      {pkt.dstIp}
                      {pkt.dstPort && <span className="text-slate-400">:{pkt.dstPort}</span>}
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          pkt.protocol === 'TCP'
                            ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-700/60'
                            : pkt.protocol === 'UDP'
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/60'
                            : 'bg-amber-950/80 text-amber-400 border border-amber-700/60'
                        }`}
                      >
                        {pkt.protocol}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums text-slate-300">
                      {pkt.length}
                    </td>
                    <td className="py-2 px-3 text-slate-300 truncate max-w-xs sm:max-w-md">
                      {pkt.info}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="p-1 rounded text-slate-400 group-hover:text-cyan-400 inline-block transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div ref={tableEndRef} />
        </div>

        {/* Footer Status Bar */}
        <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div>
            Showing <span className="text-slate-200 font-bold">{displayedPackets.length}</span> of{' '}
            <span className="text-slate-200">{packets.length}</span> packets in buffer
          </div>
          <div className="flex items-center gap-3">
            <span>Filter: {selectedProtocol}</span>
            <span>·</span>
            <span>Sorted: {sortOrder.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
