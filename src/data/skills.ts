import { SkillCategory } from '@/types';

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
