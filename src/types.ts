export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  thumbnail: string;
  problem: string;
  role: string;
  keyDecisions: string[];
  outcome: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  metrics: { label: string; value: string }[];
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'AI Tools';
  level?: string;
  description: string;
  iconSvg: string; // SVG path or SVG content
  accentColor: string; // e.g. teal, orange, gold
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  badgeType: 'cloud' | 'architecture' | 'ai' | 'kubernetes' | 'award';
  badgeColor: string;
  description: string;
}

export interface SocialLink {
  name: string;
  platform: 'Email' | 'GitHub' | 'LinkedIn' | 'Instagram';
  handle: string;
  url: string;
  displayValue: string;
  iconName: string;
  color: string;
}
