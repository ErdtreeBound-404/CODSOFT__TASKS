import React from 'react';
import { X, LogOut, Shield, User, Clock, Database, AlertTriangle, GraduationCap } from 'lucide-react';
import { AnalystUser } from '../types/network';

interface LogoutModalProps {
  isOpen: boolean;
  user: AnalystUser;
  packetCount: number;
  totalBytes: number;
  anomalyCount: number;
  onConfirmLogout: () => void;
  onSwitchProfile?: (newRole: string, newName: string) => void;
  onClose: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  user,
  packetCount,
  totalBytes,
  anomalyCount,
  onConfirmLogout,
  onClose,
}) => {
  if (!isOpen) return null;

  const sessionMinutes = Math.max(1, Math.round((Date.now() - user.sessionStartTime) / (1000 * 60)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl shadow-black/80 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-400">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 font-mono tracking-wide">
                STUDENT SESSION
              </h3>
              <p className="text-xs text-slate-400">Session metrics and authentication logout</p>
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

        {/* Content */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {/* Active User Card - Prakhar (Student) */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-black font-mono text-lg shadow-md shadow-cyan-950/50">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-100 text-base">Prakhar</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                  STU-2026
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-cyan-300 mt-0.5">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-medium">Position: Student</span>
              </div>
            </div>
          </div>

          {/* Session Telemetry Counters */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <Clock className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
              <span className="text-[11px] text-slate-400 block">Session Time</span>
              <span className="text-base font-bold font-mono text-slate-200">{sessionMinutes}m</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <Database className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
              <span className="text-[11px] text-slate-400 block">Captured</span>
              <span className="text-base font-bold font-mono text-slate-200 tabular-nums">
                {packetCount.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <AlertTriangle className="w-4 h-4 mx-auto mb-1 text-amber-400" />
              <span className="text-[11px] text-slate-400 block">Alerts</span>
              <span className="text-base font-bold font-mono text-slate-200">{anomalyCount}</span>
            </div>
          </div>

          {/* Assigned Account Info */}
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1.5 text-slate-300 font-mono text-xs">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>Assigned Account Profile</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
              <span>Full Name:</span>
              <span className="text-slate-200 font-semibold">Prakhar</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Assigned Position:</span>
              <span className="text-cyan-300 font-semibold">Student</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Access Level:</span>
              <span className="text-emerald-400 font-semibold">Full Network Packet Capture</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/70">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Stay in Console
          </button>

          <button
            onClick={onConfirmLogout}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold font-mono tracking-wider transition-all shadow-md shadow-rose-950/40 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOG OUT (PRAKHAR)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
