import React, { useState } from 'react';
import { 
  SplitSquareVertical, 
  Lock, 
  Globe, 
  ShieldAlert, 
  ShieldCheck, 
  Calendar, 
  Server, 
  Eye, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface PortalSample {
  id: string;
  name: string;
  real: {
    title: string;
    domain: string;
    urlPath: string;
    sslIssuer: string;
    whoisAge: string;
    formAction: string;
    orgName: string;
    notes: string;
  };
  fake: {
    title: string;
    domain: string;
    urlPath: string;
    sslIssuer: string;
    whoisAge: string;
    formAction: string;
    orgName: string;
    deceptions: string[];
    notes: string;
  };
}

const portals: PortalSample[] = [
  {
    id: 'microsoft',
    name: 'Microsoft 365 Enterprise Sign-In',
    real: {
      title: 'Microsoft 365 Cloud Portal',
      domain: 'login.microsoftonline.com',
      urlPath: '/common/oauth2/v2.0/authorize?client_id=...',
      sslIssuer: 'DigiCert Global Root G2 (Extended Validation Org Cert)',
      whoisAge: 'Registered: May 1991 (Over 34 Years Ago)',
      formAction: 'https://login.microsoftonline.com/kmsi',
      orgName: 'Microsoft Corporation [US]',
      notes: 'Authentic root domain: "microsoftonline.com". Verified multi-tenant identity platform with global SSO.'
    },
    fake: {
      title: 'Phishing Clone (Credential Harvester)',
      domain: 'login.microsoftonline.com.m1crosoft-corp-verify.cc',
      urlPath: '/office365/login.php?session=harvest',
      sslIssuer: 'Let\'s Encrypt Authority X3 (Free Domain-Validated Cert)',
      whoisAge: 'Registered: 3 Days Ago via Anonymous Offshore Registrar',
      formAction: 'hxxps://m1crosoft-corp-verify[.]cc/collect_creds.php',
      orgName: 'Privacy Protect LLC / Redacted for Privacy',
      deceptions: [
        'Subdomain Confusion: Pre-pended "login.microsoftonline.com." to fool users, but the actual root domain on the far right is "m1crosoft-corp-verify.cc"',
        'Typosquatting: Numeral "1" in "m1crosoft"',
        'Valid Padlock Illusion: The site has a 100% valid HTTPS SSL padlock, but it only encrypts transport to the attacker\'s database',
        'Form Action Leak: Submitting credentials posts your password to an external PHP script (/collect_creds.php)'
      ],
      notes: 'Harmless static mockup for security training. No credentials handled or transmitted.'
    }
  },
  {
    id: 'paypal',
    name: 'PayPal Financial Account Sign-In',
    real: {
      title: 'PayPal Official Payment Portal',
      domain: 'www.paypal.com',
      urlPath: '/signin?returnUri=https%3A%2F%2F...',
      sslIssuer: 'DigiCert SHA2 Extended Validation Server CA',
      whoisAge: 'Registered: July 1999 (Over 26 Years Ago)',
      formAction: 'https://www.paypal.com/signin/submit',
      orgName: 'PayPal, Inc. [US]',
      notes: 'Official root domain: "paypal.com". Strict HTTP Strict Transport Security (HSTS) with preloaded certificate pinning.'
    },
    fake: {
      title: 'PayPal Phishing Clone (Financial Harvester)',
      domain: 'www.paypa1-security-auth.top',
      urlPath: '/cgi-bin/webscr?cmd=_login-run',
      sslIssuer: 'Cloudflare Inc ECC CA-3 (Free Automated Cloudflare Cert)',
      whoisAge: 'Registered: Yesterday (1 Day Ago)',
      formAction: 'hxxps://paypa1-security-auth[.]top/dump.php',
      orgName: 'WhoisGuard Protected / Reykjavik, Iceland',
      deceptions: [
        'Combosquatting & Typosquatting: "paypa1" with the number 1 plus added trust words ("security-auth")',
        'Suspicious TLD: Using ".top" instead of ".com"',
        'Brand Assets Stolen: Uses cloned PayPal CSS/SVG logos, but all footer links (Privacy, Legal) are dead dead links (#)',
        'Domain Age: Created 24 hours ago, typical of disposable burner phishing campaigns'
      ],
      notes: 'Harmless static mockup for security training. No credentials handled or transmitted.'
    }
  }
];

export const RealVsFakeInspector: React.FC = () => {
  const [activePortalId, setActivePortalId] = useState<string>('microsoft');
  const [highlightRedFlags, setHighlightRedFlags] = useState<boolean>(true);
  const [activeInspectorView, setActiveInspectorView] = useState<'visual' | 'domain' | 'whois' | 'form'>('visual');

  const currentPortal = portals.find(p => p.id === activePortalId) || portals[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Concept Overview */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 mb-8 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-blue-600 rounded-lg text-white">
                <SplitSquareVertical className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-300">
                Interactive Side-by-Side Analysis
              </span>
            </div>
            <h2 className="text-2xl font-black">Real vs. Fake Login Inspector</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Modern phishing toolkits clone visual templates flawlessly. This laboratory teaches you how to inspect under the hood: root domain anatomy, SSL padlock misconceptions, WHOIS registration age, and backend form actions.
            </p>
          </div>

          {/* Portal Selector */}
          <div className="flex gap-2">
            {portals.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePortalId(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                  activePortalId === p.id
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Inspectors Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Forensic Lens:</span>
            <button
              onClick={() => setActiveInspectorView('visual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeInspectorView === 'visual'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Side-by-Side View
            </button>
            <button
              onClick={() => setActiveInspectorView('domain')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeInspectorView === 'domain'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              URL & Padlock Anatomy
            </button>
            <button
              onClick={() => setActiveInspectorView('whois')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeInspectorView === 'whois'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              WHOIS Domain Age
            </button>
            <button
              onClick={() => setActiveInspectorView('form')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeInspectorView === 'form'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Form Action & POST Target
            </button>
          </div>

          <button
            onClick={() => setHighlightRedFlags(!highlightRedFlags)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              highlightRedFlags
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{highlightRedFlags ? 'Red-Flag Hotspots Active' : 'Toggle Red Flags'}</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN: AUTHENTIC PORTAL */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-emerald-600 font-extrabold text-sm uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5" />
              AUTHENTIC OFFICIAL PORTAL
            </span>
            <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
              VERIFIED LEGITIMATE
            </span>
          </div>

          {/* Browser Window Mockup */}
          <div className="bg-white rounded-2xl border-2 border-emerald-500/80 shadow-md overflow-hidden">
            {/* Browser Address Bar */}
            <div className="bg-slate-100 p-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-300 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-slate-300 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-slate-300 inline-block"></span>
                </div>
                <div className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-mono shadow-inner">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    https://
                  </span>
                  <span className="text-slate-900 font-extrabold bg-emerald-50 px-1 rounded">
                    {currentPortal.real.domain}
                  </span>
                  <span className="text-slate-400 truncate text-[11px]">
                    {currentPortal.real.urlPath}
                  </span>
                </div>
              </div>
            </div>

            {/* Static Harmless Portal Mockup */}
            <div className="p-8 bg-slate-50 min-h-[380px] flex flex-col justify-center items-center">
              <div className="w-full max-w-sm bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-center mb-6">
                  <div className="text-xl font-bold text-slate-900">
                    {currentPortal.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Official Single Sign-On</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Organizational Email or Phone
                    </label>
                    <div className="w-full p-2 bg-slate-100 border border-slate-300 rounded text-xs text-slate-500 font-mono">
                      user@yourcompany.com
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password
                    </label>
                    <div className="w-full p-2 bg-slate-100 border border-slate-300 rounded text-xs text-slate-400 font-mono">
                      ••••••••••••••••
                    </div>
                  </div>

                  <div className="w-full py-2 bg-blue-600 text-white rounded text-center text-xs font-bold opacity-80 cursor-not-allowed">
                    Sign In (Safe Educational Mock)
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
                  © {currentPortal.real.orgName} • Privacy & Terms
                </div>
              </div>
            </div>

            {/* Verification Metadata Footer */}
            <div className="bg-emerald-50/80 p-4 border-t border-emerald-200 text-xs text-emerald-950 space-y-1.5 font-sans">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Root Domain & Certificate Verification:
              </div>
              <p>• <strong>Verified Domain:</strong> {currentPortal.real.domain}</p>
              <p>• <strong>SSL Authority:</strong> {currentPortal.real.sslIssuer}</p>
              <p>• <strong>WHOIS Registration:</strong> {currentPortal.real.whoisAge}</p>
              <p>• <strong>Form Action:</strong> <code className="text-emerald-800">{currentPortal.real.formAction}</code></p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MALICIOUS PHISHING CLONE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-rose-600 font-extrabold text-sm uppercase tracking-wider">
              <ShieldAlert className="w-5 h-5" />
              FRAUDULENT PHISHING CLONE
            </span>
            <span className="text-xs bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full font-semibold">
              HARVESTER SIMULATION
            </span>
          </div>

          {/* Browser Window Mockup with Red Flag Annotations */}
          <div className="bg-white rounded-2xl border-2 border-rose-500 shadow-md overflow-hidden relative">
            {/* Browser Address Bar with Typosquatting Highlight */}
            <div className="bg-slate-100 p-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-300 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-slate-300 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-slate-300 inline-block"></span>
                </div>
                <div className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-mono shadow-inner overflow-hidden">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold shrink-0">
                    <Lock className="w-3.5 h-3.5" />
                    https://
                  </span>
                  <span className="text-slate-400 truncate text-[11px]">
                    login.microsoftonline.com.
                  </span>
                  <span className={`font-black px-1 rounded transition-colors ${
                    highlightRedFlags ? 'bg-rose-600 text-white animate-pulse' : 'text-slate-900'
                  }`}>
                    {currentPortal.fake.domain.split('.').slice(-2).join('.')}
                  </span>
                  <span className="text-slate-400 truncate text-[11px]">
                    {currentPortal.fake.urlPath}
                  </span>
                </div>
              </div>
            </div>

            {/* Static Harmless Portal Mockup with Red Flag Badges */}
            <div className="p-8 bg-slate-50 min-h-[380px] flex flex-col justify-center items-center relative">
              {highlightRedFlags && (
                <div className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
                  <AlertTriangle className="w-3 h-3" />
                  RED FLAGS REVEALED
                </div>
              )}

              <div className="w-full max-w-sm bg-white p-6 rounded-xl border border-rose-300 shadow-sm relative">
                <div className="text-center mb-6">
                  <div className="text-xl font-bold text-slate-900">
                    {currentPortal.name}
                  </div>
                  <div className="text-xs text-rose-600 font-semibold mt-1">
                    [Cloned Interface Mask]
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Organizational Email or Phone
                    </label>
                    <div className="w-full p-2 bg-slate-100 border border-slate-300 rounded text-xs text-slate-500 font-mono">
                      victim@yourcompany.com
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password
                    </label>
                    <div className="w-full p-2 bg-rose-50 border border-rose-300 rounded text-xs text-rose-700 font-mono">
                      [Captures Plaintext Credentials]
                    </div>
                  </div>

                  <div className="w-full py-2 bg-blue-600 text-white rounded text-center text-xs font-bold opacity-80 cursor-not-allowed">
                    Sign In (Safe Educational Mock)
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
                  © 2026 Corporation • [Broken Legal Links]
                </div>
              </div>
            </div>

            {/* Forensic Deceptions Callout */}
            <div className="bg-rose-50/90 p-4 border-t border-rose-200 text-xs text-rose-950 space-y-2 font-sans">
              <div className="font-bold flex items-center gap-1.5 text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Forensic Deceptions Identified:
              </div>
              <ul className="space-y-1.5">
                {currentPortal.fake.deceptions.map((d, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-black">✗</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-rose-200/60 font-mono text-[11px] text-rose-800">
                POST Target: <span className="bg-rose-100 px-1 py-0.5 rounded">{currentPortal.fake.formAction}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forensic Deep Dive Detail Drawer based on active view */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          Forensic Breakdown: What the Browser Doesn't Tell You
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Globe className="w-4 h-4 text-blue-600" />
              1. Reading URLs Right-To-Left
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Attackers insert trusted company names as subdomains (e.g. <code>login.microsoftonline.com.attacker.cc</code>). To find the true owner, find the top-level domain (.com, .cc, .top) and read the single word immediately before it.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Lock className="w-4 h-4 text-blue-600" />
              2. The Padlock Myth
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Never equate HTTPS with honesty. Free automated certificate authorities (Let's Encrypt) provide SSL certificates to any registered domain in under 3 seconds. The lock encrypts the session, but the recipient is still a criminal.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Calendar className="w-4 h-4 text-blue-600" />
              3. WHOIS Domain Age
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Legitimate enterprise domains were registered in the 1990s or 2000s. Phishing websites have an average operational lifespan of less than 48 hours. Any "bank" domain created 3 days ago is hostile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
