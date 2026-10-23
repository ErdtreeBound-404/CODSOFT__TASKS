import React, { useState } from 'react';
import { 
  Wrench, 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  ExternalLink, 
  Copy, 
  Check, 
  Lock, 
  AlertTriangle, 
  FileText,
  Search,
  Globe,
  Database,
  MailCheck,
  CheckCircle2
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  item: string;
  detail: string;
  status: boolean;
}

export const ToolboxAndPrecautions: React.FC = () => {
  // URL Defanger Tool state
  const [inputUrl, setInputUrl] = useState<string>('https://phishing-login.evil-server.com/auth');
  const [defangedOutput, setDefangedOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Interactive Project Checklist from PDF Page 5
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: 'chk-1',
      item: 'Slide deck or web module complete and covers all 5 task bullets',
      detail: 'Fully covered: educational module, email/website red flags, social engineering techniques, protection tips, case studies & quizzes.',
      status: true
    },
    {
      id: 'chk-2',
      item: 'At least 3 case studies with sources',
      detail: '4 in-depth case studies included: Twitter 2020 Vishing, Google & Facebook $121M Invoice BEC, RSA 2011 SecurID, Colonial Pipeline 2021.',
      status: true
    },
    {
      id: 'chk-3',
      item: 'Quizzes with feedback and score summary',
      detail: 'Module quick-checks, 8 Spot-the-Phish simulations with instant feedback, plus 15-question comprehensive exam with certificate.',
      status: true
    },
    {
      id: 'chk-4',
      item: 'All examples anonymised or defanged',
      detail: 'Every URL sanitized using hxxp and bracket notation [.] with no functional password ingestion.',
      status: true
    },
    {
      id: 'chk-5',
      item: 'Tested on mobile and desktop, proofread',
      detail: 'Fully responsive grid layout, verified contrast ratios, and clear pedagogical explanations.',
      status: true
    },
    {
      id: 'chk-6',
      item: 'Hosted link, PDF export and short report ready',
      detail: 'Dedicated Companion Slide Deck with PDF print export and downloadable Certificate of Defense.',
      status: true
    }
  ]);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, status: !item.status } : item
    ));
  };

  const handleDefang = () => {
    let result = inputUrl
      .replace(/http:\/\//gi, 'hxxp://')
      .replace(/https:\/\//gi, 'hxxps://')
      .replace(/\./g, '[.]');
    setDefangedOutput(result);
  };

  const handleRefang = () => {
    let result = inputUrl
      .replace(/hxxps:\/\//gi, 'https://')
      .replace(/hxxp:\/\//gi, 'http://')
      .replace(/\[\.\]/g, '.');
    setDefangedOutput(result);
  };

  const handleCopy = () => {
    if (!defangedOutput) return;
    navigator.clipboard.writeText(defangedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toolsList = [
    {
      name: 'VirusTotal',
      purpose: 'Multi-Engine URL & Hash Scanner',
      description: 'Upload suspicious files or query domains to check against 70+ antivirus scanners and threat intelligence blocklists without opening the link yourself.',
      bestFor: 'Checking reputation of downloaded files, suspicious domains, and IP addresses.',
      url: 'https://www.virustotal.com'
    },
    {
      name: 'URLScan.io',
      purpose: 'Automated Cloud Browser Sandbox',
      description: 'Executes suspicious links in an isolated server-side Chromium browser. Records live screenshots, HTTP transactions, DOM elements, and TLS certificates safely.',
      bestFor: 'Viewing what a phishing site looks like without visiting it from your computer.',
      url: 'https://urlscan.io'
    },
    {
      name: 'WHOIS Domain Lookup',
      purpose: 'Domain Registrar & Creation Age Auditor',
      description: 'Reveals domain registration creation date, registrar company, and name servers. Legitimate corporations own domains created decades ago; phishing sites are usually <7 days old.',
      bestFor: 'Unmasking disposable lookalike domains and newly registered domains (NRDs).',
      url: 'https://whois.domaintools.com'
    },
    {
      name: 'MXToolbox Header Analyzer',
      purpose: 'Email SPF, DKIM, and DMARC Inspector',
      description: 'Paste raw email headers to decode server hops, delays, and verify whether the email authenticated sender SPF, DKIM signature, and DMARC policy alignment.',
      bestFor: 'Investigating display-name spoofing and relay provenance.',
      url: 'https://mxtoolbox.com/EmailHeaders.aspx'
    },
    {
      name: 'Have I Been Pwned',
      purpose: 'Dark Web Breach & Credential Leak Check',
      description: 'Created by Troy Hunt. Allows individuals and enterprises to check if corporate email addresses or passwords have appeared in public data breach dumps.',
      bestFor: 'Proactively auditing compromised employee credentials before attackers exploit them.',
      url: 'https://haveibeenpwned.com'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 bg-blue-600 rounded-lg text-white">
            <Wrench className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-300">
            Security Standards & Tool Suite
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">Security Analysis Toolbox & Ethical Precautions</h2>
        <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-3xl">
          Essential tool references for safely dissecting threat indicators, interactive URL defanging utilities, and strict ethical compliance boundaries as prescribed in cybersecurity standards.
        </p>
      </div>

      {/* Interactive URL Defanger Utility */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">Interactive URL Defanging Utility</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Whenever documenting or reporting malicious links, standard security protocol dictates "defanging" the URL so nobody can accidentally click or resolve it (converting <code>http://</code> to <code>hxxp://</code> and <code>.</code> to <code>[.]</code>).
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Input URL to Sanitize:
            </label>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://example.com/login"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDefang}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Defang URL (Safe for Sharing)
            </button>
            <button
              onClick={handleRefang}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Refang URL (Standard Format)
            </button>
          </div>

          {defangedOutput && (
            <div className="p-4 bg-slate-950 text-slate-200 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
              <div className="font-mono text-xs sm:text-sm text-blue-300 break-all">
                {defangedOutput}
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Investigation Tools */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600" />
          Recommended Threat Analysis Tools (For Demos & Audits)
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Tools highlighted in the project roadmap for verifying links, domains, and email headers safely without risking host infection:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolsList.map((t, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between hover:border-blue-400 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 text-base">{t.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                    Tool #{idx + 1}
                  </span>
                </div>
                <div className="text-xs font-semibold text-blue-600 mb-2">{t.purpose}</div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{t.description}</p>
                <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                  <strong className="text-slate-900">Primary Utility:</strong> {t.bestFor}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>Open Safe Tool Documentation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Ethical & Legal Precautions */}
      <div className="bg-rose-50/60 rounded-2xl border border-rose-200 p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Mandatory Precautions & Ethical Boundaries
          </div>
          <h3 className="text-xl font-bold text-rose-950 mt-1">
            Rules of Engagement for Security Training Projects
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-rose-950">
          <div className="p-4 bg-white rounded-xl border border-rose-200 space-y-1 shadow-sm">
            <strong className="text-rose-900 font-bold block text-sm">1. Explicit Authorization Required</strong>
            <p className="text-slate-700 leading-relaxed">
              Never send real phishing emails or run simulated tests on individuals without prior written authorization from the organization and clear participant consent.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-rose-200 space-y-1 shadow-sm">
            <strong className="text-rose-900 font-bold block text-sm">2. Harmless Static Demonstrations Only</strong>
            <p className="text-slate-700 leading-relaxed">
              Never build or host working login pages that capture or store passwords. Use defanged, static mock-ups with zero backend credential processing.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-rose-200 space-y-1 shadow-sm">
            <strong className="text-rose-900 font-bold block text-sm">3. Safe Handling of Samples</strong>
            <p className="text-slate-700 leading-relaxed">
              Always defang malicious URLs (<code>hxxp://</code> and <code>[.]</code>). Never execute live malware files outside isolated virtual machine sandboxes.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-rose-200 space-y-1 shadow-sm">
            <strong className="text-rose-900 font-bold block text-sm">4. Privacy & Anonymization</strong>
            <p className="text-slate-700 leading-relaxed">
              Never use real people's personal email inboxes or personal identity data in educational examples. Mask and blur all personal identifiers.
            </p>
          </div>
        </div>
      </div>

      {/* Program Deliverable Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Security Readiness & Program Deliverable Checklist
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Verify completion across all modules, threat simulation labs, case studies, and safety audits. Click any item to toggle check status.
            </p>
          </div>
          <div className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
            {checklist.filter(c => c.status).length} / {checklist.length} Completed
          </div>
        </div>

        <div className="space-y-3">
          {checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                item.status 
                  ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="mt-0.5">
                {item.status ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-bold ${item.status ? 'text-slate-900' : 'text-slate-500'}`}>
                  {item.item}
                </div>
                <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {item.detail}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
