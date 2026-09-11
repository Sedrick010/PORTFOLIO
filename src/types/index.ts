export interface Project {
  id: string;
  category: 'web' | 'mobile' | 'system' | 'all';
  title: string;
  role: string;
  badges: { label: string; type: 'enterprise' | 'live' | 'oss' }[];
  problem: string;
  architecture: string;
  impact: string;
  features: string[];
  tech: string[];
  link?: string;
  images: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  description: string;
  image: string;
}

export interface SkillCategory {
  title: string;
  icon: 'code' | 'database' | 'cpu';
  skills: string[];
}

export interface EngineeringFocus {
  title: string;
  icon: 'pulse' | 'layers' | 'lock';
  description: string;
}
