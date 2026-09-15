import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'vet',
    category: 'web',
    title: 'Vet Clinic Management System',
    role: 'Lead Backend Developer & System Architect',
    badges: [
      { label: 'Multi-Tenant', type: 'enterprise' },
      { label: 'Live System', type: 'live' }
    ],
    problem:
      'Local veterinary practices relied on fragmented paper ledgers and isolated spreadsheets. This caused patient record retrieval delays exceeding 15 minutes, scheduling collisions, lost immunization records, and zero multi-branch inventory tracking.',
    architecture:
      'Dynamic multi-tenant schema isolation in Laravel 10 with MySQL connection routing per tenant request, granular RBAC, and Redis caching. Frontend built with responsive Blade components and Tailwind CSS.',
    impact:
      'Production platform managing appointments, medical history charting, and automated billing across multiple clinic branches.',
    features: [
      'Tenant-isolated schema design ensuring strict tenant data separation and security',
      'Granular Role-Based Access Control (SuperAdmin, Clinic Staff, Veterinarians)',
      'Automated clinical history tracking, prescription auditing, and PDF invoicing',
      'Real-time appointment scheduling with calendar conflict prevention'
    ],
    tech: ['Laravel 10', 'MySQL', 'PHP', 'Tailwind CSS', 'Redis', 'REST APIs'],
    link: 'https://github.com/Sedrick010/Vet-Clinic-Management-System/tree/INTEGRATION',
    images: ['/images/vet.png']
  },
  {
    id: 'dental',
    category: 'web',
    title: 'Unicare Dental Clinic System',
    role: 'Full-Stack Software Engineer',
    badges: [
      { label: 'Clinical Workflow', type: 'live' },
      { label: 'Open Source', type: 'oss' }
    ],
    problem:
      'The Bukidnon State University Dental Clinic faced severe manual bottlenecks: paper-based queue sheets, lost treatment cards, and zero digital tracking for medical consumables across hundreds of student visits each term.',
    architecture:
      'Full-stack MERN (MongoDB, Express.js, React.js, Node.js) architecture with JWT authentication, role-segregated API endpoints, atomic queue conflict detection, and server-side PDF audit report generation.',
    impact:
      'Engineered for university medical services handling hundreds of active student bookings each semester.',
    features: [
      'Digital patient appointment queue with real-time slot conflict resolution',
      'Encrypted longitudinal dental charting and procedure histories',
      'Live consumable inventory tracking with automated low-stock warnings',
      'Institutional RBAC protecting student health data in compliance with privacy guidelines'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    link: 'https://github.com/JhonLesterY/20241_T145_Dental-Clinic-Management-System',
    images: ['/images/dental.png']
  },
  {
    id: 'passo',
    category: 'web',
    title: 'PAssO Enterprise File Management',
    role: 'Co-Developer & Systems Architect',
    badges: [
      { label: 'Multi-Tenant / Concurrency', type: 'enterprise' }
    ],
    problem:
      'The Provincial Assessor\'s Office (PAssO) coordinated real property assessments across four separate departmental divisions manually, leading to document routing bottlenecks, accidental overwrite conflicts, and missing dossiers.',
    architecture:
      'Laravel backend engine coupled with TypeScript/React components, MySQL relational indexing, strict row-level optimistic locking, and Laragon staging infrastructure.',
    impact:
      'Departmental file routing platform coordinating real property documentation across 4 divisions without data collision.',
    features: [
      'Strict row-level concurrency locks preventing inter-division document collision',
      'Automated real property tax computation algorithms adhering to provincial valuation guidelines',
      'Centralized document workflow routing across all 4 departmental divisions',
      'Tamper-evident audit trails recording all document state changes'
    ],
    tech: ['Laravel', 'React.js', 'TypeScript', 'MySQL', 'Laragon', 'REST APIs'],
    images: ['/images/passo.png']
  }
];
