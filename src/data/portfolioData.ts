import { Project, TechItem, Credential, SocialLink } from '../types';

export const PERSONAL_INFO = {
  name: 'Alex Vance',
  monogram: 'AV',
  title: 'Staff Full-Stack & Systems Architect',
  location: 'San Francisco, CA (UTC-7)',
  status: 'Open to select Staff / Principal roles & high-impact contracts',
  statement: 'Architecting resilient distributed systems, sub-millisecond data pipelines, and editorial digital interfaces with surgical precision.',
  shortBio:
    'With 9+ years navigating scale from seed to high-volume production, I engineer web applications where distributed reliability meets bespoke craft. I specialize in latency-critical frontend rendering, event-driven microservices, and practical agentic AI workflows. Dedicated to clean abstractions, observable codebases, and zero-compromise user experiences.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  stats: [
    { value: '9+', label: 'Years Shipping Systems' },
    { value: '45M+', label: 'Monthly Active Requests' },
    { value: '99.99%', label: 'Production Uptime Sched' },
    { value: '<60ms', label: 'P99 Latency Profile' },
  ],
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'chronos-analytics',
    title: 'Chronos Real-Time Telemetry',
    tagline: 'Sub-second stream processing engine handling 120,000 telemetry events per second.',
    category: 'Distributed Systems',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    problem:
      'Legacy monitoring infrastructure was collapsing under sudden traffic surges, incurring query delays exceeding 24 seconds and resulting in blindspots during critical cloud outages.',
    role: 'Lead Systems Architect & Core Implementer',
    keyDecisions: [
      'Migrated from monolithic relational ingestion to Apache Kafka + ClickHouse column-store pipeline.',
      'Designed a zero-allocation Go ingestion proxy that compresses payloads at network edge via LZ4.',
      'Constructed a client-side WebGL telemetry canvas utilizing offscreen canvas workers for smooth 60fps graphs.',
      'Engineered proactive query partitioning with dynamic bucket sizing based on seasonal ingestion volatility.',
    ],
    outcome:
      'Cut query latencies from 24 seconds to 38 milliseconds, reduced cluster infrastructure expenditure by 43%, and enabled zero-downtime blue/green shard migrations.',
    liveUrl: 'https://chronos-telemetry-demo.example.com',
    githubUrl: 'https://github.com/example/chronos-engine',
    tags: ['Go', 'ClickHouse', 'Kafka', 'TypeScript', 'WebGL', 'Docker'],
    metrics: [
      { label: 'Ingestion Rate', value: '120k/s' },
      { label: 'P99 Query Time', value: '38ms' },
      { label: 'Cost Reduction', value: '43%' },
    ],
  },
  {
    id: 'aurora-canvas',
    title: 'Aurora Collaborative Studio',
    tagline: 'Browser-native infinite canvas with conflict-free CRDT synchronization for creative teams.',
    category: 'Frontend Architecture',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    problem:
      'Creative teams experienced recurring document desynchronization, lost vector edits, and sluggish panning performance when collaborating across distributed continents.',
    role: 'Staff Frontend Architect',
    keyDecisions: [
      'Adopted Yjs state CRDTs over deterministic WebSocket websockets with fractional indexing.',
      'Engineered an incremental spatial bounding-tree index (R-Tree) for viewport-only DOM culling.',
      'Built custom vector bezier mathematical engine running in WebAssembly for precision curve smoothing.',
      'Implemented optimistic gesture prediction with localized rollback to maintain perceived zero latency.',
    ],
    outcome:
      'Achieved steady 120fps panning across 15,000+ vector shapes with simultaneous real-time multi-cursor collaboration across 40 concurrent participants.',
    liveUrl: 'https://aurora-studio.example.com',
    githubUrl: 'https://github.com/example/aurora-crdt-canvas',
    tags: ['React', 'TypeScript', 'Yjs', 'WebAssembly', 'Tailwind', 'WebSockets'],
    metrics: [
      { label: 'Render Budget', value: '120 FPS' },
      { label: 'Sync Latency', value: '<15ms' },
      { label: 'Concurrent Users', value: '40+' },
    ],
  },
  {
    id: 'synth-agent',
    title: 'Synthetica AI Governance Mesh',
    tagline: 'Multi-agent orchestration gateway enforcing PII scrubbing, cost budgets, and deterministic evaluation.',
    category: 'AI Infrastructure',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    problem:
      'Uncontrolled LLM adoption resulted in unpredictable monthly inference overspends, confidential data leakage risks, and hallucinations in regulated clinical workflows.',
    role: 'Principal AI Engineer',
    keyDecisions: [
      'Designed an inline reverse proxy with regex + small fast embeddings for sub-10ms PII token masking.',
      'Implemented model semantic caching with vector distance thresholding, absorbing 34% of repeated queries.',
      'Built streaming validation state machines that verify structured JSON schemas token-by-token during inference.',
      'Created granular per-team circuit breakers and dynamic model degradation fallbacks to Gemini Flash.',
    ],
    outcome:
      'Lowered LLM API costs by $380,000 annually while preventing 100% of sensitive PII transmission events verified by third-party compliance audit.',
    liveUrl: 'https://synthetica-mesh.example.com',
    githubUrl: 'https://github.com/example/synthetica-ai-mesh',
    tags: ['Python', 'FastAPI', 'Gemini API', 'PostgreSQL', 'Redis', 'OpenTelemetry'],
    metrics: [
      { label: 'Cost Savings', value: '$380k/yr' },
      { label: 'Cache Hit Rate', value: '34%' },
      { label: 'PII Interception', value: '100%' },
    ],
  },
  {
    id: 'hyperion-db',
    title: 'Hyperion Edge Key-Value Store',
    tagline: 'Ultra-lightweight embedded memory-mapped LSM database optimized for ARM serverless runtimes.',
    category: 'Core Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    problem:
      'Standard serverless edge functions were penalized with cold-starts exceeding 180ms due to heavyweight network client handshakes for basic metadata lookups.',
    role: 'Core Systems Developer',
    keyDecisions: [
      'Engineered an append-only log-structured merge-tree (LSM) engine using Rust and zero-copy mmap.',
      'Utilized Bloom filter acceleration with 1% false-positive bounds to bypass redundant disk seeks.',
      'Packaged as a direct Node.js Native Addon (N-API) alongside an ultra-compact WASM fallback target.',
      'Enforced crash-resilient write-ahead logging (WAL) with CRC32 block checksumming.',
    ],
    outcome:
      'Reduced serverless initialization overhead to under 4ms with 420,000 read operations per second on modest edge micro-instances.',
    liveUrl: 'https://hyperion-db.example.com',
    githubUrl: 'https://github.com/example/hyperion-storage',
    tags: ['Rust', 'C++', 'WASM', 'Memory-Mapped I/O', 'Node.js', 'Benchmarking'],
    metrics: [
      { label: 'Cold Start', value: '<4ms' },
      { label: 'Read Ops/Sec', value: '420k' },
      { label: 'Binary Size', value: '1.4MB' },
    ],
  },
  {
    id: 'strata-payments',
    title: 'Strata Financial Clearinghouse',
    tagline: 'Idempotent double-entry ledger with guaranteed reconciliation across 14 payment rails.',
    category: 'FinTech',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    problem:
      'Intermittent vendor network timeouts caused duplicated debit disputes and an estimated $1.2M in annual unallocated transit discrepancy.',
    role: 'Lead Backend Engineer',
    keyDecisions: [
      'Implemented immutable append-only double-entry bookkeeping based on Martin Fowler ledger accounting patterns.',
      'Enforced strict distributed locking with Redis Redlock & transactional PostgreSQL isolation levels.',
      'Constructed asynchronous reconciliation worker pools running continuous reconciliation passes.',
      'Built automated webhook retry exponential backoff with dead-letter queue inspection UI.',
    ],
    outcome:
      'Reduced financial ledger reconciliation discrepancies to zero cents ($0.00) over 18 consecutive calendar months while processing $210M in transaction volume.',
    liveUrl: 'https://strata-ledger.example.com',
    githubUrl: 'https://github.com/example/strata-ledger',
    tags: ['PostgreSQL', 'TypeScript', 'Node.js', 'Redis', 'Docker', 'Stripe'],
    metrics: [
      { label: 'Processed Vol', value: '$210M+' },
      { label: 'Reconciliation Error', value: '$0.00' },
      { label: 'Daily Transfers', value: '85,000+' },
    ],
  },
  {
    id: 'zenith-compiler',
    title: 'Zenith Design Token Synthesizer',
    tagline: 'AST transform compiler converting design tokens into multi-platform semantic CSS, SwiftUI, and Jetpack Compose.',
    category: 'Developer Tooling',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    problem:
      'Engineering handoff between Figma design specs and 3 engineering client platforms (Web, iOS, Android) caused high UI inconsistency and 40+ hours of manual updates per release.',
    role: 'Author & Open Source Maintainer',
    keyDecisions: [
      'Built a TypeScript compiler utilizing Babel AST parser and custom code-generation visitors.',
      'Designed a strict schema validator for W3C Design Tokens Community Group specification.',
      'Implemented automatic WCAG 2.1 contrast ratio mathematical computation with auto-adjust suggestions.',
      'Shipped an automated GitHub Action and CLI supporting live watch mode with instant hot reload.',
    ],
    outcome:
      'Adopted across 12 enterprise product squads, saving an estimated 1,400 engineering hours annually and achieving 100% design system token alignment.',
    liveUrl: 'https://zenith-tokens.example.com',
    githubUrl: 'https://github.com/example/zenith-compiler',
    tags: ['TypeScript', 'AST Compilers', 'Tailwind', 'SwiftUI', 'CLI', 'GitHub Actions'],
    metrics: [
      { label: 'Time Saved', value: '1.4k hrs/yr' },
      { label: 'Adopting Squads', value: '12' },
      { label: 'Token Accuracy', value: '100%' },
    ],
  },
];

