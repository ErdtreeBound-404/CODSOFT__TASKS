import { QuizQuestion } from '../types';

export const quizQuestionsData: QuizQuestion[] = [
  {
    id: 1,
    moduleRef: 1,
    category: 'Phishing Fundamentals',
    question: 'What fundamentally distinguishes spear phishing from broad bulk email phishing?',
    options: [
      'Spear phishing is sent to millions of random addresses with generic offers',
      'Spear phishing targets specific individuals or organizations using tailored reconnaissance intelligence',
      'Spear phishing is exclusively conducted over voice phone calls',
      'Spear phishing never uses malicious links or email attachments'
    ],
    correctIndex: 1,
    explanation: 'Spear phishing utilizes Open Source Intelligence (OSINT) gathered from LinkedIn, social networks, and public records to craft personalized, believable lures directed at specific individuals or departments.'
  },
  {
    id: 2,
    moduleRef: 2,
    category: 'Email Red Flags',
    question: 'You receive an urgent email from "security@paypa1-support.com" warning that your account is restricted. What is the most critical red flag in this message?',
    options: [
      'The message was delivered in the morning',
      'The domain uses typosquatting: "paypa1" with the number 1 instead of the letter "l"',
      'The email contains corporate branding colors',
      'The email is signed by the Customer Service department'
    ],
    correctIndex: 1,
    explanation: 'The domain "paypa1-support.com" replaces the lowercase "l" with number "1". Legitimate notifications from PayPal come strictly from "paypal.com".'
  },
  {
    id: 3,
    moduleRef: 3,
    category: 'Website Security',
    question: 'True or False: If a website shows a secure padlock icon and begins with "https://", it is guaranteed to be a legitimate, authentic business website.',
    options: [
      'True, because web browsers only show padlocks to legally registered corporate entities',
      'False, because HTTPS only encrypts communication in transit; attackers routinely acquire free SSL certificates for phishing sites'
    ],
    correctIndex: 1,
    explanation: 'False! Over 80% of active phishing websites use HTTPS. The padlock indicates that your traffic is encrypted between your browser and the destination server, but it says nothing about who owns that server or what they will do with your data.'
  },
  {
    id: 4,
    moduleRef: 4,
    category: 'Social Engineering',
    question: 'An email claims to be from the CEO marked "CONFIDENTIAL: Emergency Wire Transfer Required Before 2 PM for Secret Acquisition - Do Not Call Me as I am in Meetings". Which psychological techniques are being exploited?',
    options: [
      'Authority, Urgency, and Pretexting',
      'Tailgating, Baiting, and Quishing',
      'Reciprocity and Physical Impersonation',
      'Vishing and Brute Force'
    ],
    correctIndex: 0,
    explanation: 'The scam leverages Authority (the CEO title), Urgency (2 PM deadline), and Pretexting (secret acquisition with explicit instructions prohibiting out-of-band verification phone calls).'
  },
  {
    id: 5,
    moduleRef: 5,
    category: 'Incident Response',
    question: 'You clicked a link in an unverified email and entered your corporate password before realizing it was a phishing site. What is the very first action you should take?',
    options: [
      'Delete the email, clear your browser history, and wait to see if anything happens',
      'Immediately change your password from a clean, uncompromised device and notify your IT security / SOC team',
      'Forward the phishing link to all your coworkers to ask if they received it too',
      'Turn off your monitor for 10 minutes'
    ],
    correctIndex: 1,
    explanation: 'Rotating credentials immediately and notifying your security operations center (SOC) closes the exploitation window before the adversary can authenticate or establish persistence.'
  },
  {
    id: 6,
    moduleRef: 3,
    category: 'Domain & URL Analysis',
    question: 'Which of the following URLs is the legitimate, authentic Microsoft login portal?',
    options: [
      'https://login.microsoftonline.com/common/oauth2',
      'https://microsoft-login-verify365.com/auth',
      'https://login.microsoftonline.com.attacker-control.cc/login',
      'https://m1crosoft-security.net/session'
    ],
    correctIndex: 0,
    explanation: '"https://login.microsoftonline.com/..." is the authentic domain owned by Microsoft. The third option has "attacker-control.cc" as the actual root domain, which is a classic subdomain spoofing trick.'
  },
  {
    id: 7,
    moduleRef: 1,
    category: 'Attack Channels',
    question: 'What is "Quishing"?',
    options: [
      'Phishing through video conference meeting invitations',
      'Phishing through malicious QR codes designed to direct smartphone cameras to fraudulent websites',
      'Voice phishing through recorded automated robocalls',
      'Intercepting encrypted wireless Bluetooth transmissions'
    ],
    correctIndex: 1,
    explanation: 'Quishing is QR code phishing. Attackers place malicious QR codes in emails or on physical stickers (e.g. parking meters) to evade corporate email security filters and redirect users onto malicious sites via their personal mobile devices.'
  },
  {
    id: 8,
    moduleRef: 5,
    category: 'Defensive Technology',
    question: 'Why are dedicated password managers (like 1Password, Bitwarden, or browser keychains) an effective defense against phishing login pages?',
    options: [
      'They automatically hack the phishing server and take it offline',
      'They strictly match the domain name and will refuse to auto-fill credentials on look-alike or typosquatted domains',
      'They block all emails from arriving in your inbox',
      'They only work when connected to a company VPN'
    ],
    correctIndex: 1,
    explanation: 'Password managers bind credentials strictly to the verified top-level domain. If you land on "m1crosoft.com", the manager will not offer to fill credentials saved for "microsoft.com", immediately alerting you.'
  },
  {
    id: 9,
    moduleRef: 6,
    category: 'Case Studies',
    question: 'In the 2020 Twitter breach where celebrity accounts tweeted a Bitcoin scam, how did attackers gain initial access into internal admin tools?',
    options: [
      'They cracked Twitter\'s cryptographic database encryption keys',
      'They called remote employees via phone (vishing) posing as IT technicians troubleshooting VPN connections',
      'They broke into Twitter headquarters by picking the front door lock',
      'An infected USB stick was found in the parking lot'
    ],
    correctIndex: 1,
    explanation: 'Adversaries used phone-based voice phishing (vishing) to impersonate internal IT helpdesk staff, convincing employees to submit credentials and one-time MFA codes into a fake VPN portal.'
  },
  {
    id: 10,
    moduleRef: 6,
    category: 'Case Studies',
    question: 'In the $121M Google and Facebook invoice scam (Evaldas Rimasauskas), what fundamental protocol failure allowed the payments to occur?',
    options: [
      'Employees failed to conduct out-of-band verification when a vendor requested changed bank wiring account numbers',
      'Attackers deployed zero-day malware that automatically wired funds without human approval',
      'The banks had no internet connection',
      'A hardware token failed to generate random numbers'
    ],
    correctIndex: 0,
    explanation: 'Finance personnel fulfilled fraudulent invoices without calling known vendor representatives on verified telephone lines to corroborate the changes to the bank wiring coordinates.'
  },
  {
    id: 11,
    moduleRef: 4,
    category: 'Social Engineering',
    question: 'An individual in delivery overalls holding heavy cardboard boxes asks an employee to hold the badge-restricted security door open. What social engineering tactic is this?',
    options: [
      'Tailgating / Piggybacking exploiting courtesy and reciprocity',
      'Smishing through mobile network packets',
      'Spear phishing via corporate intranet',
      'Homograph attack on physical keycards'
    ],
    correctIndex: 0,
    explanation: 'Tailgating (or piggybacking) relies on social politeness to gain physical entry through secure doors without authenticating an RFID badge.'
  },
  {
    id: 12,
    moduleRef: 5,
    category: 'Authentication Security',
    question: 'Which Multi-Factor Authentication (MFA) method provides the highest resilience against real-time reverse proxy phishing kits (like Evilginx)?',
    options: [
      'SMS text message 6-digit verification codes',
      'Voice phone call automated verification',
      'FIDO2 / WebAuthn hardware security keys (e.g. YubiKey)',
      'Answering security questions like "mother\'s maiden name"'
    ],
    correctIndex: 2,
    explanation: 'FIDO2 / WebAuthn hardware security keys are cryptographically bound to the browser\'s origin domain. Even if you are tricked onto a fake proxy site, the key communicates only with the true origin, rendering the attack impossible.'
  },
  {
    id: 13,
    moduleRef: 2,
    category: 'Email Red Flags',
    question: 'What is the "hover-to-reveal" technique in email inspection?',
    options: [
      'Hovering over the sender\'s picture to see their webcam feed',
      'Hovering your mouse pointer over a hyperlink without clicking to view the true destination URL in the status bar',
      'Waiting 10 minutes before opening any incoming attachment',
      'Hovering your mouse over the subject line to delete the email'
    ],
    correctIndex: 1,
    explanation: 'Hovering reveals the actual hyperlinked destination address, exposing discrepancies between displayed link text (e.g. "www.bank.com") and the actual server destination (e.g. "hxxps://fake-bank-auth.cc").'
  },
  {
    id: 14,
    moduleRef: 6,
    category: 'Case Studies',
    question: 'What single security deficiency allowed ransomware actors to shut down the Colonial Pipeline fuel supply for 6 days in 2021?',
    options: [
      'A physical bomb destroyed the main computing center',
      'A legacy VPN profile with a compromised password did not have Multi-Factor Authentication (MFA) enabled',
      'All employees shared the same single email address',
      'A zero-day exploit in their fuel pumping software'
    ],
    correctIndex: 1,
    explanation: 'Adversaries logged in via a dormant legacy VPN profile using credentials leaked in a prior third-party breach because the VPN portal did not enforce Multi-Factor Authentication.'
  },
  {
    id: 15,
    moduleRef: 3,
    category: 'Safe Investigation',
    question: 'When investigating a suspicious link safely, why is it standard practice to "defang" malicious URLs (e.g., converting "http://" to "hxxp://" and "example.com" to "example[.]com")?',
    options: [
      'To prevent colleagues or automated mail clients from accidentally clicking or resolving the live malicious link',
      'To automatically remove malware from the remote web server',
      'To encrypt the URL so only government agents can read it',
      'To format the link so search engines rank it higher'
    ],
    correctIndex: 0,
    explanation: 'Defanging neutralizes links so email readers, chat apps, and security analysts cannot accidentally execute or open the malicious resource.'
  }
];
