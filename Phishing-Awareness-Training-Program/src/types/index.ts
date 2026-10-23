export type TabType = 
  | 'overview'
  | 'learn'
  | 'simulator' 
  | 'real-vs-fake' 
  | 'quiz' 
  | 'slides' 
  | 'tools-precautions';

export interface Hotspot {
  id: string;
  title: string;
  location: string;
  xPercent: number; // For visual marker
  yPercent: number;
  explanation: string;
  severity: 'high' | 'critical' | 'medium';
}

export interface InteractiveHotspotEmail {
  id: string;
  senderName: string;
  senderEmail: string;
  recipient: string;
  date: string;
  subject: string;
  bodyHtml: string;
  hotspots: Hotspot[];
}

export interface QuickCheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ModuleData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  icon: string;
  summary: string;
  sections: {
    title: string;
    content: string[];
    bulletPoints?: string[];
    callout?: {
      type: 'warning' | 'info' | 'tip' | 'danger';
      title: string;
      text: string;
    };
    diagramData?: {
      type: string;
      items: { label: string; detail: string; icon?: string }[];
    };
  }[];
  quickCheck: QuickCheckQuestion;
}

export interface PhishScenario {
  id: string;
  channel: 'email' | 'sms' | 'qr' | 'portal';
  title: string;
  senderDisplay: string;
  senderAddress: string;
  replyTo?: string;
  subject?: string;
  date: string;
  content: string;
  hoverUrl?: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentType?: string;
  isPhish: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  redFlags: string[];
  legitimateIndicators?: string[];
  detailedForensics: string;
  preventionTip: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  year: number;
  organization: string;
  attackVector: string;
  financialImpact: string;
  overview: string;
  stepByStepAttack: string[];
  keyVulnerability: string;
  mitigationAndLessons: string[];
  sources: { title: string; url: string }[];
}

export interface QuizQuestion {
  id: number;
  moduleRef: number;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  bullets: string[];
  visualType: 'grid' | 'comparison' | 'timeline' | 'stats' | 'checklist' | 'hero';
  visualContent?: any;
  speakerNotes: string;
}
