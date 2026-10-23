import React from 'react';
import { TabType } from '../types';
import { 
  ShieldCheck, 
  Menu,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  onOpenMobileMenu: () => void;
  completedModulesCount: number;
  totalModulesCount: number;
  simulatorCompletedCount: number;
  quizScore: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenMobileMenu,
  completedModulesCount,
  totalModulesCount,
  simulatorCompletedCount,
  quizScore
}) => {
  const getTabTitle = (tab: TabType) => {
    switch (tab) {
      case 'overview': return 'Overview Dashboard';
      case 'learn': return 'Learning Curriculum';
      case 'simulator': return 'Spot-the-Phish Simulator';
      case 'real-vs-fake': return 'Real vs Fake Login Inspector';
      case 'quiz': return 'Final Assessment & Certification';
      case 'slides': return 'Master Presentation Deck';
      case 'tools-precautions': return 'Security Toolbox & Precautions';
      default: return 'Security Portal';
    }
  };

  const progressPercent = Math.round(
    ((completedModulesCount + (simulatorCompletedCount > 0 ? 1 : 0) + (quizScore !== null ? 1 : 0)) / 
    (totalModulesCount + 2)) * 100
  );

  return (
    <header className="bg-[#0B132B] border-b border-[#15233D] text-white sticky top-0 z-30 shadow-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Current Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-[#122344] text-slate-300 hover:text-white border border-[#1e3256]"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                PHISHING AWARENESS PROGRAM
              </span>
              <span className="text-slate-600 text-xs hidden sm:inline">•</span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Client-Side Heuristic Defense
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {getTabTitle(activeTab)}
            </h1>
          </div>
        </div>

        {/* Right: Progress Meter */}
        <div className="flex items-center gap-3 bg-[#08101E] px-3.5 py-1.5 rounded-xl border border-[#15233D]">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Progress</div>
            <div className="text-xs font-bold text-blue-300">
              {progressPercent}% Complete
            </div>
          </div>

          <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/60">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