export const TECH_STACK_DATA: TechItem[] = [
  // FRONTEND
  {
    name: 'React 19',
    category: 'Frontend',
    description: 'Server components, concurrent mode, custom hooks, and state architecture',
    accentColor: '#14b8a6', // teal
    iconSvg: 'react',
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    description: 'Type gymnastics, AST manipulation, robust compile-time domain modeling',
    accentColor: '#38bdf8', // light blue
    iconSvg: 'typescript',
  },
  {
    name: 'Next.js 15',
    category: 'Frontend',
    description: 'App Router, hybrid SSR/SSG rendering, dynamic caching, and streaming UI',
    accentColor: '#f97316', // orange
    iconSvg: 'nextjs',
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    description: 'Modern CSS architecture, utility-first design systems, and responsive layouts',
    accentColor: '#2dd4bf', // teal
    iconSvg: 'tailwindcss',
  },
  {
    name: 'Framer Motion',
    category: 'Frontend',
    description: 'GPU-accelerated physics springs, exit animations, and layout projections',
    accentColor: '#facc15', // gold
    iconSvg: 'framer',
  },
  {
    name: 'Vue / Nuxt',
    category: 'Frontend',
    description: 'Composition API, reactivity primitives, and lightweight reactive microfrontends',
    accentColor: '#10b981', // green
    iconSvg: 'vue',
  },

  // BACKEND
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'High-throughput async event loops, custom streams, and microservice APIs',
    accentColor: '#22c55e', // green
    iconSvg: 'nodejs',
  },
  {
    name: 'Go (Golang)',
    category: 'Backend',
    description: 'Concurrent goroutines, zero-allocation microservices, and network protocols',
    accentColor: '#06b6d4', // cyan
    iconSvg: 'go',
  },
  {
    name: 'Python',
    category: 'Backend',
    description: 'FastAPI, asynchronous event workers, data extraction, and numerical computing',
    accentColor: '#f59e0b', // gold/amber
    iconSvg: 'python',
  },
  {
    name: 'GraphQL',
    category: 'Backend',
    description: 'Federated schema stitching, dataloader N+1 prevention, and subscription streams',
    accentColor: '#e11d48', // rose
    iconSvg: 'graphql',
  },
  {
    name: 'Rust',
    category: 'Backend',
    description: 'Memory safety, systems programming, and high-performance WASM binaries',
    accentColor: '#ea580c', // orange
    iconSvg: 'rust',
  },
  {
    name: 'Docker & K8s',
    category: 'Backend',
    description: 'OCI container orchestration, multi-stage builds, and declarative infrastructure',
    accentColor: '#0284c7', // sky
    iconSvg: 'docker',
  },

  // DATABASE
  {
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Complex CTEs, window functions, partitioned tables, and pgvector embeddings',
    accentColor: '#3b82f6', // blue
    iconSvg: 'postgresql',
  },
  {
    name: 'Redis',
    category: 'Database',
    description: 'In-memory caching, distributed locks, pub/sub messaging, and rate limiters',
    accentColor: '#ef4444', // red
    iconSvg: 'redis',
  },
  {
    name: 'ClickHouse',
    category: 'Database',
    description: 'Real-time column-oriented OLAP analytical queries on billions of rows',
    accentColor: '#eab308', // gold
    iconSvg: 'clickhouse',
  },
  {
    name: 'Supabase',
    category: 'Database',
    description: 'Row-Level Security (RLS), Postgres functions, and real-time CDC replication',
    accentColor: '#10b981', // green
    iconSvg: 'supabase',
  },
  {
    name: 'Prisma / Drizzle',
    category: 'Database',
    description: 'Strictly typed ORM/query builder migrations with zero runtime penalties',
    accentColor: '#14b8a6', // teal
    iconSvg: 'drizzle',
  },

  // AI TOOLS
  {
    name: 'Gemini API',
    category: 'AI Tools',
    description: 'Multimodal reasoning, 2M context windows, function calling, and structured outputs',
    accentColor: '#2dd4bf', // teal
    iconSvg: 'gemini',
  },
  {
    name: 'PyTorch',
    category: 'AI Tools',
    description: 'Tensor operations, embedding generation, fine-tuning, and model evaluation',
    accentColor: '#f97316', // orange
    iconSvg: 'pytorch',
  },
  {
    name: 'LangChain / LlamaIndex',
    category: 'AI Tools',
    description: 'Agentic workflows, recursive retrieval graphs, and semantic index chunking',
    accentColor: '#10b981', // green
    iconSvg: 'langchain',
  },
  {
    name: 'Hugging Face',
    category: 'AI Tools',
    description: 'Model quantization, transformers pipeline inference, and dataset benchmarking',
    accentColor: '#facc15', // gold
    iconSvg: 'huggingface',
  },
  {
    name: 'pgvector / Qdrant',
    category: 'AI Tools',
    description: 'HNSW vector indexes, cosine similarity filtering, and hybrid dense/sparse search',
    accentColor: '#8b5cf6', // purple
    iconSvg: 'vector',
  },
];

