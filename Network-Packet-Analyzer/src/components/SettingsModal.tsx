import React, { useState } from 'react';
import { X, Settings, Shield, Sliders, Volume2, VolumeX, Save, RotateCcw } from 'lucide-react';
import { AnalyzerSettings } from '../types/network';

interface SettingsModalProps {
  isOpen: boolean;
  settings: AnalyzerSettings;
  onSave: (newSettings: AnalyzerSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<AnalyzerSettings>({ ...settings });
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    const defaults: AnalyzerSettings = {
      interface: 'eth0 (192.168.1.105)',
      promiscuousMode: true,
      bufferLimit: 5000,
      snapshotLength: 65535,
      packetSpeed: 10,
      soundEnabled: false,
      filterBpf: '',
      theme: 'cyber-slate',
      autoStopPackets: 0,
    };
    setFormData(defaults);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-black/80 flex flex-col max-h-[92vh]">
        {/* Header matching sketch ⚙ SETTING */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 font-mono tracking-wide">
                ⚙ ANALYZER SETTINGS
              </h3>
              <p className="text-xs text-slate-400">
                Network hardware configuration, promiscuous capture & buffer limits
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Network Interface */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              Capture Interface
            </label>
            <select
              value={formData.interface}
              onChange={(e) => setFormData({ ...formData, interface: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="eth0 (192.168.1.105)">eth0 — Primary Gigabit Ethernet (192.168.1.105)</option>
              <option value="wlan0 (10.0.0.45)">wlan0 — Wi-Fi 6 802.11ax (10.0.0.45)</option>
              <option value="lo (127.0.0.1)">lo — Local Loopback Interface (127.0.0.1)</option>
              <option value="any (All Interfaces)">any — Linux Pseudo-device (All Interfaces)</option>
            </select>
            <p className="text-[11px] text-slate-500">
              Selects the physical socket descriptor bound to the packet ring buffer.
            </p>
          </div>

          {/* Promiscuous Mode Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <span className="text-xs font-semibold text-slate-200 block font-mono">
                Promiscuous Mode
              </span>
              <span className="text-[11px] text-slate-400">
                Captures all wire packets regardless of whether destined for this NIC MAC.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, promiscuousMode: !formData.promiscuousMode })}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                formData.promiscuousMode ? 'bg-cyan-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  formData.promiscuousMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Capture Packet Generation Rate */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Live Ingress Rate (Packets / Second)
              </label>
              <span className="font-mono text-cyan-400 font-bold tabular-nums">
                {formData.packetSpeed} pps
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={formData.packetSpeed}
              onChange={(e) => setFormData({ ...formData, packetSpeed: Number(e.target.value) })}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>1 pps (Slow debug)</span>
              <span>10 pps (Standard)</span>
              <span>50 pps (High throughput)</span>
            </div>
          </div>

          {/* Ring Buffer Limit & Snapshot Length */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
                Ring Buffer Limit
              </label>
              <select
                value={formData.bufferLimit}
                onChange={(e) => setFormData({ ...formData, bufferLimit: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="1000">1,000 Packets</option>
                <option value="2500">2,500 Packets</option>
                <option value="5000">5,000 Packets (Recommended)</option>
                <option value="10000">10,000 Packets</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
                Snapshot Length (Snaplen)
              </label>
              <select
                value={formData.snapshotLength}
                onChange={(e) => setFormData({ ...formData, snapshotLength: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="65535">65,535 bytes (Full Packet Payload)</option>
                <option value="1514">1,514 bytes (Standard MTU Frame)</option>
                <option value="256">256 bytes (Header Only)</option>
              </select>
            </div>
          </div>

          {/* BPF Filter Syntax */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Berkeley Packet Filter (BPF) Expression
            </label>
            <input
              type="text"
              placeholder="e.g. tcp port 443 or udp or icmp"
              value={formData.filterBpf}
              onChange={(e) => setFormData({ ...formData, filterBpf: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-mono text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-500">
              Optional kernel-level capture filter to restrict captured traffic before userspace parsing.
            </p>
          </div>

          {/* Audio Chirp Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-3">
              {formData.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
              <div>
                <span className="text-xs font-semibold text-slate-200 block font-mono">
                  Audio Blip Feedback
                </span>
                <span className="text-[11px] text-slate-400">
                  Plays a subtle acoustic chirp upon packet receipt for auditory telemetry.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, soundEnabled: !formData.soundEnabled })}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                formData.soundEnabled ? 'bg-cyan-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  formData.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/70">
          <button
            onClick={handleReset}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold font-mono tracking-wider transition-all shadow-md shadow-cyan-950/40 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedNotice ? 'APPLIED!' : 'APPLY SETTINGS'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
