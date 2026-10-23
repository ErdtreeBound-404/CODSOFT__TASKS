import { ModuleData, InteractiveHotspotEmail } from '../types';

export const interactiveHotspotEmailData: InteractiveHotspotEmail = {
  id: 'sample-email-1',
  senderName: 'Microsoft Security Team',
  senderEmail: 'security-alerts@m1crosoft-office365-verify.com',
  recipient: 'employee@yourorganization.com',
  date: 'Today at 08:42 AM',
  subject: 'URGENT: Password Expiration Notice - Immediate Action Required Within 2 Hours',
  bodyHtml: `
    <div style="font-family: Arial, sans-serif; color: #1e293b; line-height: 1.5;">
      <p>Dear Valued User,</p>
      <p>Your Microsoft 365 enterprise account credentials will expire today at <strong>11:00 AM EST</strong> due to mandatory quarterly domain security updates.</p>
      <p>If you fail to validate your login credentials, your email inbox, OneDrive, and corporate VPN access will be <strong>permanently suspended</strong> by system administrators.</p>
      <p style="margin: 24px 0;">
        <span style="display: inline-block; background-color: #0078d4; color: white; padding: 10px 20px; font-weight: bold; border-radius: 4px;">
          Retain Current Password & Verify Account
        </span>
      </p>
      <p>Alternatively, review the attached security manifest: <code>Security_Certificate_Renewal_2026.html</code></p>
      <p style="font-size: 12px; color: #64748b; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 12px;">
        © 2026 Microsoft Online Security Corporation. All rights reserved.<br/>
        This automated transmission cannot receive replies.
      </p>
    </div>
  `,
  hotspots: [
    {
      id: 'hotspot-sender',
      title: 'Sender Address Mismatch (Typosquatting)',
      location: 'From Header',
      xPercent: 12,
      yPercent: 14,
      severity: 'critical',
      explanation: 'The display name claims "Microsoft Security Team", but the actual domain is "m1crosoft-office365-verify.com" (with a numeral "1" replacing the letter "i"). Legitimate Microsoft communications originate from "@microsoft.com" or verified organizational subdomains.'
    },
    {
      id: 'hotspot-urgency',
      title: 'Artificial Urgency & Fear Coercion',
      location: 'Subject & Body Clock Pressure',
      xPercent: 55,
      yPercent: 32,
      severity: 'high',
      explanation: 'Demanding immediate action within 2 hours under threat of "permanent suspension" induces panic, disabling the victim\'s analytical scrutiny. Legitimate enterprise IT systems never give a 2-hour deadline to avoid immediate termination.'
    },
    {
      id: 'hotspot-salutation',
      title: 'Generic Impersonal Salutation',
      location: 'Greeting line',
      xPercent: 18,
      yPercent: 24,
      severity: 'medium',
      explanation: '"Dear Valued User" is a hallmark of mass bulk phishing campaigns. Your organization\'s IT service desk already knows your actual name, employee ID, and department.'
    },
    {
      id: 'hotspot-link',
      title: 'Deceptive Hyperlink Destination',
      location: 'Blue Action Button',
      xPercent: 40,
      yPercent: 56,
      severity: 'critical',
      explanation: 'While the button text suggests Microsoft account validation, hovering reveals the actual URL: "hxxps://auth-login-check[.]cc/token?id=9218". This leads to an attacker-controlled credential harvesting landing page.'
    },
    {
      id: 'hotspot-attachment',
      title: 'Dangerous HTML File Attachment',
      location: 'Attachment Notice',
      xPercent: 42,
      yPercent: 74,
      severity: 'critical',
      explanation: 'The email prompts opening a ".html" attachment. HTML attachments frequently embed obfuscated JavaScript that executes client-side credential theft, bypassing many basic email security gateway scanner filters.'
    }
  ]
};

