import React from 'react';
import { LayoutDashboard, BarChart3, Database, ShieldAlert, LogOut } from 'lucide-react';

export type ActiveTab = 'DASHBOARD' | 'OVERVIEW' | 'PACKETS' | 'ANALYSIS';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenLogout: () => void;
  packetCount: number;
  anomalyCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  onOpenLogout,
  packetCount,
  anomalyCount,
}) => {
  const navItems: { key: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      key: 'DASHBOARD',
      label: 'DASHBOARD',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      key: 'OVERVIEW',
      label: 'OVERVIEW',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      key: 'PACKETS',
      label: 'PACKETS',
      icon: <Database className="w-4 h-4" />,
      badge: packetCount > 0 ? packetCount.toLocaleString() : undefined,
    },
    {
      key: 'ANALYSIS',
      label: 'ANALYSIS',
      icon: <ShieldAlert className="w-4 h-4" />,
      badge: anomalyCount > 0 ? `${anomalyCount} alerts` : undefined,
    },
  ];

  return (
    <nav className="border-b border-slate-800 bg-slate-900/90 px-4 sm:px-8 py-2 sticky top-[57px] z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[11px] font-mono tabular-nums px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right side: Log Out button as in sketch */}
        <button
          onClick={onOpenLogout}
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 border border-rose-900/40 hover:border-rose-700/60 transition-colors whitespace-nowrap cursor-pointer ml-auto"
          title="Sign out or switch analyst session"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="font-semibold tracking-wide">Log Out</span>
        </button>
      </div>
    </nav>
  );
};
