import React, { useState } from 'react';
import { ModuleData } from '../types';
import { interactiveHotspotEmailData } from '../data/modulesData';
import { caseStudiesData } from '../data/caseStudiesData';
import { 
  ShieldAlert, 
  MailWarning, 
  Globe, 
  Brain, 
  Lock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  HelpCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Target,
  Sparkles,
  MousePointerClick
} from 'lucide-react';

interface ModuleViewerProps {
  modules: ModuleData[];
  completedModules: number[];
  onCompleteModule: (moduleId: number) => void;
  onNavigateToSimulator: () => void;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  modules,
  completedModules,
  onCompleteModule,
  onNavigateToSimulator
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);
  const [selectedQuickAnswer, setSelectedQuickAnswer] = useState<number | null>(null);
  const [hasSubmittedQuickCheck, setHasSubmittedQuickCheck] = useState<boolean>(false);
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string>('case-twitter-2020');

  const currentModule = modules.find((m) => m.id === selectedModuleId) || modules[0];
  const isCompleted = completedModules.includes(currentModule.id);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return ShieldAlert;
      case 'MailWarning': return MailWarning;
      case 'Globe': return Globe;
      case 'Brain': return Brain;
      case 'Lock': return Lock;
      case 'FileText': return FileText;
      default: return ShieldAlert;
    }
  };

  const handleModuleChange = (id: number) => {
    setSelectedModuleId(id);
    setSelectedQuickAnswer(null);
    setHasSubmittedQuickCheck(false);
    setSelectedHotspotId(null);
  };

  const handleQuickCheckSubmit = () => {
    if (selectedQuickAnswer === null) return;
    setHasSubmittedQuickCheck(true);
    if (selectedQuickAnswer === currentModule.quickCheck.correctIndex) {
      onCompleteModule(currentModule.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Module Overview Carousel / Selector */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Core Learning Curriculum</h2>
            <p className="text-sm text-slate-400">Select any module to inspect key concepts, real-life examples, and defense tactics.</p>
          </div>
          <div className="text-xs font-semibold px-3 py-1 bg-[#122344] text-blue-300 rounded-full border border-blue-900/60">
            {completedModules.length} of {modules.length} Completed
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {modules.map((mod) => {
            const Icon = getModuleIcon(mod.icon);
            const isSelected = mod.id === selectedModuleId;
            const isDone = completedModules.includes(mod.id);

            return (
              <button
                key={mod.id}
                onClick={() => handleModuleChange(mod.id)}
                className={`relative p-3.5 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-950/40 ring-2 ring-blue-400/50'
                    : isDone
                    ? 'bg-emerald-950/40 text-emerald-100 border-emerald-800/60 hover:border-emerald-600'
                    : 'bg-[#0f1d35] text-slate-200 border-slate-800 hover:border-blue-500/50 hover:bg-[#142646]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${
                    isSelected ? 'bg-blue-700 text-white' : isDone ? 'bg-emerald-900/60 text-emerald-400' : 'bg-[#182949] text-blue-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isDone ? (
                    <span className="flex items-center text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-blue-700 text-blue-100' : 'bg-[#182949] text-slate-400'
                    }`}>
                      {mod.durationMinutes}m
                    </span>
                  )}
                </div>
                <div>
                  <div className={`text-[11px] font-semibold uppercase tracking-wider mb-0.5 ${
                    isSelected ? 'text-blue-100' : isDone ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    Module {mod.id}
                  </div>
                  <div className="text-xs font-bold line-clamp-1">
                    {mod.title.replace(`Module ${mod.id}: `, '')}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Module Content Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Module Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-blue-600 text-white rounded">
                  Module {currentModule.id} of {modules.length}
                </span>
                <span className="text-xs text-blue-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {currentModule.durationMinutes} Minutes Reading & Practice
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                {currentModule.title}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl">
                {currentModule.subtitle}
              </p>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Module Completed</span>
              </div>
            )}
          </div>

          <div className="mt-5 p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs sm:text-sm text-slate-300">
            <span className="font-semibold text-blue-300">Learning Objective: </span>
            {currentModule.summary}
          </div>
        </div>

        {/* Module Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {currentModule.sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                {section.title}
              </h3>

              <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                {section.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {section.bulletPoints && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                    Key Indicators & Rules:
                  </h4>
                  <ul className="space-y-2.5">
                    {section.bulletPoints.map((bp, bIdx) => {
                      const [title, desc] = bp.split(': ');
                      return (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            {desc ? (
                              <>
                                <strong className="text-slate-900 font-semibold">{title}:</strong> {desc}
                              </>
                            ) : (
                              <span>{bp}</span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Callout box */}
              {section.callout && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  section.callout.type === 'danger'
                    ? 'bg-rose-50 border-rose-200 text-rose-900'
                    : section.callout.type === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : section.callout.type === 'tip'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-blue-50 border-blue-200 text-blue-900'
                }`}>
                  <div className="mt-0.5 shrink-0">
                    {section.callout.type === 'danger' && <AlertCircle className="w-5 h-5 text-rose-600" />}
                    {section.callout.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                    {section.callout.type === 'tip' && <Sparkles className="w-5 h-5 text-emerald-600" />}
                    {section.callout.type === 'info' && <Info className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider mb-1">
                      {section.callout.title}
                    </h5>
                    <p className="text-sm leading-relaxed">
                      {section.callout.text}
                    </p>
                  </div>
                </div>
              )}

              {/* Vector or Technique Diagram */}
              {section.diagramData && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {section.diagramData.items.map((item, dIdx) => (
                    <div 
                      key={dIdx} 
                      className="p-4 rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 hover:border-blue-300 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                          {dIdx + 1}
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.label}</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Module 2 Special Feature: Interactive Hotspot Email Viewer */}
          {currentModule.id === 2 && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="mb-4">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-sm uppercase tracking-wider">
                  <MousePointerClick className="w-4 h-4" />
                  Interactive Defanged Email Hotspot Exercise
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Click the Red Flag Badges to Uncover Phishing Indicators
                </h3>
                <p className="text-sm text-slate-600">
                  Security analysts review raw messages to discover forensic flaws. Click each glowing badge (1 to 5) on the email simulation below:
                </p>
              </div>

              {/* Hotspot Email Container */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-100 rounded-xl p-4 border border-slate-300 shadow-inner">
                  {/* Email Client Shell */}
                  <div className="bg-white rounded-lg border border-slate-300 overflow-hidden shadow-sm">
                    {/* Fake Mail Client Header */}
                    <div className="bg-slate-800 text-white px-4 py-2 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                        </div>
                        <span className="text-slate-300 font-mono text-[11px]">Corporate Mailbox - [SIMULATED DEFANGED SAMPLE]</span>
                      </div>
                      <span className="text-amber-300 font-mono text-[10px] bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600">
                        DEFANGED SAMPLE
                      </span>
                    </div>

                    {/* Metadata bar with interactive sender hotspot */}
                    <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-semibold w-16">From:</span>
                          <span className="font-bold text-slate-900">
                            {interactiveHotspotEmailData.senderName}
                          </span>
                          <span className="font-mono text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                            &lt;{interactiveHotspotEmailData.senderEmail}&gt;
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedHotspotId('hotspot-sender')}
                          className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm transition-all ${
                            selectedHotspotId === 'hotspot-sender'
                              ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                              : 'bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300 animate-pulse'
                          }`}
                        >
                          🚩 Hotspot #1: Sender Domain
                        </button>
                      </div>

                      <div className="flex items-center">
                        <span className="text-slate-500 font-semibold w-16">To:</span>
                        <span className="text-slate-700">{interactiveHotspotEmailData.recipient}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-slate-500 font-semibold w-16">Subject:</span>
                          <span className="font-semibold text-rose-700">
                            {interactiveHotspotEmailData.subject}
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedHotspotId('hotspot-urgency')}
                          className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm transition-all ${
                            selectedHotspotId === 'hotspot-urgency'
                              ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                              : 'bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300'
                          }`}
                        >
                          🚩 Hotspot #2: Urgency Clock
                        </button>
                      </div>
                    </div>

                    {/* Email Message Body with Interactive elements */}
                    <div className="p-5 text-sm space-y-4">
                      {/* Salutation hotspot */}
                      <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-2">
                        <p className="font-bold text-slate-800">Dear Valued User,</p>
                        <button
                          onClick={() => setSelectedHotspotId('hotspot-salutation')}
                          className={`text-xs px-2 py-0.5 rounded-full font-bold transition-all ${
                            selectedHotspotId === 'hotspot-salutation'
                              ? 'bg-amber-600 text-white'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300'
                          }`}
                        >
                          🚩 Hotspot #3: Generic Salutation
                        </button>
                      </div>

                      <p className="text-slate-700">
                        Your Microsoft 365 enterprise account credentials will expire today at <strong className="text-rose-600">11:00 AM EST</strong> due to mandatory quarterly domain security updates.
                      </p>

                      <p className="text-slate-700">
                        If you fail to validate your login credentials, your email inbox, OneDrive, and corporate VPN access will be <strong className="text-rose-600">permanently suspended</strong> by system administrators.
                      </p>

                      {/* Deceptive Action Link Hotspot */}
                      <div className="py-2 flex items-center justify-between bg-blue-50/50 p-3 rounded-lg border border-blue-200/60">
                        <div>
                          <div className="inline-block bg-[#0078d4] text-white px-5 py-2 rounded font-semibold text-xs shadow-sm cursor-pointer hover:bg-blue-700">
                            Retain Current Password & Verify Account
                          </div>
                          <div className="text-[11px] font-mono text-rose-600 mt-1">
                            Destination: hxxps://auth-login-check[.]cc/token?id=9218
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedHotspotId('hotspot-link')}
                          className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                            selectedHotspotId === 'hotspot-link'
                              ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                              : 'bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300 animate-pulse'
                          }`}
                        >
                          🚩 Hotspot #4: Deceptive Link
                        </button>
                      </div>

                      {/* Attachment Hotspot */}
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="p-2 bg-rose-100 text-rose-700 rounded font-bold text-xs">HTML</span>
                          <div>
                            <div className="font-mono text-xs font-semibold text-slate-800">
                              Security_Certificate_Renewal_2026.html
                            </div>
                            <div className="text-[11px] text-slate-500">24.8 KB • Dangerous Script Container</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedHotspotId('hotspot-attachment')}
                          className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                            selectedHotspotId === 'hotspot-attachment'
                              ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                              : 'bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300'
                          }`}
                        >
                          🚩 Hotspot #5: HTML File
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hotspot Forensic Analysis Drawer */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-blue-600" />
                      Forensic Hotspot Inspector
                    </h4>
                    
                    {selectedHotspotId ? (
                      (() => {
                        const spot = interactiveHotspotEmailData.hotspots.find(h => h.id === selectedHotspotId);
                        if (!spot) return null;
                        return (
                          <div className="space-y-4">
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                  spot.severity === 'critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {spot.severity} Threat Severity
                                </span>
                                <span className="text-xs text-slate-500 font-mono">{spot.location}</span>
                              </div>
                              <h5 className="font-bold text-slate-900 text-base">{spot.title}</h5>
                            </div>

                            <div className="p-4 bg-white rounded-lg border border-slate-200 text-sm text-slate-700 leading-relaxed shadow-sm">
                              <p className="font-semibold text-slate-900 mb-1">Security Analysis:</p>
                              {spot.explanation}
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="text-center py-10 px-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                          <MousePointerClick className="w-6 h-6" />
                        </div>
                        <h5 className="font-bold text-slate-800 text-sm mb-1">Click Any Red Flag Badge</h5>
                        <p className="text-xs text-slate-500">
                          Click on Hotspot #1 through #5 on the email mock to inspect the security analysis.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-200 mt-4">
                    <button
                      onClick={onNavigateToSimulator}
                      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Try the 8-Scenario Simulator</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Module 6 Special Feature: Case Studies Interactive Viewer */}
          {currentModule.id === 6 && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Interactive Case Study Archive (Historical Breach Analysis)
              </h3>

              <div className="flex overflow-x-auto gap-2 pb-2 mb-6">
                {caseStudiesData.map((cs) => (
                  <button
                    key={cs.id}
                    onClick={() => setSelectedCaseStudyId(cs.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                      selectedCaseStudyId === cs.id
                        ? 'bg-blue-900 text-white border-blue-900 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {cs.year} • {cs.organization}
                  </button>
                ))}
              </div>

              {(() => {
                const cs = caseStudiesData.find(c => c.id === selectedCaseStudyId) || caseStudiesData[0];
                return (
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded">
                            Year {cs.year}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            Target: {cs.organization}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900">{cs.title}</h4>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Damage</div>
                        <div className="text-sm font-bold text-rose-600">{cs.financialImpact}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-bold uppercase text-slate-500">Primary Attack Vector</span>
                        <p className="font-semibold text-slate-900 mt-1">{cs.attackVector}</p>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-bold uppercase text-slate-500">Root Cause Vulnerability</span>
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed">{cs.keyVulnerability}</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-900 text-sm mb-3">Attack Sequence (Step-by-Step):</h5>
                      <ol className="space-y-2.5">
                        {cs.stepByStepAttack.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                              {sIdx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <h5 className="font-bold text-emerald-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Defensive Mitigations & Enduring Lessons
                      </h5>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-800">
                        {cs.mitigationAndLessons.map((mit, mIdx) => (
                          <li key={mIdx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{mit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Quick-Check Assessment Question Box */}
          <div className="mt-10 p-6 bg-slate-900 rounded-2xl text-white border border-slate-800">
            <div className="flex items-center gap-2 mb-2 text-blue-400 font-semibold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              Module {currentModule.id} Knowledge Check
            </div>
            <h4 className="text-base sm:text-lg font-bold mb-4">
              {currentModule.quickCheck.question}
            </h4>

            <div className="space-y-2 mb-4">
              {currentModule.quickCheck.options.map((opt, optIdx) => {
                const isSelected = selectedQuickAnswer === optIdx;
                const isCorrect = optIdx === currentModule.quickCheck.correctIndex;

                let optClass = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200';
                if (hasSubmittedQuickCheck) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-rose-950/80 border-rose-500 text-rose-200 line-through';
                  }
                } else if (isSelected) {
                  optClass = 'bg-blue-600/40 border-blue-500 text-white font-medium';
                }

                return (
                  <button
                    key={optIdx}
                    disabled={hasSubmittedQuickCheck}
                    onClick={() => setSelectedQuickAnswer(optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${optClass}`}
                  >
                    <span>{opt}</span>
                    {hasSubmittedQuickCheck && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {hasSubmittedQuickCheck && isSelected && !isCorrect && (
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {hasSubmittedQuickCheck ? (
              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold">
                  {selectedQuickAnswer === currentModule.quickCheck.correctIndex ? (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Correct Answer! Module marked complete.
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> Review the explanation below:
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  {currentModule.quickCheck.explanation}
                </p>

                <div className="pt-2 flex justify-end">
                  {currentModule.id < modules.length ? (
                    <button
                      onClick={() => handleModuleChange(currentModule.id + 1)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <span>Proceed to Module {currentModule.id + 1}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={onNavigateToSimulator}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <span>Go to Spot-the-Phish Simulator</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <button
                disabled={selectedQuickAnswer === null}
                onClick={handleQuickCheckSubmit}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition"
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            disabled={currentModule.id === 1}
            onClick={() => handleModuleChange(currentModule.id - 1)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Module
          </button>

          <div className="text-xs text-slate-500 font-mono">
            Module {currentModule.id} of {modules.length}
          </div>

          <button
            disabled={currentModule.id === modules.length}
            onClick={() => handleModuleChange(currentModule.id + 1)}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next Module
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