export const modulesData: ModuleData[] = [
  {
    id: 1,
    slug: 'what-is-phishing',
    title: 'Module 1: What is Phishing?',
    subtitle: 'Core Definition, Primary Vectors & Psychological Mechanics',
    durationMinutes: 10,
    icon: 'ShieldAlert',
    summary: 'Understand the fundamental taxonomy of phishing, the 7 primary attack variations used today, and why human psychology remains the primary vector for cyber exploitation.',
    sections: [
      {
        title: '1. Definition & Core Mechanics',
        content: [
          'Phishing is a form of social engineering where attackers impersonate trustworthy entities (such as your employer, bank, government agency, or tech provider) to deceive individuals into revealing confidential credentials, financial information, or executing malicious code.',
          'Unlike traditional technical exploits that target software bugs, phishing targets the "human operating system" by exploiting cognitive biases including trust, obedience to authority, urgency, and fear of consequences.',
          'According to the Verizon Data Breach Investigations Report (DBIR) and Anti-Phishing Working Group (APWG), phishing remains the entry point for over 74% of all enterprise security breaches.'
        ],
        callout: {
          type: 'info',
          title: 'Core Takeaway',
          text: 'Phishing succeeds not because victims lack technical intelligence, but because attackers craft contextual scenarios that bypass instinctual caution through manufactured urgency and simulated authority.'
        }
      },
      {
        title: '2. The 7 Phishing Attack Vectors',
        content: [
          'Modern cybercriminals deploy phishing across diverse communication channels. Being prepared requires recognizing how attacks manifest across each format:'
        ],
        diagramData: {
          type: 'vectors',
          items: [
            {
              label: '1. Bulk Email Phishing',
              detail: 'Untargeted spam blasts sent to millions of addresses simultaneously (e.g., generic fake Netflix billing notices, lottery alerts, fake parcel arrivals).',
              icon: 'Mail'
            },
            {
              label: '2. Spear Phishing',
              detail: 'Highly targeted attacks customized for a specific individual or team, using Open Source Intelligence (OSINT) from LinkedIn, news articles, and social media.',
              icon: 'Crosshair'
            },
            {
              label: '3. Whaling (Executive BEC)',
              detail: 'High-value spear phishing targeting C-suite executives, board members, or finance personnel authorized to wire millions of dollars.',
              icon: 'Crown'
            },
            {
              label: '4. Smishing (SMS Phishing)',
              detail: 'Deceptive text messages claiming urgent bank card locks, toll-road violations, or missed courier deliveries with shortened bit.ly URLs.',
              icon: 'Smartphone'
            },
            {
              label: '5. Vishing (Voice Phishing)',
              detail: 'Direct telephone calls impersonating IT helpdesks, fraud investigation units, or government agents, often utilizing voice spoofing or AI deepfakes.',
              icon: 'PhoneCall'
            },
            {
              label: '6. Quishing (QR Code Phishing)',
              detail: 'Malicious QR codes placed on physical parking meters, restaurant flyers, or inside emails to force users to transition from monitored corporate laptops to unmonitored personal smartphones.',
              icon: 'QrCode'
            },
            {
              label: '7. Clone Phishing',
              detail: 'Attackers intercept or view a previously delivered legitimate email, replicate its exact design and text, and only substitute the attachment or URL with a malicious payload.',
              icon: 'Copy'
            }
          ]
        }
      },
      {
        title: '3. Why Phishing Still Works',
        content: [
          'Despite advanced email security gateways, natural language filters, and firewalls, phishing thrives for three core reasons:',
          '1. The Asymmetry Principle: An organization must defend every employee thousands of times a day, but an adversary only needs one employee to click once.',
          '2. Channel Overload: Modern professionals process 120+ emails and dozens of Slack/Teams messages daily under intense deadlines, leading to "cognitive fatigue".',
          '3. Hyper-Personalization: Attackers use public corporate directories, out-of-office autoreplies, and vendor relationships to manufacture believable pretexts.'
        ],
        callout: {
          type: 'warning',
          title: 'Defensive Mindset',
          text: 'Slow down. The single most effective countermeasure against all forms of phishing is taking 10 seconds to verify sender authenticity before reacting.'
        }
      }
    ],
    quickCheck: {
      id: 'qc-1',
      question: 'Which phishing variant specifically targets high-ranking corporate executives or finance controllers to authorize fraudulent high-value fund transfers?',
      options: ['Smishing', 'Clone Phishing', 'Whaling', 'Quishing'],
      correctIndex: 2,
      explanation: 'Whaling is a specialized spear phishing attack directed at senior corporate leadership (CEOs, CFOs, board members) to steal high-value trade secrets or authorize wire transfers.'
    }
  },
  {
    id: 2,
    slug: 'spotting-suspicious-emails',
    title: 'Module 2: Spotting Suspicious Emails',
    subtitle: 'The Anatomy of a Phish, Red Flag Hotspots & Header Inspection',
    durationMinutes: 12,
    icon: 'MailWarning',
    summary: 'Master the 6 visual and structural red flags that distinguish fraudulent emails from authentic corporate communications, and practice with clickable interactive hotspots.',
    sections: [
      {
        title: '1. The 6 Critical Red Flags in Email Communications',
        content: [
          'Whenever you review an email that asks you to click a link, download a document, or enter credentials, evaluate these six indicators:'
        ],
        bulletPoints: [
          'Sender Address Mismatch: Look past the display name (e.g. "Apple Support"). Inspect the actual address enclosed in angle brackets (e.g. <support@app-verify-cloud.com>).',
          'Manufactured Urgency and Pressure: Phishers rely on threats like "Account termination in 1 hour" or "Payroll suspended" to prompt hurried clicks before critical thinking engages.',
          'Generic or Awkward Salutations: Expressions like "Dear Customer", "Dear Member", or "Dear Employee" indicate mass broadcast blasts without user-specific data.',
          'Spelling, Punctuation and Odd Formatting: While generative AI has reduced obvious typos, subtle inconsistencies in tone, branding logos, and grammar remain prevalent.',
          'Unexpected Attachments: Files with extensions like .zip, .html, .iso, .exe, or macro-enabled documents (.xlsm, .docm) should never be opened from unverified senders.',
          'Hover-to-Reveal Link Discrepancies: The text visible on screen might say "https://www.paypal.com", but hovering your mouse over it reveals the true hyperlinked URL destination.'
        ]
      },
      {
        title: '2. Interactive Hotspot Inspection Practice',
        content: [
          'Below is a defanged phishing simulation based on real-world credential harvesting campaigns. Inspect the highlighted alert badges to understand the forensic red flags identified by security teams.'
        ],
        callout: {
          type: 'tip',
          title: 'Pro Tip: How to Hover Safely',
          text: 'On desktop, rest your mouse cursor gently over any hyperlink WITHOUT clicking. The destination URL will appear in the bottom-left status bar of your browser or email client.'
        }
      },
      {
        title: '3. Decoding Email Headers (From, Return-Path & Reply-To)',
        content: [
          'Phishers often exploit display name spoofing because desktop email clients show only the friendly display name. Advanced inspection requires checking the header fields:',
          '• From: What the user sees (can often be easily spoofed if DMARC is not enforced).',
          '• Reply-To: The address that will actually receive your message if you hit "Reply". If this does not match the sender domain, treat as hostile.',
          '• Authentication-Results: Modern email clients display whether SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), and DMARC checks passed (PASS vs FAIL).'
        ]
      }
    ],
    quickCheck: {
      id: 'qc-2',
      question: 'You receive an urgent email from "support@paypa1-security.com" demanding you verify your account within 24 hours. What is the most critical red flag?',
      options: [
        'The email was sent during business hours',
        'The domain uses typosquatting ("paypa1" with the number 1 instead of "paypal.com")',
        'The email mentions account verification',
        'The email includes customer service contact instructions'
      ],
      correctIndex: 1,
      explanation: 'The domain "paypa1-security.com" is an obvious typosquatting domain where the character "l" is replaced with numeral "1". Legitimate PayPal notifications only originate from "paypal.com".'
    }
  },
  {
    id: 3,
    slug: 'fake-logins-fraudulent-websites',
    title: 'Module 3: Fake Logins & Fraudulent Websites',
    subtitle: 'Typosquatting, Look-Alike Domains & The HTTPS Padlock Myth',
    durationMinutes: 12,
    icon: 'Globe',
    summary: 'Learn how cybercriminals clone enterprise login portals, exploit typosquatting and homographs, and why a browser SSL padlock is NOT proof of a legitimate website.',
    sections: [
      {
        title: '1. Domain Manipulation Tactics',
        content: [
          'Attackers cannot register domains already owned by legitimate entities like Microsoft, Google, or Chase Bank. Instead, they rely on deceptive domain variants:'
        ],
        bulletPoints: [
          'Typosquatting: Capitalizing on common typing blunders (e.g., "goolge.com", "microsft.com", "amazn.com").',
          'Combosquatting: Appending legitimate brand names with security terms (e.g., "paypal-security-update.com", "microsoft-login-verify.net").',
          'Subdomain Spoofing: Creating deceptive subdomains on an unrelated root domain (e.g., "login.microsoft.com.attacker-servers.net", where the actual root domain is "attacker-servers.net").',
          'Homograph Attacks (IDN): Using international Cyrillic or Greek characters that look visually identical to Latin characters (e.g., Cyrillic "а" instead of Latin "a").'
        ],
        callout: {
          type: 'danger',
          title: 'Rule of Thumb',
          text: 'Always read domain URLs from right to left! Find the top-level domain (.com, .net, .org) and look at the single word immediately before the first slash. That word is the true root domain.'
        }
      },
      {
        title: '2. The "HTTPS Padlock" Myth Demystified',
        content: [
          'One of the most dangerous misconceptions in cybersecurity is: "If the browser shows a padlock icon, the website is safe."',
          'The truth: HTTPS and the padlock icon ONLY mean the connection between your computer and the web server is encrypted against eavesdropping. It DOES NOT authenticate whether the website owner is a legitimate bank or a criminal in their basement.',
          'Today, over 83% of all active phishing websites utilize free, automated SSL certificates (such as Let\'s Encrypt or Cloudflare) to display the padlock and evade naive browser warnings.'
        ],
        callout: {
          type: 'warning',
          title: 'Padlock Reality',
          text: 'Encryption guarantees privacy in transit, NOT integrity of identity. A phishing site with HTTPS simply encrypts your stolen password as it travels to the attacker!'
        }
      },
      {
        title: '3. Browser-in-the-Browser (BitB) & Fake Popups',
        content: [
          'In sophisticated modern attacks, phishers simulate fake OAuth popups (e.g. "Sign in with Google" or "Sign in with Microsoft") using HTML/CSS frames rendered inside the existing page.',
          'How to detect BitB attacks: Try dragging the login popup window outside the boundaries of your browser viewport. If the popup cannot be moved outside your browser window, it is not a genuine native operating system window—it is an HTML element inside a malicious webpage!'
        ]
      }
    ],
    quickCheck: {
      id: 'qc-3',
      question: 'True or False: A padlock icon and "https://" prefix in the browser address bar confirms that the website is guaranteed to be safe and legitimate.',
      options: [
        'True, because SSL certificates are only granted to verified Fortune 500 corporations',
        'False, because HTTPS only encrypts data in transit; attackers can easily obtain free SSL certificates for phishing domains'
      ],
      correctIndex: 1,
      explanation: 'False! Over 80% of phishing sites today use valid HTTPS certificates. The padlock signifies an encrypted transmission channel, but does nothing to verify the integrity or intentions of the website operator.'
    }
  },
  {
    id: 4,
    slug: 'social-engineering-techniques',
    title: 'Module 4: Social Engineering Techniques',
    subtitle: 'The 9 Psychological Triggers Exploited by Cybercriminals',
    durationMinutes: 14,
    icon: 'Brain',
    summary: 'Explore the psychological mechanisms of social engineering: authority, urgency, fear, curiosity, reciprocity, pretexting, baiting, tailgating, and impersonation.',
    sections: [
      {
        title: '1. The Psychology of Cyber Deception',
        content: [
          'Social engineering is the art of manipulating individuals into performing actions or divulging confidential information. Rather than finding a zero-day exploit in software, criminals exploit human evolutionary traits: trust, eagerness to help, and aversion to conflict.'
        ]
      },
      {
        title: '2. The 9 Core Social Engineering Techniques',
        content: [
          'Social engineers rely on 9 specific cognitive levers to manipulate individuals into compliance:'
        ],
        diagramData: {
          type: 'techniques',
          items: [
            {
              label: '1. Authority',
              detail: 'Impersonating executives, IT directors, IRS auditors, or police. People are conditioned from childhood to follow instructions from figures in power without questioning.',
              icon: 'Shield'
            },
            {
              label: '2. Urgency',
              detail: 'Imposing artificial time limits ("Action required in 30 minutes") to trigger fast emotional thinking and bypass rational risk assessment.',
              icon: 'Clock'
            },
            {
              label: '3. Fear & Intimidation',
              detail: 'Threatening severe consequences like account suspension, legal lawsuits, tax penalties, or public embarrassment if instructions are not followed.',
              icon: 'AlertTriangle'
            },
            {
              label: '4. Curiosity',
              detail: 'Enticing victims with juicy or confidential materials (e.g., "Q4 Layoff List - Confidential.xlsx", celebrity leaks, or salacious corporate memos).',
              icon: 'HelpCircle'
            },
            {
              label: '5. Reciprocity',
              detail: 'Providing a small favor or free gift first (a free gift card, free security audit, or complimentary tool) so the victim feels socially obligated to comply with a subsequent request.',
              icon: 'Gift'
            },
            {
              label: '6. Pretexting',
              detail: 'Inventing an elaborate fictional backstory or persona (e.g., posing as an insurance claims adjuster needing verification data after a hurricane).',
              icon: 'Mask'
            },
            {
              label: '7. Baiting',
              detail: 'Leaving malware-infected USB flash drives labeled "Executive Compensation 2026" in the company parking lot or breakroom for curious staff to plug in.',
              icon: 'HardDrive'
            },
            {
              label: '8. Tailgating / Piggybacking',
              detail: 'Following an authorized employee through a secure RFID door while holding heavy coffee cups or pretending to have misplaced an access badge.',
              icon: 'DoorClosed'
            },
            {
              label: '9. Impersonation',
              detail: 'Assuming the identity of a known trusted colleague, external vendor, or family member using spoofed phone numbers or compromised corporate Slack accounts.',
              icon: 'UserCheck'
            }
          ]
        }
      },
      {
        title: '3. How to Counter Emotional Exploitation',
        content: [
          'When an interaction produces sudden anxiety, extreme urgency, or fear of reprisal, recognize that emotional spike as an indicator of potential manipulation:',
          '• Pause and breathe: Legitimate urgent matters will still exist after 5 minutes of verification.',
          '• Challenge authority politely: It is always acceptable to request formal verification procedures.',
          '• Use out-of-band communication: Never reply to the inbound channel. Look up the person in your internal directory and contact them through an independent line.'
        ]
      }
    ],
    quickCheck: {
      id: 'qc-4',
      question: 'Your "CEO" emails you directly asking you to discreetly purchase $2,000 in Apple gift cards for a surprise client event. Which social engineering techniques are being combined here?',
      options: [
        'Tailgating and Baiting',
        'Authority, Urgency, and Pretexting',
        'Quishing and Clone Phishing',
        'Physical Intrusion and Reciprocity'
      ],
      correctIndex: 1,
      explanation: 'This classic gift card scam leverages Authority (the CEO rank), Urgency ("need these immediately before the meeting"), and Pretexting (the fictional backstory of a client event).'
    }
  },
  {
    id: 5,
    slug: 'practical-protection-tips',
    title: 'Module 5: Practical Protection Tips & Incident Response',
    subtitle: 'MFA Defense, Password Managers, Verification Channels & Post-Click Action',
    durationMinutes: 14,
    icon: 'Lock',
    summary: 'Concrete defensive habits: configuring phishing-resistant MFA, password managers, out-of-band checks, and the exact step-by-step protocol if you accidentally click a malicious link.',
    sections: [
      {
        title: '1. Multi-Factor Authentication (MFA) Hierarchy',
        content: [
          'MFA is mandatory, but not all MFA methods provide equal security against modern phishing attacks:',
          '• SMS / Voice OTP (Weakest): Susceptible to SIM-swapping, interception, and real-time reverse proxy phishing kits (like Evilginx).',
          '• Authenticator App TOTP 6-Digit Codes (Moderate): Better than SMS, but attackers running real-time proxy kits can trick users into typing the 6-digit code into a fake portal.',
          '• FIDO2 / WebAuthn Hardware Security Keys (Strongest): Phishing-resistant. Devices like YubiKeys cryptographically bind the credential to the browser\'s URL domain. If you are on "paypa1.com", the hardware key will refuse to authenticate.'
        ]
      },
      {
        title: '2. The Shield of Password Managers',
        content: [
          'Password managers (such as 1Password, Bitwarden, or browser-native vaults) are one of the most effective anti-phishing tools available:',
          'Why? A password manager will NEVER auto-fill your credentials on a fake domain! Even if you are completely tricked by a lookalike website, the password manager matches the domain strictly. If the domain is "m1crosoft.com", the password manager will refuse to auto-fill your "microsoft.com" credentials, alerting you instantly.'
        ]
      },
      {
        title: '3. Out-of-Band Verification Protocol',
        content: [
          'Whenever you receive an email or message requesting money transfers, invoice bank detail changes, password resets, or sensitive data sharing:',
          '1. Never use the contact info listed inside the suspicious email.',
          '2. Find the verified phone number or internal chat from your corporate directory.',
          '3. Call or message the requester directly to confirm: "Did you just send me this request?"'
        ]
      },
      {
        title: '4. Incident Response: What to Do Immediately After Clicking',
        content: [
          'If you realize you clicked a suspicious link or entered your credentials on an unverified site, panic achieves nothing. Execute these 5 steps immediately:'
        ],
        bulletPoints: [
          'Step 1: Immediately disconnect your network connection (unplug Ethernet or disconnect Wi-Fi) if a malicious file was downloaded.',
          'Step 2: Change your password immediately from a separate, uncompromised device (e.g., your smartphone).',
          'Step 3: Revoke all active sessions and refresh tokens in your account security portal.',
          'Step 4: Report the incident to your IT Security / SOC department with raw email headers and the clicked URL.',
          'Step 5: Monitor associated accounts for unauthorized access or suspicious multi-factor approval prompts.'
        ],
        callout: {
          type: 'danger',
          title: 'Do Not Hide Mistakes!',
          text: 'Security teams understand mistakes happen. Reporting a compromised credential within 5 minutes allows incident response teams to revoke session tokens before damage occurs. Concealing a mistake allows adversaries to move laterally.'
        }
      }
    ],
    quickCheck: {
      id: 'qc-5',
      question: 'You entered your corporate credentials on a site before realizing the URL was fraudulent. What is the very first and most critical action you should take?',
      options: [
        'Delete the email from your trash folder and hope no one notices',
        'Immediately change your password from an uncompromised device and notify your security team',
        'Wait 24 hours to see if your account receives unexpected login notices',
        'Restart your computer three times'
      ],
      correctIndex: 1,
      explanation: 'Prompt credential rotation and notifying your security team/SOC minimizes the adversary\'s operational window to hijack your account or pivot into internal infrastructure.'
    }
  },
  {
    id: 6,
    slug: 'real-world-case-studies',
    title: 'Module 6: High-Profile Real-World Case Studies',
    subtitle: 'Twitter 2020, Google/Facebook $120M BEC, RSA SecurID & Colonial Pipeline',
    durationMinutes: 15,
    icon: 'FileText',
    summary: 'Deep-dive analysis of 4 catastrophic security breaches caused by phishing and social engineering, examining vectors, business impacts, and enduring security lessons.',
    sections: [
      {
        title: '1. Why Real-World Case Studies Matter',
        content: [
          'Even the world\'s most technologically sophisticated organizations have fallen victim to phishing attacks. Examining real incidents proves that security is fundamentally an operational and human discipline, not merely a software feature.'
        ]
      },
      {
        title: '2. Case Studies Overview',
        content: [
          'Below is a summary of the 4 historic incidents detailed in our case study module:',
          '• Twitter (X) 2020: Voice phishing (vishing) targeting remote employees led to hijacking 130 celebrity accounts.',
          '• Google & Facebook (2013-2015): A Business Email Compromise invoice scheme extracted $121M through vendor impersonation.',
          '• RSA Security SecurID (2011): A targeted spear phishing email with an Excel macro zero-day compromised the world\'s premier two-factor hardware token provider.',
          '• Colonial Pipeline (2021): A single leaked legacy VPN credential led to the shutdown of the entire US East Coast fuel supply chain.'
        ]
      }
    ],
    quickCheck: {
      id: 'qc-6',
      question: 'In the 2013-2015 Google & Facebook invoice fraud case, what failure allowed an attacker to siphon over $120 million?',
      options: [
        'A sophisticated SQL injection attack against their internal accounting servers',
        'Employees failed to perform out-of-band verification when vendor bank account payment details were changed',
        'A ransomware infection encrypted all financial backup records',
        'An infected USB stick found in the corporate parking garage'
      ],
      correctIndex: 1,
      explanation: 'Evaldas Rimasauskas exploited a lack of out-of-band dual verification, repeatedly sending forged invoices mimicking Taiwanese vendor Quanta Computer with new bank account routing numbers.'
    }
  }
];
