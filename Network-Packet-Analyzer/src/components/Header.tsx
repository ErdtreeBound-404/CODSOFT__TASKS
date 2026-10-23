import React from 'react';
import { Settings, ShieldCheck, Terminal, FileSpreadsheet } from 'lucide-react';
import { AnalyzerSettings, BackendStatus } from '../types/network';
import { NetworkLogo } from './NetworkLogo';

interface HeaderProps {
  isCapturing: boolean;
  settings: AnalyzerSettings;
  packetCount: number;
  backendStatus: BackendStatus | null;
  onOpenSettings: () => void;
  onOpenPythonBackend: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isCapturing,
  settings,
  packetCount,
  backendStatus,
  onOpenSettings,
  onOpenPythonBackend,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand with Gemini Vector Logo as in uploaded image */}
        <div className="flex items-center gap-3">
          <NetworkLogo isCapturing={isCapturing} size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-wider uppercase text-slate-100 font-sans">
                NETWORK PACKET ANALYZER
              </span>
              <span className="hidden lg:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                v2.4
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    isCapturing ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                  }`}
                />
                {isCapturing ? 'PYTHON CAPTURING' : 'IDLE'}
              </span>
              <span>·</span>
              <span className="text-slate-400">{settings.interface}</span>
              <span>·</span>
              <span className="text-slate-400 tabular-nums">{packetCount.toLocaleString()} in CSV</span>
            </div>
          </div>
        </div>

        {/* Right Controls: Python Backend, Promiscuous Tag, Settings */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Python + CSV Backend Status Button */}
          <button
            onClick={onOpenPythonBackend}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
            title="Inspect Python backend and captured_packets.csv"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">PYTHON & CSV</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-900/60 text-emerald-200">
              {backendStatus?.totalCsvPackets ?? packetCount}
            </span>
          </button>

          {/* Quick Direct CSV download */}
          <a
            href="/api/download-csv"
            download="captured_packets.csv"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
            title="Download on-disk captured_packets.csv"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
            <span>.CSV</span>
          </a>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROMISCUOUS: {settings.promiscuousMode ? 'ON' : 'OFF'}</span>
          </div>

          {/* Settings Button matching sketch ⚙ SETTING */}
          <button
            onClick={onOpenSettings}
            type="button"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40 cursor-pointer"
            title="Open Capture and Analyzer Settings"
          >
            <Settings className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
            <span className="uppercase font-mono">⚙ SETTING</span>
          </button>
        </div>
      </div>
    </header>
  );
};
