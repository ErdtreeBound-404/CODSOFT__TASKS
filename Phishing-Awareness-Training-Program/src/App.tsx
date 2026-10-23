import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { modulesData } from './data/modulesData';
import { scenariosData } from './data/scenariosData';
import { quizQuestionsData } from './data/quizData';
import { slidesData } from './data/slidesData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { ModuleViewer } from './components/ModuleViewer';
import { SpotThePhishSimulator } from './components/SpotThePhishSimulator';
import { RealVsFakeInspector } from './components/RealVsFakeInspector';
import { FinalQuiz } from './components/FinalQuiz';
import { SlideDeck } from './components/SlideDeck';
import { ToolboxAndPrecautions } from './components/ToolboxAndPrecautions';

import { 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Shield,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  
  // Local storage persisted state
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('phish_completed_modules');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [simulatorScore, setSimulatorScore] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('phish_simulator_score');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [quizScore, setQuizScore] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('phish_quiz_score');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('phish_completed_modules', JSON.stringify(completedModules));
    } catch {}
  }, [completedModules]);

  useEffect(() => {
    if (simulatorScore !== null) {
      try {
        localStorage.setItem('phish_simulator_score', JSON.stringify(simulatorScore));
      } catch {}
    }
  }, [simulatorScore]);

  useEffect(() => {
    if (quizScore !== null) {
      try {
        localStorage.setItem('phish_quiz_score', JSON.stringify(quizScore));
      } catch {}
    }
  }, [quizScore]);

  const handleCompleteModule = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules((prev) => [...prev, moduleId]);
    }
  };

  const handleFinishSimulator = (score: number) => {
    setSimulatorScore(score);
  };

  const handleCompleteQuiz = (score: number) => {
    setQuizScore(score);
  };

  return (
    <div className="min-h-screen bg-[#070e1c] text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      {/* Features on Left Side: Sleek Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        completedModulesCount={completedModules.length}
        totalModulesCount={modulesData.length}
        simulatorCompletedCount={simulatorScore !== null ? scenariosData.length : 0}
        quizScore={quizScore}
      />

      {/* Main Content Area on Right */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen w-full overflow-x-hidden">
        {/* Top Navbar */}
        <Header
          activeTab={activeTab}
          onOpenMobileMenu={() => setMobileOpen(true)}
          completedModulesCount={completedModules.length}
          totalModulesCount={modulesData.length}
          simulatorCompletedCount={simulatorScore !== null ? scenariosData.length : 0}
          quizScore={quizScore}
        />

        {/* Feature Main Content Body */}
        <main className="flex-1 pb-16">
          {activeTab === 'overview' && (
            <DashboardOverview
              setActiveTab={setActiveTab}
              completedModulesCount={completedModules.length}
              totalModulesCount={modulesData.length}
              simulatorScore={simulatorScore}
              quizScore={quizScore}
            />
          )}

          {activeTab === 'learn' && (
            <ModuleViewer
              modules={modulesData}
              completedModules={completedModules}
              onCompleteModule={handleCompleteModule}
              onNavigateToSimulator={() => setActiveTab('simulator')}
            />
          )}

          {activeTab === 'simulator' && (
            <SpotThePhishSimulator
              scenarios={scenariosData}
              onFinishSimulator={handleFinishSimulator}
              onNavigateToRealVsFake={() => setActiveTab('real-vs-fake')}
            />
          )}

          {activeTab === 'real-vs-fake' && (
            <RealVsFakeInspector />
          )}

          {activeTab === 'quiz' && (
            <FinalQuiz
              questions={quizQuestionsData}
              onCompleteQuiz={handleCompleteQuiz}
              savedScore={quizScore}
            />
          )}

          {activeTab === 'slides' && (
            <SlideDeck
              slides={slidesData}
            />
          )}

          {activeTab === 'tools-precautions' && (
            <ToolboxAndPrecautions />
          )}
        </main>

        {/* Footer */}
        <footer className="no-print bg-[#050b16] text-slate-500 border-t border-[#15233D] text-xs py-8 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span className="font-bold tracking-wide">PHISHING AWARENESS PROGRAM</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <span>Client-Side Heuristic Engine</span>
              <span>•</span>
              <span>Zero Log Telemetry</span>
              <span>•</span>
              <span>WCAG 2.1 Compliant</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