export const CREDENTIALS_DATA: Credential[] = [
  {
    id: 'aws-solutions-architect',
    title: 'AWS Certified Solutions Architect – Professional',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: 'Validated • 2024 - 2027',
    credentialId: 'AWS-PSA-8849204',
    badgeType: 'cloud',
    badgeColor: '#f97316', // orange
    description: 'Demonstrated advanced expertise in designing scalable, reliable, and fault-tolerant multi-tier cloud architectures.',
  },
  {
    id: 'google-cloud-architect',
    title: 'Google Cloud Certified Professional Cloud Architect',
    issuer: 'Google Cloud',
    issueDate: 'Validated • 2024 - 2026',
    credentialId: 'GCP-PCA-940212',
    badgeType: 'cloud',
    badgeColor: '#14b8a6', // teal
    description: 'Certified in leveraging Google Cloud technologies to design secure, compliant, and robust software ecosystems.',
  },
  {
    id: 'cka-kubernetes',
    title: 'CKA: Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation (CNCF)',
    issueDate: 'Validated • 2023 - 2026',
    credentialId: 'CKA-2300-8472',
    badgeType: 'kubernetes',
    badgeColor: '#38bdf8', // cyan
    description: 'Validated hands-on capability to install, configure, manage, and troubleshoot enterprise-grade Kubernetes clusters.',
  },
  {
    id: 'stanford-machine-learning',
    title: 'Deep Learning & Neural Networks Specialization',
    issuer: 'DeepLearning.AI / Stanford Online',
    issueDate: 'Honors • 2023',
    credentialId: 'DL-SPEC-47291',
    badgeType: 'ai',
    badgeColor: '#facc15', // gold
    description: 'Rigorous mastery of backpropagation, convolutional neural nets, sequence models, and transformer architectures.',
  },
  {
    id: 'awwwards-nominee',
    title: 'Awwwards Developer of the Day & Site of the Day',
    issuer: 'Awwwards Jury',
    issueDate: 'Awarded • 2024',
    credentialId: 'AWW-DOTD-2024',
    badgeType: 'award',
    badgeColor: '#f59e0b', // amber
    description: 'Recognized internationally for exceptional technical execution, fluid 60fps micro-interactions, and accessibility standards.',
  },
  {
    id: 'hashicorp-terraform',
    title: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    issueDate: 'Validated • 2023 - 2025',
    credentialId: 'TERRA-ASSOC-6411',
    badgeType: 'architecture',
    badgeColor: '#a855f7', // purple
    description: 'Certified in Infrastructure as Code (IaC) principles, state management, module design, and automated CI/CD provisioning.',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Email Direct',
    platform: 'Email',
    handle: 'alex.vance.dev@gmail.com',
    url: 'mailto:alex.vance.dev@gmail.com',
    displayValue: 'alex.vance.dev@gmail.com',
    iconName: 'Mail',
    color: 'teal',
  },
  {
    name: 'GitHub',
    platform: 'GitHub',
    handle: '@alexvance-eng',
    url: 'https://github.com',
    displayValue: 'github.com/alexvance-eng',
    iconName: 'Github',
    color: 'orange',
  },
  {
    name: 'LinkedIn',
    platform: 'LinkedIn',
    handle: 'linkedin.com/in/alexvance-architect',
    url: 'https://linkedin.com',
    displayValue: 'in/alexvance-architect',
    iconName: 'Linkedin',
    color: 'gold',
  },
  {
    name: 'Instagram',
    platform: 'Instagram',
    handle: '@alexvance.builds',
    url: 'https://instagram.com',
    displayValue: '@alexvance.builds',
    iconName: 'Instagram',
    color: 'teal',
  },
];
