import React from 'react';
import { TabType } from '../types';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  GraduationCap, 
  HelpCircle, 
  Crosshair, 
  SplitSquareVertical, 
  Presentation, 
  Wrench,
  X,
  Menu,
  Award
} from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  completedModulesCount: number;
  totalModulesCount: number;
  simulatorCompletedCount: number;
  quizScore: number | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  completedModulesCount,
  totalModulesCount,
  simulatorCompletedCount,
  quizScore
}) => {
  const navItems = [
    {
      id: 'overview' as TabType,
      label: 'Overview',
      icon: LayoutDashboard,
      badge: undefined
    },
    {
      id: 'learn' as TabType,
      label: 'Learn (Modules)',
      icon: GraduationCap,
      badge: `${completedModulesCount}/${totalModulesCount}`
    },
    {
      id: 'simulator' as TabType,
      label: 'Spot-the-Phish',
      icon: Crosshair,
      badge: '8 Labs'
    },
    {
      id: 'real-vs-fake' as TabType,
      label: 'Real vs Fake Inspector',
      icon: SplitSquareVertical
    },
    {
      id: 'quiz' as TabType,
      label: 'Quiz & Certification',
      icon: HelpCircle,
      badge: quizScore !== null ? `${quizScore}/15` : undefined
    },
    {
      id: 'slides' as TabType,
      label: 'Slide Deck',
      icon: Presentation,
      badge: '14 Slides'
    },
    {
      id: 'tools-precautions' as TabType,
      label: 'Toolbox & Rules',
      icon: Wrench
    }
  ];

  const handleSelect = (id: TabType) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#08101E] border-r border-[#15233D] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 no-print ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Top Header & Branding */}
        <div>
          <div className="p-6 border-b border-[#15233D] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600/25 border border-blue-500/50 rounded-xl text-blue-400 shadow-inner">
                <ShieldCheck className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h1 className="text-sm font-black text-white tracking-wider leading-snug uppercase">
                  PHISHING AWARENESS PROGRAM
                </h1>
                <p className="text-[11px] text-slate-400">
                  Interactive Training & Defense
                </p>
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items List */}
          <nav className="p-3.5 space-y-1.5 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#122344] text-blue-300 border border-blue-600/60 shadow-lg shadow-blue-950/40 ring-1 ring-blue-500/40'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-[#0E1A30]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-[#15233D] text-slate-400 border border-[#1e3256]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Disclaimer in Sidebar (matching user's screenshot exactly) */}
        <div className="p-5 border-t border-[#15233D] text-[11px] text-slate-500 leading-relaxed font-sans">
          <p>
            Educational tool. Heuristic scoring only — not a substitute for your organization's official security guidance.
          </p>
        </div>
      </aside>
    </>
  );
};
