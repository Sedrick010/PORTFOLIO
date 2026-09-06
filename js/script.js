document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MOBILE NAVIGATION TOGGLE ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- 2. SCROLL SPY ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // --- 3. SCROLL REVEAL ANIMATIONS ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    // --- 4. TYPING TEXT ANIMATION ---
    const typingTarget = document.querySelector('[data-typing]');
    const typingCaret = document.querySelector('.typing-caret');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typingTarget) {
        const fullText = typingTarget.getAttribute('data-typing') || 'Software Engineer & Full-Stack Developer';

        if (prefersReducedMotion) {
            typingTarget.textContent = fullText;
            if (typingCaret) typingCaret.style.display = 'none';
        } else {
            let index = 0;
            let isDeleting = false;

            const typeLoop = () => {
                typingTarget.textContent = fullText.substring(0, index);

                if (!isDeleting && index < fullText.length) {
                    index += 1;
                    setTimeout(typeLoop, 65);
                } else if (!isDeleting && index === fullText.length) {
                    isDeleting = true;
                    setTimeout(typeLoop, 2200);
                } else if (isDeleting && index > 0) {
                    index -= 1;
                    setTimeout(typeLoop, 35);
                } else {
                    isDeleting = false;
                    setTimeout(typeLoop, 600);
                }
            };

            typeLoop();
        }
    }

    // --- 5. EMBLA CAROUSEL INITIALIZATION ---
    const emblaNode = document.querySelector('.embla');
    let emblaApi = null;

    if (emblaNode && window.EmblaCarousel) {
        const viewportNode = emblaNode.querySelector('.embla__viewport');
        const prevBtn = emblaNode.querySelector('.embla__prev');
        const nextBtn = emblaNode.querySelector('.embla__next');
        const dotsContainer = emblaNode.querySelector('.embla__dots');

        const options = { loop: false, align: 'start', dragFree: true, containScroll: 'trimSnaps' };
        emblaApi = EmblaCarousel(viewportNode, options);

        if (dotsContainer) {
            const updateDots = () => {
                dotsContainer.innerHTML = '';
                const scrollSnaps = emblaApi.scrollSnapList();
                scrollSnaps.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.classList.add('embla-dot');
                    if (index === emblaApi.selectedScrollSnap()) {
                        dot.classList.add('is-active');
                    }
                    dot.addEventListener('click', () => emblaApi.scrollTo(index));
                    dotsContainer.appendChild(dot);
                });
            };

            emblaApi.on('select', updateDots);
            emblaApi.on('init', updateDots);
            emblaApi.on('reInit', updateDots);
        }

        if (prevBtn) prevBtn.addEventListener('click', () => emblaApi.scrollPrev());
        if (nextBtn) nextBtn.addEventListener('click', () => emblaApi.scrollNext());
    }

    // --- 6. PORTFOLIO FILTER LOGIC ---
    const filterBtns = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });

                if (emblaApi) {
                    emblaApi.reInit();
                }
            });
        });
    }

    // --- 7. GLOBAL ESCAPE KEY MODAL HANDLER ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
});

// --- HELPER FUNCTIONS ---
function lockScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
}

function unlockScroll() {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
        modal.style.display = 'none';
    });
    unlockScroll();
}

