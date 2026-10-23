import React, { useState } from 'react';
import { Shield, Key, ArrowRight, UserCheck, GraduationCap } from 'lucide-react';
import { NetworkLogo } from './NetworkLogo';
import { AnalystUser } from '../types/network';

interface LoginViewProps {
  onLogin: (user: AnalystUser) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('prakhar');
  const [passkey, setPasskey] = useState('••••••••••••');

  const handleLogin = () => {
    onLogin({
      name: 'Prakhar',
      role: 'Student',
      analystId: 'STU-2026',
      sessionStartTime: Date.now(),
      avatarSeed: 'Prakhar',
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Lockup */}
        <div className="flex flex-col items-center text-center space-y-3">
          <NetworkLogo isCapturing={false} size="md" />
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-slate-100 font-mono">
              NETWORK PACKET ANALYZER
            </h1>
            <p className="text-xs text-cyan-400 font-mono tracking-widest uppercase mt-0.5">
              REAL TIME TRAFFIC MONITORING
            </p>
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-black/80 space-y-5">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
              Student Authentication Console
            </h2>
            <p className="text-xs text-slate-400">
              Sign in with your student credentials to start packet analysis and network traffic inspection.
            </p>
          </div>

          {/* Single Assigned User Badge */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-bold font-mono text-base shadow-sm">
                P
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-100 text-sm">Prakhar</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                    STU-2026
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Position: Student</span>
                </div>
              </div>
            </div>
            <span className="px-2 py-1 rounded text-[10px] font-mono font-bold bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
              AUTHORIZED
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4 text-xs font-mono"
          >
            <div className="space-y-1">
              <label className="text-slate-400 text-[11px] uppercase">Login Handle</label>
              <div className="relative">
                <Shield className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 text-[11px] uppercase">Security Token</label>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold tracking-wider uppercase transition-all shadow-md shadow-cyan-950/50 cursor-pointer text-xs"
            >
              <span>LOGIN AS PRAKHAR (STUDENT)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Launch */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={handleLogin}
              type="button"
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 font-mono transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Quick Login: <strong>Prakhar</strong> [Student]</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
