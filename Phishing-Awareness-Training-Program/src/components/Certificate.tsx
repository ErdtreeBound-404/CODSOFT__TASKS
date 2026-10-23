import React, { useEffect } from 'react';
import { Award, ShieldCheck, Printer, CheckCircle2, Download, Calendar, User } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateProps {
  recipientName: string;
  setRecipientName: (name: string) => void;
  organization: string;
  setOrganization: (org: string) => void;
  score: number;
  totalQuestions: number;
  completionDate: string;
  onRetakeQuiz: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({
  recipientName,
  setRecipientName,
  organization,
  setOrganization,
  score,
  totalQuestions,
  completionDate,
  onRetakeQuiz
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const certificateId = `CERT-DEFENSE-${Math.abs(hashCode(recipientName + completionDate)).toString(16).toUpperCase()}-2026`;

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if unavailable
    }
  }, []);

  function hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Configuration & Action Bar (Hidden in Print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Your Full Name for Certificate:
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter Full Name"
                className="w-full px-3 py-2 pl-9 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Organization / Department:
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Enterprise Security / Engineering"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={onRetakeQuiz}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
          >
            Retake Assessment
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Certificate Design */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-blue-50 p-6 sm:p-12 rounded-3xl border-8 border-double border-slate-800 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
        {/* Ornamental Corner Filigrees */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-blue-900 pointer-events-none"></div>
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-blue-900 pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-blue-900 pointer-events-none"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-blue-900 pointer-events-none"></div>

        {/* Security Badge Icon */}
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-blue-900 to-indigo-800 rounded-2xl flex items-center justify-center text-amber-300 shadow-lg border-2 border-amber-400">
          <ShieldCheck className="w-12 h-12" />
        </div>

        <div className="uppercase tracking-[0.25em] text-xs font-extrabold text-blue-950 mb-1">
          Cybersecurity Defense & Awareness Credential
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2 font-serif">
          Certificate of Completion
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 italic max-w-xl mx-auto mb-6">
          This certifies that the recipient has demonstrated verified competency in recognizing social engineering vectors, email header discrepancies, typosquatted portals, and enterprise incident response protocols.
        </p>

        <div className="my-6">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
            Proudly Conferred To
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-blue-950 border-b-2 border-slate-800 inline-block px-8 pb-2 min-w-[280px]">
            {recipientName || 'Security Candidate'}
          </div>
          <div className="text-sm font-semibold text-slate-700 mt-2">
            {organization || 'Global Enterprise Information Security'}
          </div>
        </div>

        {/* Score & Evaluation Record */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto my-8 p-4 bg-white/80 rounded-xl border border-slate-300 text-center shadow-sm">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Score Achieved</div>
            <div className="text-lg font-black text-blue-900">{score} / {totalQuestions}</div>
          </div>
          <div className="border-x border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-500">Proficiency</div>
            <div className="text-lg font-black text-emerald-600">{percentage}%</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">Status</div>
            <div className="text-lg font-black text-blue-900">VERIFIED</div>
          </div>
        </div>

        {/* Signatures & Verification ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl mx-auto pt-4 border-t border-slate-300 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-900 font-black text-xs">
              SEC
            </div>
            <div>
              <div className="font-serif italic font-bold text-slate-800 text-sm">Security Awareness Directorate</div>
              <div className="text-[11px] text-slate-500">Enterprise Cybersecurity Awareness Program</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[11px] font-mono font-bold text-slate-700">
              ID: {certificateId}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-end gap-1 mt-0.5">
              <Calendar className="w-3 h-3" />
              <span>Conferred: {completionDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