// --- PROJECT DATA (HIGH-SIGNAL SOFTWARE ENGINEERING CASE STUDIES) ---
const projects = {
    'vet': {
        category: 'web',
        title: "Vet Clinic Management System",
        role: "Lead Backend Developer & System Architect",
        badges: ["Multi-Tenant Architecture", "Live Enterprise"],
        problem: "Local veterinary practices relied on fragmented paper ledgers and isolated spreadsheets. This caused patient record retrieval delays exceeding 15 minutes, scheduling collisions, lost immunization records, and zero multi-branch inventory tracking.",
        architecture: "Multi-tenant Laravel 10 backend with dynamic database tenant isolation, MySQL connection switching per tenant request, and Redis caching. Frontend built with responsive Blade components and Tailwind CSS.",
        features: [
            "Tenant-isolated schema design ensuring strict tenant data separation and security",
            "Granular Role-Based Access Control (SuperAdmin, Clinic Staff, Veterinarians)",
            "Automated clinical history tracking, prescription auditing, and PDF invoicing",
            "Real-time appointment scheduling with calendar conflict prevention"
        ],
        tech: ["Laravel", "MySQL", "PHP", "Tailwind CSS", "Redis", "REST APIs"],
        link: "https://github.com/Sedrick010/Vet-Clinic-Management-System/tree/INTEGRATION",
        images: ["images/vet.png", "images/vet_ss1.png", "images/vet_ss2.png"],
        codeSnippet: `// Dynamic Multi-Tenant Database Connection Middleware
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
    },
    'dental': {
        category: 'web',
        title: "Unicare Dental Clinic System",
        role: "Full-Stack Software Engineer",
        badges: ["Clinical Workflow", "Open Source"],
        problem: "The Bukidnon State University Dental Clinic faced severe manual bottlenecks: paper-based queue sheets, lost treatment cards, and zero digital tracking for medical consumables across hundreds of student visits each term.",
        architecture: "Full-stack MERN (MongoDB, Express.js, React.js, Node.js) architecture with JWT authentication, role-segregated API endpoints, and server-side PDF audit report generation.",
        features: [
            "Digital patient appointment queue with real-time slot conflict resolution",
            "Encrypted longitudinal dental charting and procedure histories",
            "Live consumable inventory tracking with automated low-stock warnings",
            "Institutional RBAC protecting student health data in compliance with privacy guidelines"
        ],
        tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],
        link: "https://github.com/JhonLesterY/20241_T145_Dental-Clinic-Management-System",
        images: ["images/dental.png", "images/dental_ss1.png", "images/dental_ss2.png", "images/dental_ss3.png", "images/dental_ss4.png"],
        codeSnippet: `// Atomic Slot Booking with Concurrency Conflict Prevention
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
    },
    'passo': {
        category: 'web',
        title: "PAssO Enterprise File Management",
        role: "Co-Developer & Systems Architect",
        badges: ["Concurrency Control", "Private Enterprise"],
        problem: "The Provincial Assessor's Office (PAssO) coordinated real property assessments across four separate departmental divisions manually, leading to document routing bottlenecks, accidental overwrite conflicts, and missing dossiers.",
        architecture: "Laravel backend engine coupled with TypeScript/React components, MySQL relational indexing, optimistic record locking, and Laragon staging infrastructure.",
        features: [
            "Strict row-level concurrency locks preventing inter-division document collision",
            "Automated real property tax computation algorithms adhering to provincial valuation guidelines",
            "Centralized document workflow routing across all 4 departmental divisions",
            "Tamper-evident audit trails recording all document state changes"
        ],
        tech: ["Laravel", "React.js", "TypeScript", "MySQL", "Laragon", "REST APIs"],
        link: "",
        images: ["images/passo.png"],
        codeSnippet: `// Optimistic Locking & Audit Trail Transaction Handler
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
};

// --- MODAL FUNCTIONS ---
function openProject(projectId) {
    const project = projects[projectId];
    if (!project) return;

    // Content Population
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectRole').textContent = project.role;
    document.getElementById('projectProblem').textContent = project.problem;
    document.getElementById('projectArchitecture').textContent = project.architecture;

    // Action Button
    const actionContainer = document.getElementById('projectModalActions');
    if (actionContainer) {
        if (project.link) {
            actionContainer.innerHTML = `
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    View Source Repository
                </a>
            `;
        } else {
            actionContainer.innerHTML = `
                <div class="metadata-badge" style="background: rgba(255,255,255,0.05); padding: 10px 18px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    Private Enterprise Repository (Protected Institutional IP)
                </div>
            `;
        }
    }

    // Code Snippet
    const snippetWrapper = document.getElementById('codeSnippetWrapper');
    const snippetCode = document.getElementById('projectSnippet');
    if (snippetWrapper && snippetCode) {
        if (project.codeSnippet) {
            snippetWrapper.style.display = 'block';
            snippetCode.textContent = project.codeSnippet;
            snippetCode.removeAttribute('data-highlighted');
            if (window.hljs) hljs.highlightElement(snippetCode);
        } else {
            snippetWrapper.style.display = 'none';
        }
    }

    // Features List
    const featureList = document.getElementById('projectFeatures');
    if (featureList) {
        featureList.innerHTML = '';
        project.features.forEach(feat => {
            const li = document.createElement('li');
            li.textContent = feat;
            featureList.appendChild(li);
        });
    }

    // Tech Stack
    const techContainer = document.getElementById('projectTech');
    if (techContainer) {
        techContainer.innerHTML = '';
        project.tech.forEach(t => {
            const span = document.createElement('span');
            span.className = 'skill-pill';
            span.textContent = t;
            techContainer.appendChild(span);
        });
    }

    // Image Gallery
    const mainImg = document.getElementById('projectMainImg');
    const thumbContainer = document.getElementById('projectThumbnails');
    if (mainImg && project.images && project.images.length > 0) {
        mainImg.src = project.images[0];
    }
    if (thumbContainer && project.images) {
        thumbContainer.innerHTML = '';
        project.images.forEach((imgSrc, i) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.className = `modal-thumb ${i === 0 ? 'active' : ''}`;
            thumb.alt = `${project.title} preview ${i + 1}`;
            thumb.onclick = () => {
                mainImg.src = imgSrc;
                thumbContainer.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            };
            thumbContainer.appendChild(thumb);
        });
    }

    // Open Modal
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'flex';
        requestAnimationFrame(() => modal.classList.add('active'));
        lockScroll();
    }
}

function closeProject() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            unlockScroll();
        }, 200);
    }
}

function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modal.style.display = 'flex';
        requestAnimationFrame(() => modal.classList.add('active'));
        lockScroll();
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            unlockScroll();
        }, 200);
    }
}

function openCV() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.style.display = 'flex';
        requestAnimationFrame(() => modal.classList.add('active'));
        lockScroll();
    }
}

function closeCV() {
    const modal = document.getElementById('cvModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            unlockScroll();
        }, 200);
    }
}

// Click outside modal to close
window.onclick = function(e) {
    if (e.target.classList.contains('modal')) {
        closeAllModals();
    }
};

// --- CONTACT & CLIPBOARD COPY ---
const PRIMARY_EMAIL = "sedrickcamiguing.dev@gmail.com";

function copyEmail() {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(PRIMARY_EMAIL)
            .then(() => showToast(`Copied ${PRIMARY_EMAIL} to clipboard! 📋`))
            .catch(() => fallbackCopy(PRIMARY_EMAIL));
    } else {
        fallbackCopy(PRIMARY_EMAIL);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showToast(`Copied ${PRIMARY_EMAIL} to clipboard! 📋`);
    } catch (err) {
        showToast(`Email: ${PRIMARY_EMAIL}`);
    }
    document.body.removeChild(textArea);
}

function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3200);
}