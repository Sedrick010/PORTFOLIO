import { SkillCategory, EngineeringFocus } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend & Backend',
    icon: 'code',
    skills: [
      'React.js',
      'Next.js',
      'Node.js',
      'Laravel',
      'PHP',
      'JavaScript (ES6+)',
      'TypeScript',
      'Express.js',
      'HTML5 / CSS3',
      'Tailwind CSS',
      'Blade Engine'
    ]
  },
  {
    title: 'Database & Storage',
    icon: 'database',
    skills: [
      'MySQL',
      'MongoDB',
      'Relational Schema Design',
      'Multi-Tenant Isolation',
      'Query Optimization',
      'Indexing & Migrations',
      'Redis Caching'
    ]
  },
  {
    title: 'Tools & Architecture',
    icon: 'cpu',
    skills: [
      'Git & GitHub',
      'RESTful APIs',
      'Docker',
      'Linux / WSL',
      'Postman',
      'MVC Architecture',
      'Role-Based Access (RBAC)',
      'Laragon Staging'
    ]
  }
];

export const engineeringFocusList: EngineeringFocus[] = [
  {
    title: 'Clinical & Admin Workflows',
    icon: 'pulse',
    description:
      'Designed and deployed operational systems for dental and veterinary clinics, replacing paper logs with atomic slot reservations and audit-ready medical charting.'
  },
  {
    title: 'Multi-Tenant Architecture',
    icon: 'layers',
    description:
      'Implemented dynamic multi-tenant database separation middleware in Laravel, ensuring enterprise tenant privacy, isolated migrations, and cross-branch integrity.'
  },
  {
    title: 'Strict Concurrency & RBAC',
    icon: 'lock',
    description:
      'Built row-level locking algorithms and division-level access control for government appraisal filing, eliminating collision errors across 4 administrative branches.'
  }
];
