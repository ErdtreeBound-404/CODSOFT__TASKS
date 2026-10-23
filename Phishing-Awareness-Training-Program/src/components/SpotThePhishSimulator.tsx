import React, { useState } from 'react';
import { PhishScenario } from '../types';
import { 
  Crosshair, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Eye, 
  ExternalLink, 
  FileText, 
  RefreshCw, 
  ArrowRight, 
  Mail, 
  Smartphone, 
  QrCode,
  Sparkles,
  Info
} from 'lucide-react';

interface SpotThePhishSimulatorProps {
  scenarios: PhishScenario[];
  onFinishSimulator: (score: number) => void;
  onNavigateToRealVsFake: () => void;
}

export const SpotThePhishSimulator: React.FC<SpotThePhishSimulatorProps> = ({
  scenarios,
  onFinishSimulator,
  onNavigateToRealVsFake
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userDecisions, setUserDecisions] = useState<Record<string, {
    guessedPhish: boolean;
    isCorrect: boolean;
  }>>({});
  const [showHeaders, setShowHeaders] = useState<boolean>(false);
  const [simulatedHover, setSimulatedHover] = useState<boolean>(false);

  const currentScenario = scenarios[currentIndex];
  const totalScenarios = scenarios.length;
  const currentDecision = userDecisions[currentScenario.id];

  const handleDecision = (votePhish: boolean) => {
    if (currentDecision) return; // already voted
    const isCorrect = votePhish === currentScenario.isPhish;
    const nextDecisions = {
      ...userDecisions,
      [currentScenario.id]: {
        guessedPhish: votePhish,
        isCorrect
      }
    };
    setUserDecisions(nextDecisions);

    const completedCount = Object.keys(nextDecisions).length;
    if (completedCount === totalScenarios) {
      const totalScore = Object.values(nextDecisions).filter(d => d.isCorrect).length;
      onFinishSimulator(totalScore);
    }
  };

  const answeredCount = Object.keys(userDecisions).length;
  const correctCount = Object.values(userDecisions).filter(d => d.isCorrect).length;

  const handleNext = () => {
    if (currentIndex < totalScenarios - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowHeaders(false);
      setSimulatedHover(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowHeaders(false);
      setSimulatedHover(false);
    }
  };

  const handleReset = () => {
    setUserDecisions({});
    setCurrentIndex(0);
    setShowHeaders(false);
    setSimulatedHover(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Stats */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-6 mb-8 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-blue-600 rounded-lg text-white">
                <Crosshair className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-300">
                Interactive Forensic Lab
              </span>
            </div>
            <h2 className="text-2xl font-black">Spot-the-Phish Simulator</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Inspect 8 realistic communication samples. Analyze headers, test hover hyperlinks, examine urgency cues, and decide: <span className="text-rose-400 font-bold">Phish</span> or <span className="text-emerald-400 font-bold">Legitimate</span>?
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
            <div className="text-center px-2">
              <div className="text-xs text-slate-400">Score</div>
              <div className="text-xl font-black text-white">
                {correctCount} / {answeredCount}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-center px-2">
              <div className="text-xs text-slate-400">Progress</div>
              <div className="text-xl font-black text-blue-400">
                {currentIndex + 1} / {totalScenarios}
              </div>
            </div>
            <button
              onClick={handleReset}
              title="Restart Simulator"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-1">
          {scenarios.map((s, idx) => {
            const dec = userDecisions[s.id];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowHeaders(false);
                  setSimulatedHover(false);
                }}
                className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-xs font-semibold text-center border transition-all ${
                  isCurrent
                    ? 'bg-blue-600 border-blue-400 text-white ring-2 ring-blue-400/50'
                    : dec
                    ? dec.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                      : 'bg-rose-950/60 border-rose-500/60 text-rose-300'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                #{idx + 1} {dec ? (dec.isCorrect ? '✓' : '✗') : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: The Interactive Communication Sample */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Top Toolbar */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                {currentScenario.channel === 'email' && <Mail className="w-4 h-4 text-blue-600" />}
                {currentScenario.channel === 'sms' && <Smartphone className="w-4 h-4 text-emerald-600" />}
                {currentScenario.channel === 'qr' && <QrCode className="w-4 h-4 text-amber-600" />}
                <span className="uppercase tracking-wider">Channel: {currentScenario.channel}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">Difficulty: {currentScenario.difficulty}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHeaders(!showHeaders)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1 ${
                    showHeaders
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showHeaders ? 'Hide Full Headers' : 'Inspect Raw Headers'}</span>
                </button>
              </div>
            </div>

            {/* Email Metadata */}
            <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 text-xs sm:text-sm space-y-1.5 font-sans">
              <div className="flex items-baseline gap-2">
                <span className="text-slate-500 font-semibold w-16">From:</span>
                <span className="font-bold text-slate-900">{currentScenario.senderDisplay}</span>
                <span className="text-slate-500 font-mono text-xs hidden sm:inline">&lt;{currentScenario.senderAddress}&gt;</span>
              </div>

              {currentScenario.replyTo && (
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-500 font-semibold w-16">Reply-To:</span>
                  <span className="font-mono text-rose-700 text-xs">{currentScenario.replyTo}</span>
                </div>
              )}

              {currentScenario.subject && (
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-500 font-semibold w-16">Subject:</span>
                  <span className="font-semibold text-slate-900">{currentScenario.subject}</span>
                </div>
              )}

              <div className="flex items-baseline gap-2 text-xs text-slate-500">
                <span className="w-16 font-semibold">Date:</span>
                <span>{currentScenario.date}</span>
              </div>

              {/* Collapsible Raw Headers */}
              {showHeaders && (
                <div className="mt-3 p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] leading-relaxed border border-slate-800">
                  <div className="text-blue-400 font-bold mb-1">// FORENSIC EMAIL HEADERS</div>
                  <div>Received: from mx-relay.security-filter.local by inbound.enterprise.com</div>
                  <div>Authentication-Results: spf={currentScenario.isPhish ? 'softfail (domain mismatch)' : 'pass'} dkim={currentScenario.isPhish ? 'fail' : 'pass'} dmarc={currentScenario.isPhish ? 'fail' : 'pass'}</div>
                  <div>Return-Path: {currentScenario.replyTo || currentScenario.senderAddress}</div>
                  <div>X-Mailer-Origin: 194.26.29.14 (Allocated to Anonymous Hosting Provider)</div>
                </div>
              )}
            </div>

            {/* Simulated Content Body */}
            <div className="p-6 text-slate-800">
              <div 
                dangerouslySetInnerHTML={{ __html: currentScenario.content }} 
                className="max-w-none"
              />

              {/* Optional Attachment Preview */}
              {currentScenario.hasAttachment && (
                <div className="mt-6 p-3.5 bg-slate-50 border border-slate-300 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-rose-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 font-mono">
                        {currentScenario.attachmentName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {currentScenario.attachmentType} • Double-click blocked in simulation
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-rose-100 text-rose-800 rounded">
                    Suspicious Attachment
                  </span>
                </div>
              )}
            </div>

            {/* Hover-To-Reveal Interactive Link Inspector Tool */}
            {currentScenario.hoverUrl && (
              <div className="bg-slate-900 border-t border-slate-800 p-4 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <ExternalLink className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold">Hover-to-Reveal Link Simulator:</span>
                  </div>
                  <button
                    onClick={() => setSimulatedHover(!simulatedHover)}
                    className="text-xs font-mono px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition"
                  >
                    {simulatedHover ? 'Clear Hover Target' : 'Simulate Mouse Hover'}
                  </button>
                </div>

                {simulatedHover ? (
                  <div className="mt-2.5 p-2.5 bg-slate-950 rounded border border-blue-500/50 font-mono text-xs text-blue-300 break-all flex items-center gap-2">
                    <span className="text-slate-500 font-bold shrink-0">True Destination:</span>
                    <span className="text-amber-300 font-semibold">{currentScenario.hoverUrl}</span>
                  </div>
                ) : (
                  <p className="text-slate-400 text-[11px] mt-1.5">
                    Click "Simulate Mouse Hover" above to inspect where the embedded links in this message actually lead.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Assessment & Forensic Results */}
        <div className="space-y-6">
          {/* Voting Action Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">
              Your Verdict
            </h3>
            <p className="text-base font-bold text-slate-900 mb-4">
              Is this message authentic or malicious?
            </p>

            {!currentDecision ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleDecision(true)}
                  className="py-4 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-300 hover:border-rose-500 text-rose-800 font-black text-sm transition flex flex-col items-center gap-2 group shadow-sm"
                >
                  <ShieldAlert className="w-6 h-6 text-rose-600 group-hover:scale-110 transition-transform" />
                  <span>🚨 IT'S A PHISH</span>
                </button>

                <button
                  onClick={() => handleDecision(false)}
                  className="py-4 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 hover:border-emerald-500 text-emerald-800 font-black text-sm transition flex flex-col items-center gap-2 group shadow-sm"
                >
                  <ShieldCheck className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>✅ LEGITIMATE</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                  currentDecision.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}>
                  {currentDecision.isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-black text-base">
                      {currentDecision.isCorrect ? 'Excellent Spot! You are Correct.' : 'Incorrect Diagnosis!'}
                    </h4>
                    <p className="text-xs">
                      This communication is officially classified as: <strong>{currentScenario.isPhish ? 'A PHISHING ATTACK' : 'LEGITIMATE / SAFE'}</strong>
                    </p>
                  </div>
                </div>

                {/* Red Flags / Legit Indicators */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                    {currentScenario.isPhish ? 'Identified Threat Indicators:' : 'Legitimate Security Indicators:'}
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentScenario.isPhish ? (
                      currentScenario.redFlags.map((rf, rfIdx) => (
                        <li key={rfIdx} className="flex items-start gap-2">
                          <span className="text-rose-600 font-bold shrink-0">⚠</span>
                          <span>{rf}</span>
                        </li>
                      ))
                    ) : (
                      currentScenario.legitimateIndicators?.map((li, liIdx) => (
                        <li key={liIdx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold shrink-0">✓</span>
                          <span>{li}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                {/* Detailed Forensics */}
                <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 text-xs text-slate-800 space-y-1.5">
                  <span className="font-bold text-blue-900 uppercase tracking-wider text-[11px] flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" /> Security Analysis & Forensics
                  </span>
                  <p className="leading-relaxed">{currentScenario.detailedForensics}</p>
                </div>

                {/* Practical Prevention Tip */}
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-xs text-slate-800 space-y-1">
                  <span className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Practical Takeaway
                  </span>
                  <p className="leading-relaxed">{currentScenario.preventionTip}</p>
                </div>

                {/* Navigation to next */}
                <div className="flex gap-2 pt-2">
                  {currentIndex < totalScenarios - 1 ? (
                    <button
                      onClick={handleNext}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Proceed to Scenario #{currentIndex + 2}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={onNavigateToRealVsFake}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Completed! Try Real vs Fake Inspector</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
