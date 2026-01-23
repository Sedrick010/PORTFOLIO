document.addEventListener('DOMContentLoaded', () => {
    // --- 1. PRELOADER LOGIC ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // --- 2. MOBILE MENU ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- 3. SCROLL SPY ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 4. SCROLL REVEAL ANIMATION ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => revealObserver.observe(el));

    // --- 5. PORTFOLIO FILTER LOGIC ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.portfolio-card');

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
                        card.classList.add('show');
                    } else {
                        card.classList.add('hide');
                        card.classList.remove('show');
                    }
                });
            });
        });
    }
});

// --- HELPER FUNCTIONS (Better Scroll Lock) ---
function lockScroll() { 
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden'; 
}
function unlockScroll() { 
    document.body.style.overflow = ''; 
    document.documentElement.style.overflow = ''; 
}

// --- PROJECT DATA ---
const projects = {
    'vet': {
        category: 'web', 
        title: "Vet Clinic Management System",
        role: "Lead Backend Developer",
        problem: "Local veterinary clinics were relying on manual paper-based records. This caused slow patient retrieval times, frequent scheduling conflicts, and lost medical history data.",
        solution: "We built a multi-tenant web system to digitize the entire clinic workflow. The solution centralizes patient records, automates appointment booking with conflict detection, and tracks inventory levels in real-time.",
        features: [
            "Multi-tenant architecture for multiple clinics",
            "Subscription-based access",
            "Role-based dashboards (Admin, Clinics)"
        ],
        tech: ["PHP (Laravel)", "MySQL", "Blade", "Tailwind CSS"],
        link: "https://github.com/Sedrick010/Vet-Clinic-Management-System/tree/INTEGRATION",
        images: ["images/vet.png", "images/vet_ss1.png", "images/vet_ss2.png"] 
    },
    'dental': {
        category: 'web',
        title: "Unicare Dental System",
        role: "Full Stack Developer",
        problem: "The university dental clinic struggled with appointment setting and digital inventory tracking. They needed a way to handle online bookings and track inventory without using paper records.",
        solution: "Developed a secure, web-based management system. The system allows patients to book appointments online, while admins can manage schedules and monitor inventory levels digitally.",
        features: [
            "Role-based Access Control",
            "PDF Report Generation",
            "Google Services Integration"
        ],
        tech: ["MongoDB", "Express JS", "React", "Node.js"],
        link: "https://github.com/JhonLesterY/20241_T145_Dental-Clinic-Management-System",
        images: ["images/dental.png", "images/dental_ss1.png", "images/dental_ss2.png", "images/dental_ss3.png", "images/dental_ss4.png"]
    },
    'innovaride': {
        category: 'uiux',
        title: "Innovaride Prototype",
        role: "Co-Designer",
        problem: "Commuters in Malaybalay face anxiety and delays due to unpredictable transportation schedules and a lack of clear route information.",
        solution: "Designed a high-fidelity mobile application prototype that solves the information gap. The design provides real-time vehicle tracking and clear route visualization to reduce commuter uncertainty.",
        features: [
            "User-Centric Journey Mapping",
            "High-Fidelity Interactive Mockups",
            "Accessibility-First Design System"
        ],
        tech: ["Figma"],
        link: "https://www.figma.com/design/JAbo8Li14NcL9aaTNNsVwC/InnovaRide--Efficient-Transportation",
        images: ["images/innovaride.png", "images/innovaride_ss1.png", "images/innovaride_ss2.png"]
    }
};

// --- MODAL FUNCTIONS ---

function openProject(projectId) {
    const project = projects[projectId];
    if (!project) return;

    // 1. Text Content
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectRole').textContent = project.role;
    document.getElementById('projectProblem').textContent = project.problem;
    document.getElementById('projectSolution').textContent = project.solution;
    
    const actionBtn = document.getElementById('projectLinkBtn');
    
    if (actionBtn) {
        actionBtn.href = project.link;
        
        if (project.category === 'uiux') {
            actionBtn.innerHTML = `<i class='bx bxl-figma btn-icon'></i> View Design`; 
        } else {
            actionBtn.innerHTML = `<i class='bx bxl-github btn-icon'></i> View Repository`; 
        }
    }

    // 3. Features List
    const featureList = document.getElementById('projectFeatures');
    featureList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featureList.appendChild(li);
    });

    // 4. Tech Stack
    const techContainer = document.getElementById('projectTech');
    techContainer.innerHTML = ''; 
    project.tech.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = tech;
        techContainer.appendChild(span);
    });

    // 5. Images
    const mainImg = document.getElementById('projectMainImg');
    const thumbContainer = document.getElementById('projectThumbnails');
    mainImg.src = project.images[0] || ""; 
    thumbContainer.innerHTML = ''; 

    project.images.forEach((imgSrc) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.className = 'thumb';
        thumb.onclick = function() {
            mainImg.src = imgSrc;
            document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active-thumb'));
            thumb.classList.add('active-thumb');
        };
        thumbContainer.appendChild(thumb);
    });

    // 6. Show Modal
    const modal = document.getElementById("projectModal");
    modal.style.display = "flex";
    lockScroll();
}

function closeProject() {
    document.getElementById("projectModal").style.display = "none";
    unlockScroll();
}

function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    if (modal && modalImg) {
        modal.style.display = "flex"; 
        modalImg.src = imageSrc;
        lockScroll();
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
        unlockScroll();
    }
}

function openCV() {
    const modal = document.getElementById("cvModal");
    if (modal) {
        modal.style.display = "flex";
        lockScroll();
    }
}

function closeCV() {
    const modal = document.getElementById("cvModal");
    if (modal) {
        modal.style.display = "none";
        unlockScroll();
    }
}

window.onclick = function(event) {
    const imgModal = document.getElementById("imageModal");
    const cvModal = document.getElementById("cvModal");
    const projectModal = document.getElementById("projectModal");
    
    if (event.target == imgModal) { closeModal(); }
    if (event.target == cvModal) { closeCV(); }
    if (event.target == projectModal) { closeProject(); }
}

// --- CONTACT FUNCTIONS ---
function copyEmail() {
    const email = "2201103327@student.buksu.edu.ph";
    
    // Method 1: Modern API (Works on live websites/HTTPS)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showToast("Email copied to clipboard! 📧");
        }).catch(err => {
            console.error('Async copy failed, trying fallback', err);
            fallbackCopy(email);
        });
    } else {
        // Method 2: Fallback (Works on local files/file://)
        fallbackCopy(email);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Ensure it's not visible but part of the DOM
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast("Email copied to clipboard! 📧");
        } else {
            prompt("Press Ctrl+C to copy email:", text);
        }
    } catch (err) {
        console.error('Fallback copy failed', err);
        prompt("Press Ctrl+C to copy email:", text);
    }
    
    document.body.removeChild(textArea);
}

function showToast(message) {
    let container = document.getElementById('toast-container');
    
    // Safety check: Create container if missing
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`; 
    
    container.appendChild(toast);
    
    // Animation timing
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400); 
    }, 3000);
}