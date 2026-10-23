import React from 'react';
import { TabType } from '../types';
import { 
  ShieldCheck, 
  BookOpen, 
  Crosshair, 
  SplitSquareVertical, 
  Award, 
  Presentation, 
  Wrench,
  ArrowRight,
  ShieldAlert,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp
} from 'lucide-react';

interface DashboardOverviewProps {
  setActiveTab: (tab: TabType) => void;
  completedModulesCount: number;
  totalModulesCount: number;
  simulatorScore: number | null;
  quizScore: number | null;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  setActiveTab,
  completedModulesCount,
  totalModulesCount,
  simulatorScore,
  quizScore
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0f1d35] via-[#142646] to-[#0f1d35] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 bg-blue-600 rounded-lg text-white">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-mono tracking-widest text-blue-400 font-bold">
              PHISHING AWARENESS PROGRAM
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Phishing Detection & Threat Awareness
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Protect yourself and your organization against modern social engineering, typosquatted portals, and deceptive communications with interactive simulations and real-life case studies.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => setActiveTab('learn')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-blue-900/40 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Curriculum (6 Modules)</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <Crosshair className="w-4 h-4" />
              <span>Launch Spot-the-Phish Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Program Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f1d35] p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-semibold">
            <span>Modules Completed</span>
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {completedModulesCount} <span className="text-sm font-normal text-slate-400">/ {totalModulesCount}</span>
          </div>
          <div className="text-xs text-blue-400 mt-2 font-medium">
            {Math.round((completedModulesCount / totalModulesCount) * 100)}% Curriculum Finished
          </div>
        </div>

        <div className="bg-[#0f1d35] p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-semibold">
            <span>Spot-the-Phish Labs</span>
            <Crosshair className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {simulatorScore !== null ? `${simulatorScore} / 8` : 'Ready to Start'}
          </div>
          <div className="text-xs text-emerald-400 mt-2 font-medium">
            8 Interactive Scenarios
          </div>
        </div>

        <div className="bg-[#0f1d35] p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-semibold">
            <span>Final Certification</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {quizScore !== null ? `${quizScore} / 15` : '15 Questions'}
          </div>
          <div className="text-xs text-amber-400 mt-2 font-medium">
            {quizScore !== null && quizScore >= 12 ? '✓ Certificate Awarded' : 'Requires 80% to Pass'}
          </div>
        </div>

        <div className="bg-[#0f1d35] p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1 font-semibold">
            <span>Presentation Deck</span>
            <Presentation className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">
            14 Slides
          </div>
          <div className="text-xs text-indigo-400 mt-2 font-medium">
            Presenter Notes & PDF Export
          </div>
        </div>
      </div>

      {/* Feature Navigation Cards Grid */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">
          Core Security Capabilities & Labs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Interactive Modules */}
          <div 
            onClick={() => setActiveTab('learn')}
            className="p-6 bg-[#0f1d35] hover:bg-[#142646] rounded-2xl border border-slate-800 hover:border-blue-500/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                Learning Modules (6 Deep Dives)
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Covers attack taxonomy, email red flags with interactive hotspots, social engineering psychology, MFA hierarchy, and 4 major case studies.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-bold">
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Spot-the-Phish Simulator */}
          <div 
            onClick={() => setActiveTab('simulator')}
            className="p-6 bg-[#0f1d35] hover:bg-[#142646] rounded-2xl border border-slate-800 hover:border-blue-500/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Crosshair className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                Spot-the-Phish Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                8 real-world interactive scenarios. Inspect email headers, test hover hyperlinks, inspect attachments, and cast your verdict.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-bold">
              <span>Play Mini-Game</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Real vs Fake Inspector */}
          <div 
            onClick={() => setActiveTab('real-vs-fake')}
            className="p-6 bg-[#0f1d35] hover:bg-[#142646] rounded-2xl border border-slate-800 hover:border-blue-500/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-600/30 text-amber-400 border border-amber-500/40 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <SplitSquareVertical className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Real vs. Fake Login Inspector
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Side-by-side analysis of authentic portals versus harmless cloned harvesters. Unpacks domain anatomy and debunking the HTTPS padlock myth.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-bold">
              <span>Inspect Portals</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Final Assessment & Certification */}
          <div 
            onClick={() => setActiveTab('quiz')}
            className="p-6 bg-[#0f1d35] hover:bg-[#142646] rounded-2xl border border-slate-800 hover:border-blue-500/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-400 border border-purple-500/40 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                Final Exam & Certification
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                15 comprehensive assessment questions. Pass with 80% to generate and print your official verifiable Certificate of Completion.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-bold">
              <span>Take Assessment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Slide Deck Presentation */}
          <div 
            onClick={() => setActiveTab('slides')}
            className="p-6 bg-[#0f1d35] hover:bg-[#142646] rounded-2xl border border-slate-800 hover:border-blue-500/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Presentation className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                Presentation Slide Deck
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                14-slide executive presentation with keyboard arrows, presenter speaker notes script, and 1-click printable PDF export view.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-bold">
              <span>View Slides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Toolbox & Precautions */}
          <div 
            onClick={() => setActiveTab('tools-precautions')}
            className="p-6 bg-[#0f1d35] hover:bg-[#142646] rounded-2xl border border-slate-800 hover:border-blue-500/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-600/30 text-teal-400 border border-teal-500/40 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                Toolbox & Precautions
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Investigation guides (VirusTotal, URLScan, WHOIS, MXToolbox), interactive URL defanging utility, and deliverable checklist.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-teal-400 font-bold">
              <span>Explore Tools</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
