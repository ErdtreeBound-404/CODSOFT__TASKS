import { PhishScenario } from '../types';

export const scenariosData: PhishScenario[] = [
  {
    id: 'scen-1',
    channel: 'email',
    title: 'Scenario 1: Microsoft 365 Password Expiration Alert',
    senderDisplay: 'IT Helpdesk Support',
    senderAddress: 'it-support@cloud-tenant365-verify.com',
    replyTo: 'bounce-collector@security-routing.net',
    subject: 'ACTION REQUIRED: Your corporate password expires in 4 hours',
    date: 'Today, 9:15 AM',
    content: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #334155;">
        <p>Hello Team Member,</p>
        <p>Our periodic security review detected that your active domain directory password is set to expire today at <strong>1:00 PM EST</strong>.</p>
        <p>To avoid loss of synchronization with Outlook, OneDrive, and corporate VPN access, please retain your current password immediately by clicking the verification link below:</p>
        <p style="margin: 20px 0;">
          <span style="display:inline-block; background-color:#2563eb; color:white; padding:10px 18px; border-radius:6px; font-weight:600;">
            Retain Current Password & Continue Access
          </span>
        </p>
        <p>Failure to complete this within the allotted window will trigger automatic account lockout requiring manual supervisor intervention.</p>
        <p style="font-size:12px; color:#94a3b8; border-top:1px solid #e2e8f0; padding-top:10px;">
          Global Enterprise Cloud IT Services • Automated Security System
        </p>
      </div>
    `,
    hoverUrl: 'hxxps://cloud-tenant365-verify[.]com/login/oauth2/token?redirect=session_steal',
    hasAttachment: false,
    isPhish: true,
    difficulty: 'Beginner',
    redFlags: [
      'The sender email domain is "cloud-tenant365-verify.com", NOT your organization\'s legitimate IT domain.',
      'Manufactured 4-hour countdown urgency designed to provoke impulsive action.',
      'Generic salutation ("Hello Team Member") rather than your actual name or employee identifier.',
      'Promises you can "retain" your password without changing it—real IT password policies require creating a new password, never validating an old one.'
    ],
    detailedForensics: 'This is a textbook credential harvesting spear phish. The link leads to an external clone of the Microsoft login interface. Once entered, the attacker records your password and attempts to capture your MFA token.',
    preventionTip: 'Never trust unsolicited password reset links. If in doubt, open a fresh browser window and navigate directly to your company\'s known internal portal.'
  },
  {
    id: 'scen-2',
    channel: 'email',
    title: 'Scenario 2: GitHub Personal Access Token Deprecation Notice',
    senderDisplay: 'GitHub Support',
    senderAddress: 'support@github.com',
    replyTo: 'support@github.com',
    subject: '[GitHub] We have updated our Personal Access Token security requirements',
    date: 'Yesterday, 4:22 PM',
    content: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; color: #24292f;">
        <p>Hi developer,</p>
        <p>We are writing to let you know that starting next month, classic personal access tokens (PATs) will be deprecated in favor of fine-grained personal access tokens.</p>
        <p>No immediate action is required for existing repositories today, but you can learn more in our official documentation:</p>
        <p style="margin: 16px 0;">
          <a style="color: #0969da; text-decoration: underline;" href="#">
            https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
          </a>
        </p>
        <p>Thanks,<br/>The GitHub Team</p>
      </div>
    `,
    hoverUrl: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens',
    hasAttachment: false,
    isPhish: false,
    difficulty: 'Intermediate',
    redFlags: [],
    legitimateIndicators: [
      'Sender address and reply-to are strictly from the verified "support@github.com" domain.',
      'The hover URL matches the visible text exactly and leads to the official "docs.github.com" domain.',
      'No artificial emergency or threats of account deletion ("No immediate action is required").',
      'Does not ask for passwords, bank details, or token submissions.'
    ],
    detailedForensics: 'This is an authentic informational announcement from GitHub. The domain, link destination, lack of coercive language, and absence of credential requests indicate legitimate correspondence.',
    preventionTip: 'Learn to recognize legitimate notices: authentic security updates rarely threaten immediate account termination without several weeks notice and provide verifiable documentation links.'
  },
  {
    id: 'scen-3',
    channel: 'sms',
    title: 'Scenario 3: Urgent Chase Bank Security Alert (Smishing)',
    senderDisplay: '+1 (844) 392-0199',
    senderAddress: 'SMS / Text Message',
    subject: 'Text Alert',
    date: 'Today, 11:04 AM',
    content: `
      <div style="font-family: sans-serif; background: #f1f5f9; padding: 16px; border-radius: 12px; max-width: 320px; border: 1px solid #cbd5e1;">
        <div style="font-size: 11px; color: #64748b; margin-bottom: 8px; text-align: center;">CHASE ALERT: 11:04 AM</div>
        <p style="margin: 0; color: #0f172a; font-size: 14px;">
          CHASE FRAUD ALERT: Did you attempt a $1,420.00 charge at BEST BUY NY? If NO, reply STOP and immediately verify your card identity to lock fraud: <span style="color: #2563eb; text-decoration: underline;">hxxps://chase-fraud-prevention[.]top/auth</span>
        </p>
      </div>
    `,
    hoverUrl: 'hxxps://chase-fraud-prevention[.]top/auth?case=9428',
    hasAttachment: false,
    isPhish: true,
    difficulty: 'Beginner',
    redFlags: [
      'The domain is "chase-fraud-prevention.top" with a suspicious .top top-level domain, not the authentic "chase.com".',
      'The alert incites high panic by quoting a large unexpected transaction ($1,420.00).',
      'Banks will never ask you to click a link in an SMS to enter card numbers or PINs to "cancel" a transaction.'
    ],
    detailedForensics: 'Smishing attacks exploit SMS because people check text messages faster than email. The link opens a mobile-optimized fake banking portal asking for card number, CVV, and online banking PIN.',
    preventionTip: 'Never click links in text messages from banks. Call the official phone number printed on the physical back of your plastic credit/debit card.'
  },
  {
    id: 'scen-4',
    channel: 'email',
    title: 'Scenario 4: Urgent Confidential Acquisition Wire Request (Whaling / BEC)',
    senderDisplay: 'Robert Chen <robert.chen@company-corp.com>',
    senderAddress: 'ceo.robertchen.office@mail-secure-corp.com',
    replyTo: 'ceo.robertchen.office@mail-secure-corp.com',
    subject: 'CONFIDENTIAL: Project Phoenix Wire Authorization - Urgent Before 2 PM',
    date: 'Today, 1:12 PM',
    content: `
      <div style="font-family: Georgia, serif; line-height: 1.6; color: #1e293b;">
        <p>Dear Finance Team,</p>
        <p>I am currently in closed-door discussions with outside counsel regarding the acquisition of Target Technologies. This transaction is strictly confidential and under NDA.</p>
        <p>We need an initial escrow deposit of $48,500 transferred before 2:00 PM today to guarantee exclusivity. Our standard wiring instructions for this transaction are modified per legal counsel.</p>
        <p>Attached are the updated wiring coordinates. Please execute immediately and email me the wire confirmation receipt. Do not call me as I am unable to speak during the meeting.</p>
        <p style="margin-top: 24px;">Robert Chen<br/>Chief Executive Officer</p>
        <p style="font-size: 12px; color: #94a3b8;">Sent from my iPad</p>
      </div>
    `,
    hasAttachment: true,
    attachmentName: 'Escrow_Wiring_Instructions_Phoenix.pdf',
    attachmentType: 'PDF Document',
    isPhish: true,
    difficulty: 'Advanced',
    redFlags: [
      'The display name shows the authentic company domain, but the actual sending address is "ceo.robertchen.office@mail-secure-corp.com".',
      'High-pressure timeline ("before 2:00 PM today") to execute a high-dollar wire transfer.',
      'Explicit instruction preventing out-of-band verification ("Do not call me as I am unable to speak").',
      'Requesting deviation from standard finance accounting protocols.'
    ],
    detailedForensics: 'This is a classic Business Email Compromise (BEC) Whaling attack. Attackers exploit executive authority and enforce secrecy to prevent finance officers from conferring with colleagues.',
    preventionTip: 'Never bypass established dual-control wire authorization protocols for an email. Always verify wiring changes with a known executive via an independent verified phone call or in-person check.'
  },
  {
    id: 'scen-5',
    channel: 'email',
    title: 'Scenario 5: USPS Missed Parcel Delivery Notice (Typosquatting)',
    senderDisplay: 'U.S. Postal Service Tracking',
    senderAddress: 'no-reply@usps-tracking-parcel-support.com',
    subject: 'Important: Your package could not be delivered due to address error [Tracking #US9402910]',
    date: 'Yesterday, 8:05 AM',
    content: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1e293b;">
        <div style="background-color: #004B87; color: white; padding: 12px; font-weight: bold; border-radius: 4px 4px 0 0;">
          UNITED STATES POSTAL SERVICE ®
        </div>
        <div style="border: 1px solid #e2e8f0; padding: 16px; border-radius: 0 0 4px 4px;">
          <p>Your package #<strong>US940291084</strong> arrived at our local hub on Oct 5th, but our courier was unable to deliver due to an incomplete street address on file.</p>
          <p>Please update your shipping address and pay the standard redelivery processing fee ($1.45) within 48 hours to avoid returning the package to the sender.</p>
          <p style="margin: 20px 0;">
            <span style="display:inline-block; background-color: #DA291C; color: white; padding: 10px 20px; font-weight: bold; border-radius: 4px;">
              Update Delivery Address & Pay $1.45
            </span>
          </p>
          <p style="font-size: 11px; color: #64748b;">All shipments are subject to USPS Postal Inspection regulations.</p>
        </div>
      </div>
    `,
    hoverUrl: 'hxxps://usps-redelivery-address-update[.]info/checkout',
    hasAttachment: false,
    isPhish: true,
    difficulty: 'Beginner',
    redFlags: [
      'The domain is "usps-redelivery-address-update.info", NOT the legitimate "usps.com".',
      'Requesting a small credit card fee ($1.45) is a bait technique to harvest credit card numbers and CVV codes.',
      'USPS does not send unsolicited emails asking for redelivery fees unless you specifically registered for package tracking updates.'
    ],
    detailedForensics: 'A widespread consumer scam designed to harvest credit card details. The modest $1.45 fee seems trivial, disarming suspicion, but the submitted card is immediately charged hundreds of dollars by illicit payment networks.',
    preventionTip: 'Go directly to official carrier tracking sites (usps.com, ups.com, fedex.com) and manually type in the tracking number.'
  },
  {
    id: 'scen-6',
    channel: 'qr',
    title: 'Scenario 6: Municipal Parking Meter Quick Pay (Quishing)',
    senderDisplay: 'Physical Decal on Parking Meter',
    senderAddress: 'Physical Sticker Sticker Scan',
    subject: 'Scan to Pay Parking Fee',
    date: 'Public Location',
    content: `
      <div style="font-family: sans-serif; background: #ffffff; border: 2px dashed #f59e0b; padding: 16px; border-radius: 12px; max-width: 320px; text-align: center;">
        <div style="background: #0284c7; color: white; font-weight: 700; padding: 6px; border-radius: 6px; font-size: 14px; margin-bottom: 12px;">
          CITY MUNICIPAL PARKING - FAST PAY
        </div>
        <p style="font-size: 13px; color: #334155; margin-bottom: 12px;">
          Avoid parking ticket violations! Scan QR code to pay by credit card instantly:
        </p>
        <div style="width: 140px; height: 140px; margin: 0 auto; background: #f8fafc; border: 2px solid #0284c7; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 12px; color: #0284c7; border-radius: 8px;">
          [QR CODE MATRIX]<br/>hxxp://city-park-meter[.]cc/pay
        </div>
        <p style="font-size: 11px; color: #dc2626; margin-top: 10px; font-weight: 600;">
          *Notice: Physical decal pasted over the original metal terminal logo.
        </p>
      </div>
    `,
    hoverUrl: 'hxxps://city-park-meter[.]cc/pay?space=412',
    hasAttachment: false,
    isPhish: true,
    difficulty: 'Intermediate',
    redFlags: [
      'Physical sticker placed over the manufacturer\'s original printed meter face.',
      'The destination domain is "city-park-meter.cc", not the official municipal city government portal (.gov).',
      'QR codes bypass corporate email filters and security scanners because they are scanned using private smartphone cameras.'
    ],
    detailedForensics: 'Quishing (QR code phishing) targets users in physical settings. Adversaries stick fraudulent stickers over authentic parking meters or restaurant menus, capturing payment details on malicious sites.',
    preventionTip: 'Inspect physical QR codes for tampering or stickers pasted over existing signs. Whenever possible, pay using official city mobile apps or physical payment slots.'
  },
  {
    id: 'scen-7',
    channel: 'email',
    title: 'Scenario 7: Google Drive "Annual Employee Compensation Review" Share',
    senderDisplay: 'HR Benefits Advisory <hr-noreply@corp-hr-department.net>',
    senderAddress: 'hr-noreply@corp-hr-department.net',
    subject: 'CONFIDENTIAL: 2026 Annual Performance & Compensation Adjustments',
    date: 'Today, 10:14 AM',
    content: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #334155;">
        <p>Dear Colleague,</p>
        <p>The People Operations Committee has finalized the 2026 compensation adjustments, equity grants, and cost-of-living revisions.</p>
        <p>To inspect your individual allocation, please open the restricted Google Sheets document via the link below:</p>
        <p style="margin: 20px 0;">
          <a style="display:inline-block; background-color:#0f9d58; color:white; padding:10px 18px; border-radius:4px; font-weight:bold; text-decoration:none;" href="#">
            View Compensation Adjustment Sheet (.xlsx)
          </a>
        </p>
        <p><em>Access is restricted to authorized company email credentials only.</em></p>
      </div>
    `,
    hoverUrl: 'hxxps://google-docs-drive-auth[.]pw/oauth/authorize?scope=google_all',
    hasAttachment: false,
    isPhish: true,
    difficulty: 'Intermediate',
    redFlags: [
      'Exploits curiosity and personal financial interest (compensation adjustments).',
      'The destination URL is "google-docs-drive-auth.pw", not "drive.google.com" or "docs.google.com".',
      'The sender domain is "corp-hr-department.net", an external spoofed domain.'
    ],
    detailedForensics: 'Attackers frequently use salary, layoff lists, or bonus metrics because curiosity overrides suspicion. The fake link prompts users to "Log in with Google" to read the document, harvesting OAuth tokens or passwords.',
    preventionTip: 'Be especially skeptical of emails teasing sensitive or taboo information like executive salaries or internal layoffs. Check with HR directly through internal communication channels.'
  },
  {
    id: 'scen-8',
    channel: 'email',
    title: 'Scenario 8: Amazon Order Confirmation for Known Book Purchase',
    senderDisplay: 'Amazon.com Order Confirmation',
    senderAddress: 'auto-confirm@amazon.com',
    replyTo: 'auto-confirm@amazon.com',
    subject: 'Your Amazon.com order of "Designing Data-Intensive Applications" has shipped',
    date: 'Yesterday, 3:45 PM',
    content: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #1e293b;">
        <div style="font-size: 20px; font-weight: bold; color: #131921; margin-bottom: 12px;">amazon.com</div>
        <p>Hi Alex,</p>
        <p>Your package is on the way! Track your delivery status below:</p>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; margin: 16px 0;">
          <strong>Order #114-9281742-8391024</strong><br/>
          Designing Data-Intensive Applications (Paperback)<br/>
          Estimated delivery: Tomorrow by 8:00 PM
        </div>
        <p>
          <a style="display:inline-block; background-color: #FFD814; color: #0F1111; padding: 9px 18px; border-radius: 20px; font-weight: 500; border: 1px solid #FCD200; text-decoration: none;" href="#">
            Track Your Package
          </a>
        </p>
        <p style="font-size: 11px; color: #64748b; margin-top: 20px;">
          Amazon.com Services LLC, 410 Terry Ave N, Seattle, WA 98109-5210
        </p>
      </div>
    `,
    hoverUrl: 'https://www.amazon.com/gp/your-account/order-history',
    hasAttachment: false,
    isPhish: false,
    difficulty: 'Intermediate',
    redFlags: [],
    legitimateIndicators: [
      'Sent directly from verified "auto-confirm@amazon.com".',
      'The user recently ordered this exact book item, matching expected activity.',
      'The track package link strictly points to "https://www.amazon.com/gp/your-account/order-history".',
      'No requests for password validation, banking details, or urgent threats.'
    ],
    detailedForensics: 'Authentic order fulfillment message. The sender address, secure HTTPS root domain (amazon.com), and lack of coercive threats confirm this is a safe, authentic transaction receipt.',
    preventionTip: 'Correlate incoming order notifications with your actual recent purchasing history. If you never ordered the item mentioned, do not click the link—visit the retailer directly.'
  }
];
