import { SlideData } from '../types';

export const slidesData: SlideData[] = [
  {
    id: 1,
    title: 'Phishing Awareness & Defense Program',
    subtitle: 'Recognizing, Preventing, and Mitigating Modern Social Engineering Attacks',
    category: 'Introduction',
    visualType: 'hero',
    bullets: [
      'PHISHING AWARENESS PROGRAM: Comprehensive Cybersecurity Training & Presentation Deck',
      'Target Audience: Enterprise Employees, Technical Teams, and End Users',
      'Core Goal: Shift from passive vulnerability to proactive human threat detection'
    ],
    speakerNotes: 'Welcome everyone to our Phishing Awareness & Defense presentation. Over the next 5 minutes, we will unpack how modern cybercriminals target the human element, review red-flag indicators across emails and websites, analyze landmark historical breaches, and establish actionable incident response habits.'
  },
  {
    id: 2,
    title: 'The Phishing Threat Landscape',
    subtitle: 'Why Phishing Remains the #1 Cyber Breach Vector',
    category: 'Context & Metrics',
    visualType: 'stats',
    bullets: [
      '74% of enterprise breaches involve the human element (Verizon DBIR)',
      '3.4 Billion malicious phishing emails are dispatched globally every single day',
      '$10.3 Billion in annual losses attributed to social engineering & BEC (FBI IC3)',
      'Attackers exploit cognitive speed: 85% of malicious links clicked within 10 minutes of delivery'
    ],
    speakerNotes: 'Notice the staggering metric from Verizon: three out of four breaches involve human interaction. Firewalls and endpoint tools cannot protect us if an authorized user hands over their credentials or approves an unauthorized MFA prompt. Security begins with human awareness.'
  },
  {
    id: 3,
    title: 'Taxonomy: The 7 Faces of Phishing',
    subtitle: 'From Bulk Blasts to Targeted Quishing Attacks',
    category: 'Attack Vectors',
    visualType: 'grid',
    bullets: [
      '1. Bulk Email: Mass-market lures (fake package deliveries, streaming service billing)',
      '2. Spear Phishing: Personalized lures utilizing LinkedIn and corporate org charts',
      '3. Whaling: High-stakes BEC directed at C-suite executives and financial controllers',
      '4. Smishing: SMS alerts claiming frozen credit cards or urgent shipping fees',
      '5. Vishing: Phone calls impersonating IT helpdesk technicians',
      '6. Quishing: Malicious QR codes pasted on menus, parking meters, or email attachments',
      '7. Clone Phishing: Replicating legitimate prior emails with replaced malicious links'
    ],
    speakerNotes: 'Phishing is no longer just generic spam. Today, attacks span SMS, voice calls, QR codes, and cloned messages. In particular, quishing and vishing bypass traditional corporate email security filters because they operate outside the corporate email gateway.'
  },
  {
    id: 4,
    title: 'The Anatomy of a Phishing Email',
    subtitle: '6 Critical Forensic Red Flags to Inspect',
    category: 'Email Detection',
    visualType: 'checklist',
    bullets: [
      '1. Sender Address Mismatch: Display name says "Microsoft", but actual address is from a rogue domain',
      '2. Artificial Urgency: "Account terminates in 2 hours" triggers panic to disable rational thought',
      '3. Generic Salutation: "Dear Valued Customer" indicates bulk distribution without database matching',
      '4. Grammatical & Stylistic Quirks: Inconsistent corporate tone or awkward phrasing',
      '5. Risky File Attachments: Unexpected .html, .iso, .zip, or macro-enabled documents',
      '6. Link Mismatches: Visible text claims legitimate URL, but hover reveals hostile server destination'
    ],
    speakerNotes: 'When evaluating any suspicious email, train your eyes to run this six-point inspection checklist. The most reliable indicator is always the hover-to-reveal technique—never trust the text on screen without inspecting where the link actually points.'
  },
  {
    id: 5,
    title: 'Fake Logins & Fraudulent Websites',
    subtitle: 'Typosquatting & Deceptive Domain Architecture',
    category: 'Web Defense',
    visualType: 'comparison',
    bullets: [
      'Typosquatting: Substituting characters (e.g., "paypa1.com", "m1crosoft.com", "g00gle.com")',
      'Combosquatting: Appending trust words (e.g., "paypal-security-update.com")',
      'Subdomain Tricks: "login.microsoft.com.attacker-controlled.net" — the root domain is on the far right!',
      'Browser-in-the-Browser (BitB): Simulated HTML popups masquerading as native OAuth login windows'
    ],
    speakerNotes: 'Attackers create convincing visual replicas of legitimate login portals. Teach yourself to read URLs from right to left to identify the actual root domain before the first single slash.'
  },
  {
    id: 6,
    title: 'Debunking the "HTTPS Padlock" Myth',
    subtitle: 'Why Encryption Does NOT Guarantee Identity',
    category: 'Web Defense',
    visualType: 'comparison',
    bullets: [
      'The Padlock Icon: Confirms only that communication in transit is encrypted with SSL/TLS',
      'Free Automated Certificates: Let\'s Encrypt and Cloudflare issue valid SSL certs to anyone in seconds',
      '83%+ of Active Phishing Sites now proudly display the browser padlock icon',
      'Key Takeaway: The padlock simply means your stolen password is encrypted as it travels to the cybercriminal!'
    ],
    speakerNotes: 'This is the number one misconception among everyday users. An HTTPS padlock does not mean the website is trustworthy. It merely means an eavesdropper on public Wi-Fi cannot see the data. The attacker who owns the site still receives everything in plain text.'
  },
  {
    id: 7,
    title: 'The Psychology of Social Engineering',
    subtitle: '9 Levers Manipulated by Cyber Adversaries',
    category: 'Human Psychology',
    visualType: 'grid',
    bullets: [
      'Authority: Impersonating CEOs, law enforcement, or IT administrators',
      'Urgency: Artificial time clocks to prevent rational deliberation',
      'Fear & Intimidation: Threats of lawsuits, account cancellation, or disciplinary review',
      'Curiosity: Leaked bonus lists, confidential merger files, or juicy executive rumors',
      'Reciprocity: Offering free perks or assistance before asking for sensitive favors',
      'Pretexting: Constructing an elaborate fictional backstory to elicit cooperation',
      'Baiting: Leaving infected USB drives in public corporate spaces',
      'Tailgating: Slipping through badge-access doors behind authorized personnel',
      'Impersonation: Mimicking trusted vendors, clients, or internal team members'
    ],
    speakerNotes: 'Adversaries do not hack code; they hack cognitive biases. When you feel a sudden surge of fear, urgent panic, or intense curiosity upon opening a message, recognize that emotion as a primary indicator of social engineering manipulation.'
  },
  {
    id: 8,
    title: 'Case Study 1: Twitter (X) 2020 Admin Breach',
    subtitle: 'Vishing & IT Helpdesk Impersonation',
    category: 'Case Studies',
    visualType: 'timeline',
    bullets: [
      'Vector: Phone vishing targeting remote Twitter employees during lockdown',
      'Pretext: Attackers posed as internal IT technicians troubleshooting remote VPN configurations',
      'Compromise: Harvested VPN credentials and intercepted one-time MFA codes in real-time',
      'Impact: Hijacked 130 high-profile accounts (Elon Musk, Barack Obama, Apple, Joe Biden) for Bitcoin scam',
      'Lesson: Enforce FIDO2 hardware keys and strict internal verification procedures for admin tool resets'
    ],
    speakerNotes: 'In 2020, teenagers compromised Twitter by calling staff at home. This incident demonstrated that traditional MFA codes can be intercepted via real-time proxying, leading to the global push for phishing-resistant FIDO2 hardware keys.'
  },
  {
    id: 9,
    title: 'Case Study 2: Google & Facebook $121M Invoice BEC',
    subtitle: 'The Ultimate Business Email Compromise Scheme',
    category: 'Case Studies',
    visualType: 'timeline',
    bullets: [
      'Vector: Impersonation of legitimate Taiwanese hardware manufacturer Quanta Computer',
      'Pretext: Forged corporate invoices, contracts, and fraudulent offshore bank wiring details',
      'Compromise: Sent periodic multimillion-dollar invoices over two full years',
      'Impact: Extracted $99M from Facebook and $23M from Google before detection',
      'Lesson: Mandatory out-of-band callback verification before changing supplier bank routing details'
    ],
    speakerNotes: 'Even tech giants with top-tier cybersecurity budgets lost over $120 million to simple invoice deception. The mitigation was operational: no wire routing changes should ever be approved without direct telephone verification using an established directory contact.'
  },
  {
    id: 10,
    title: 'Case Study 3 & 4: RSA SecurID & Colonial Pipeline',
    subtitle: 'Macro Zero-Days & Orphan Accounts',
    category: 'Case Studies',
    visualType: 'comparison',
    bullets: [
      'RSA SecurID (2011): Spear phish with "2011 Recruitment plan.xls" spreadsheet compromised 2FA token seeds worldwide',
      'Takeaway: Never retrieve or open quarantined attachments from junk folders; disable Office macros by default',
      'Colonial Pipeline (2021): Single compromised legacy VPN password on the dark web shut down US East Coast fuel supply',
      'Takeaway: Universal MFA enforcement on 100% of remote endpoints with zero exceptions and decommission dormant accounts'
    ],
    speakerNotes: 'RSA proved that curiosity bait in HR recruitment can breach defense suppliers. Colonial Pipeline proved that a single forgotten legacy VPN account without MFA can cripple critical national infrastructure.'
  },
  {
    id: 11,
    title: 'Multi-Factor Defense & Password Managers',
    subtitle: 'Technology That Neutralizes Human Error',
    category: 'Protection Tips',
    visualType: 'grid',
    bullets: [
      'Phishing-Resistant MFA: Hardware security keys (YubiKey / WebAuthn) bind to domains cryptographically',
      'Password Managers: Will NEVER auto-fill credentials on lookalike domains (e.g. m1crosoft.com)',
      'Out-of-Band Verification: Always confirm payment, payroll, or credential changes over independent channels',
      'Patch Hygiene: Keep web browsers, email clients, and endpoint operating systems updated automatically'
    ],
    speakerNotes: 'By pairing human awareness with technological guardrails—specifically password managers and FIDO2 keys—we create defense-in-depth where a slip in attention does not lead to total compromise.'
  },
  {
    id: 12,
    title: 'Incident Response: What to Do After Clicking',
    subtitle: 'Minutes Matter: 5-Step Rapid Response Protocol',
    category: 'Incident Response',
    visualType: 'checklist',
    bullets: [
      '1. Disconnect Network: Unplug Ethernet / toggle airplane mode immediately if a malicious file was opened',
      '2. Change Credentials: Reset passwords immediately from a separate, uncompromised device',
      '3. Invalidate Sessions: Revoke active sessions and review registered MFA authenticators',
      '4. Report Promptly: Notify IT Security / SOC with raw headers—do not conceal mistakes!',
      '5. Monitor Accounts: Review login audit logs and financial statements for suspicious alerts'
    ],
    speakerNotes: 'Please remember: everyone can make a mistake. What separates a minor contained incident from a catastrophic multi-million-dollar breach is how fast you report it to the security team. Report immediately within 5 minutes.'
  },
  {
    id: 13,
    title: 'Safe Investigation Tools & Precautions',
    subtitle: 'Analyzing Threat Indicators Responsibly',
    category: 'Tools & Ethics',
    visualType: 'checklist',
    bullets: [
      'VirusTotal: Safely inspect URLs and file hashes without visiting or downloading hostile files',
      'URLScan.io: Automated cloud browser sandbox generates screenshot and DOM tree analysis safely',
      'WHOIS Lookup: Check domain age—malicious phishing domains are typically registered within days',
      'MXToolbox: Analyze email authentication headers (SPF, DKIM, DMARC alignment)',
      'Defanging Protocol: Always neutralize malicious links (hxxps://example[.]com) before sharing'
    ],
    speakerNotes: 'Security professionals always analyze suspicious assets inside isolated sandboxes. When documenting or sharing indicators, always defang URLs so peers cannot accidentally click them.'
  },
  {
    id: 14,
    title: 'Program Summary & Call to Action',
    subtitle: 'Building a Resilient Human Firewall',
    category: 'Conclusion',
    visualType: 'hero',
    bullets: [
      '1. Pause Before You Click: Take 10 seconds to inspect the sender, domain, and urgency level',
      '2. Verify Out-of-Band: Confirm unexpected requests via an independent communication channel',
      '3. Deploy Strong MFA & Password Managers: Cryptographic defense prevents credential theft',
      '4. Report Every Incident: Timely communication protects your entire organization'
    ],
    speakerNotes: 'Thank you for your commitment to cybersecurity defense. Together, by exercising thoughtful skepticism and disciplined verification, we transform our organization into an impenetrable human firewall. Let us now explore the interactive modules, spot-the-phish simulator, and certification quiz.'
  }
];
