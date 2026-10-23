import { CaseStudy } from '../types';

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'case-twitter-2020',
    title: 'The Twitter (X) Internal Admin Panel Breach',
    year: 2020,
    organization: 'Twitter Inc.',
    attackVector: 'Phone Vishing & IT Helpdesk Impersonation',
    financialImpact: '$120,000+ direct Bitcoin scam; severe reputational crisis & FTC investigation',
    overview: 'In July 2020, a group of young cyber adversaries orchestrated a coordinated voice phishing (vishing) campaign against remote Twitter employees working from home during the pandemic, convincing them to enter VPN credentials into a cloned portal and granting attackers direct access to Twitter\'s internal admin tools.',
    stepByStepAttack: [
      'Attackers conducted reconnaissance on LinkedIn to identify Twitter customer support and IT personnel.',
      'Attackers called employees on their personal mobile devices, posing as Twitter IT help desk technicians troubleshooting remote VPN connectivity.',
      'Employees were directed to a convincing look-alike domain (e.g. twitter-helpdesk[.]com) and prompted to submit their corporate VPN credentials.',
      'Attackers intercepted the one-time MFA codes in real-time and successfully logged into Twitter\'s internal network.',
      'Adversaries gained access to internal customer support tools and hijacked 130 verified high-profile accounts, including Barack Obama, Elon Musk, Bill Gates, Joe Biden, Apple, and Uber.',
      'A fraudulent message was tweeted from all accounts: "Send Bitcoin to this wallet address and I will double your payment."'
    ],
    keyVulnerability: 'Reliance on password + phone-based MFA without phishing-resistant FIDO2 hardware keys, combined with human susceptibility to telephone pretexting during remote work.',
    mitigationAndLessons: [
      'Mandated deployment of FIDO2 physical hardware security keys (e.g. YubiKeys) for all employee logins.',
      'Restricted customer support tool permissions so single operators cannot unilaterally reset account emails.',
      'Implemented formal callback protocols requiring IT staff to verify identity through internal corporate Slack channels before handling credential resets.'
    ],
    sources: [
      { title: 'New York Times Investigation: How Twitter Got Hacked', url: 'https://www.nytimes.com' },
      { title: 'Twitter Incident Blog Post: An Update on Our Security Incident', url: 'https://blog.twitter.com' },
      { title: 'New York Department of Financial Services (NYDFS) Report', url: 'https://www.dfs.ny.gov' }
    ]
  },
  {
    id: 'case-google-facebook-bec',
    title: 'Google & Facebook $121M Quanta Computer BEC Scam',
    year: 2015,
    organization: 'Google & Facebook (Meta)',
    attackVector: 'Business Email Compromise (BEC) & Vendor Invoicing Fraud',
    financialImpact: '$121 Million Stolen ($99M Facebook, $23M Google); largest BEC fraud in history',
    overview: 'Between 2013 and 2015, Lithuanian national Evaldas Rimasauskas orchestrated an elaborate corporate impersonation scheme. He registered a company in Latvia with the exact identical name as Quanta Computer, a legitimate Taiwanese hardware supplier that manufactured servers for Google and Facebook.',
    stepByStepAttack: [
      'Rimasauskas registered a shell corporation in Latvia named "Quanta Computer Inc.", opening corporate bank accounts in Cyprus, Latvia, and Lithuania.',
      'He forged corporate email addresses and spoofed Quanta executives, sending periodic multimillion-dollar invoices to Google and Facebook accounts payable departments for legitimate server shipments.',
      'The invoices included forged contracts, corporate seals, and letters signed by fabricated bank directors instructing finance staff to route wire payments to the new European bank accounts.',
      'Over a 24-month period, Facebook wired approximately $99 million and Google wired approximately $23 million directly into the fraudster\'s offshore accounts.',
      'The scheme was only caught when European banking authorities flagged high-volume laundering transfers across offshore shell accounts.'
    ],
    keyVulnerability: 'Failure of accounts payable departments to verify bank account routing changes through secondary out-of-band channels with established vendor representatives.',
    mitigationAndLessons: [
      'Strict Out-of-Band (OOB) Verification: Mandatory protocol requiring phone or video confirmation with a pre-existing primary vendor contact before altering any bank wiring instructions.',
      'Dual Authorization Controls: Multi-signature approval requirements where no single financial officer can release payments above designated thresholds without peer approval.',
      'Automated ERP Supplier Validation: Software that alerts finance departments whenever a supplier\'s wire destination country does not match their official corporate headquarters.'
    ],
    sources: [
      { title: 'US Department of Justice Press Release: Lithuanian Indicted for $100M+ Wire Fraud', url: 'https://www.justice.gov' },
      { title: 'NPR Planet Money: How A Man Fooled Google And Facebook Out Of $120 Million', url: 'https://www.npr.org' }
    ]
  },
  {
    id: 'case-rsa-2011',
    title: 'RSA Security SecurID Token Master Breach',
    year: 2011,
    organization: 'RSA Security (EMC Corporation)',
    attackVector: 'Spear Phishing with Malicious Excel Spreadsheet Macro & Adobe Zero-Day',
    financialImpact: '$66+ Million in direct mitigation; compromised two-factor tokens across Fortune 500 & military contractors',
    overview: 'In early 2011, advanced threat actors targeted RSA Security—the company trusted worldwide for its SecurID hardware two-factor authentication tokens. By sending a targeted spear phishing email to junior HR employees, attackers breached RSA\'s internal network and stole the cryptographic seed values for SecurID tokens.',
    stepByStepAttack: [
      'Attackers sent two targeted spear phishing emails over two days to four small groups of employees at RSA.',
      'The email subject line was "2011 Recruitment plan", and the body contained an attached Excel file: `2011 Recruitment plan.xls`.',
      'The email was caught by RSA\'s spam filter and sent to the employees\' Junk Mail folders.',
      'An employee retrieved the email from the Junk folder and opened the Excel attachment.',
      'The spreadsheet embedded a malicious Flash object that exploited an unpatched Adobe Flash zero-day vulnerability (CVE-2011-0609) to install a Poison Ivy remote access trojan (RAT).',
      'Attackers escalated domain administrator privileges and extracted proprietary data regarding RSA SecurID hardware tokens, which was later utilized to breach US defense contractor Lockheed Martin.'
    ],
    keyVulnerability: 'Employees retrieving unverified emails from junk folders and opening untrusted attachments, combined with unsegmented network storage for critical cryptographic secrets.',
    mitigationAndLessons: [
      'Strict macro disabling across office software suites, prohibiting external documents from executing embedded code.',
      'Zero-Trust network segmentation: Isolating critical crown-jewel assets (such as cryptographic seed vaults) from general corporate office networks.',
      'Employee awareness training stressing that spam filters quarantine messages for legitimate security hazards.'
    ],
    sources: [
      { title: 'Wired Magazine: The RSA Hack - How It Happened', url: 'https://www.wired.com' },
      { title: 'CISA Alert on Advanced Persistent Threat Activity', url: 'https://www.cisa.gov' }
    ]
  },
  {
    id: 'case-colonial-pipeline-2021',
    title: 'Colonial Pipeline Critical Infrastructure Ransomware',
    year: 2021,
    organization: 'Colonial Pipeline Co.',
    attackVector: 'Compromised Legacy VPN Credential (Orphan Account without MFA)',
    financialImpact: '$4.4 Million ransom paid; 6-day shutdown of 5,500 miles of fuel pipelines causing gas shortages across US East Coast',
    overview: 'In May 2021, the DarkSide ransomware gang paralyzed the largest refined oil pipeline system in the United States. The attack did not require a zero-day exploit; adversaries gained initial network access using a single compromised username and password for a legacy Virtual Private Network (VPN) account that lacked Multi-Factor Authentication.',
    stepByStepAttack: [
      'A corporate employee used their company VPN password on an unrelated third-party website that suffered a prior data breach.',
      'The email and password combination leaked onto a dark web cybercrime forum.',
      'The employee had an active legacy VPN profile that remained accessible from the public internet.',
      'Crucially, the organization had not enforced Multi-Factor Authentication (MFA) on this specific legacy VPN portal.',
      'Adversaries logged in with the stolen single-factor credentials, moved laterally across the IT network, and deployed ransomware encrypting billing and administrative servers.',
      'Because billing systems were crippled, Colonial Pipeline proactively shut down the pipeline operations for nearly a week to prevent fuel distribution without billing capabilities.'
    ],
    keyVulnerability: 'Absence of mandatory Multi-Factor Authentication (MFA) across all remote access entry points, compounded by password reuse and orphan account mismanagement.',
    mitigationAndLessons: [
      'Universal MFA Mandate: Enforcing modern phishing-resistant MFA across 100% of external and internal remote access services with zero exceptions.',
      'Orphan Account Auditing: Regular automated lifecycle de-provisioning of legacy accounts and inactive VPN profiles.',
      'Credential Monitoring: Proactively scanning dark web breach corpuses to alert employees whose credentials have appeared in public dumps.'
    ],
    sources: [
      { title: 'Bloomberg: Hackers Breached Colonial Pipeline Using Compromised Password', url: 'https://www.bloomberg.com' },
      { title: 'CISA & FBI Joint Advisory: DarkSide Ransomware', url: 'https://www.cisa.gov' }
    ]
  }
];
