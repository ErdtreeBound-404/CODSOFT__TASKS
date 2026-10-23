import React, { useState, useEffect } from 'react';
import { X, Terminal, FileCode, Download, Play, Square, Check, Copy, RefreshCw, FileSpreadsheet } from 'lucide-react';
import { BackendStatus } from '../types/network';

interface PythonBackendModalProps {
  isOpen: boolean;
  status: BackendStatus | null;
  isCapturing: boolean;
  onToggleCapture: () => void;
  onRefresh: () => void;
  onClose: () => void;
}

export const PythonBackendModal: React.FC<PythonBackendModalProps> = ({
  isOpen,
  status,
  isCapturing,
  onToggleCapture,
  onRefresh,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'scapy' | 'guide'>('analyzer');
  const [analyzerCode, setAnalyzerCode] = useState<string>('');
  const [scapyCode, setScapyCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('/api/python-code')
        .then((res) => res.json())
        .then((data) => {
          setAnalyzerCode(data.analyzer || '');
          setScapyCode(data.scapy || '');
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentCode = activeTab === 'scapy' ? scapyCode : analyzerCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (filename: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-100 font-mono tracking-wide">
                  PYTHON CAPTURE BACKEND
                </h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isCapturing
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isCapturing ? 'DAEMON RUNNING' : 'IDLE'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Integrated Python packet sniffer & CSV persistent storage (captured_packets.csv)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Quick Bar */}
        <div className="px-6 py-3 bg-slate-950/90 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">ENGINE SCRIPT</span>
            <span className="text-cyan-400 font-bold truncate block">packet_analyzer.py</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">CSV STORAGE</span>
            <span className="text-emerald-400 font-bold truncate block">captured_packets.csv</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">TOTAL CSV ROWS</span>
            <span className="text-slate-200 font-bold tabular-nums">
              {status?.totalCsvPackets ?? '—'} pkts
            </span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">DISK FILE SIZE</span>
            <span className="text-slate-200 font-bold tabular-nums">
              {status?.csvSizeBytes ? `${(status.csvSizeBytes / 1024).toFixed(1)} KB` : '—'}
            </span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-3 border-b border-slate-800 flex items-center justify-between gap-2 bg-slate-900">
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`px-3 py-2 border-b-2 font-bold transition-colors cursor-pointer ${
                activeTab === 'analyzer'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              packet_analyzer.py (Active Engine)
            </button>
            <button
              onClick={() => setActiveTab('scapy')}
              className={`px-3 py-2 border-b-2 font-bold transition-colors cursor-pointer ${
                activeTab === 'scapy'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              scapy_sniffer.py (Scapy Raw Script)
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-2 border-b-2 font-bold transition-colors cursor-pointer ${
                activeTab === 'guide'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              CLI & Local Execution Guide
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={() =>
                downloadFile(
                  activeTab === 'scapy' ? 'scapy_sniffer.py' : 'packet_analyzer.py',
                  currentCode
                )
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Download .py</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-xs">
          {activeTab === 'guide' ? (
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">
                  How Python Backend & CSV Storage Work:
                </h4>
                <p className="text-slate-400 text-xs">
                  The frontend is connected directly to the Python packet engine (`packet_analyzer.py`).
                  Every captured packet is automatically formatted with its timestamp, source IP, destination IP,
                  protocol, byte length, and hexadecimal payload data, and persisted into{' '}
                  <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">captured_packets.csv</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                  Run Directly via Command Line (Terminal):
                </h4>
                <div className="p-3 bg-slate-900 rounded-lg text-cyan-300 overflow-x-auto select-all">
                  # 1. Capture 50 packets of all protocols and save to CSV:
                  <br />
                  python3 packet_analyzer.py --mode all --count 50 --output captured_packets.csv
                  <br />
                  <br />
                  # 2. Filter specifically for TCP traffic:
                  <br />
                  python3 packet_analyzer.py --mode tcp --count 100
                  <br />
                  <br />
                  # 3. Filter specifically for UDP or ICMP ping traffic:
                  <br />
                  python3 packet_analyzer.py --mode icmp --count 25
                  <br />
                  <br />
                  # 4. Stream real-time output continuously:
                  <br />
                  python3 packet_analyzer.py --mode all --count 0 --delay 0.1
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                  For Raw Hardware Sniffing with Scapy:
                </h4>
                <p className="text-slate-400 text-xs">
                  On Linux/macOS systems where you have raw socket privileges and Scapy installed:
                </p>
                <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 overflow-x-auto select-all">
                  sudo pip install scapy matplotlib
                  <br />
                  sudo python3 scapy_sniffer.py
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              {loading ? (
                <div className="py-12 text-center text-slate-500">Loading Python script...</div>
              ) : (
                <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto text-[11px] leading-relaxed text-cyan-300 selection:bg-cyan-900">
                  {currentCode}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <a
              href="/api/download-csv"
              download="captured_packets.csv"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>DOWNLOAD CAPTURED_PACKETS.CSV</span>
            </a>

            <button
              onClick={onRefresh}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
              title="Refresh status from backend"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Sync CSV</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleCapture}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                isCapturing
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white'
              }`}
            >
              {isCapturing ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isCapturing ? 'STOP PYTHON CAPTURE' : 'LAUNCH PYTHON CAPTURE'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
