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
    images: ['/images/vet.png', '/images/vet_ss1.png', '/images/vet_ss2.png'],
    codeSnippet: {
      language: 'php',
      code: `// Dynamic Multi-Tenant Database Connection Middleware
public function handle(Request $request, Closure $next)
{
    $subdomain = explode('.', $request->getHost())[0];
    $tenant = Tenant::where('subdomain', $subdomain)->firstOrFail();
    
    // Purge and reconfigure tenant connection dynamically
    Config::set('database.connections.tenant.database', $tenant->database_name);
    DB::purge('tenant');
    DB::reconnect('tenant');
    
    // Bind resolved tenant context to container
    app()->instance('currentTenant', $tenant);
    
    return $next($request);
}`
    }
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
    images: [
      '/images/dental.png',
      '/images/dental_ss1.png',
      '/images/dental_ss2.png',
      '/images/dental_ss3.png',
      '/images/dental_ss4.png'
    ],
    codeSnippet: {
      language: 'javascript',
      code: `// Atomic Slot Booking with Concurrency Conflict Prevention
export const reserveAppointment = async (req, res) => {
  const { dentistId, slotTime, studentId } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const existing = await Appointment.findOne({
      dentistId,
      slotTime,
      status: { $ne: 'CANCELLED' }
    }).session(session);

    if (existing) {
      await session.abortTransaction();
      return res.status(409).json({ error: 'Slot already reserved by another patient.' });
    }
    
    const record = new Appointment({ dentistId, slotTime, studentId, status: 'CONFIRMED' });
    await record.save({ session });
    await session.commitTransaction();
    res.status(201).json(record);
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};`
    }
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
    images: ['/images/passo.png'],
    codeSnippet: {
      language: 'php',
      code: `// Optimistic Locking & Audit Trail Transaction Handler
public function updateAssessment(UpdateRecordRequest $request, $id)
{
    return DB::transaction(function () use ($request, $id) {
        $record = AssessmentRecord::lockForUpdate()->findOrFail($id);
        
        if ($record->version !== $request->input('version')) {
            throw new ConcurrencyException("Conflict: Record modified by another division.");
        }
        
        $record->fill($request->validated());
        $record->version++;
        $record->last_modified_by = auth()->id();
        $record->save();
        
        AuditLog::recordAction($record, 'ASSESSMENT_UPDATED');
        return response()->json($record);
    });
}`
    }
  }
];
