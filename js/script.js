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

    // --- 3. SCROLL ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden-section');
    hiddenElements.forEach((el) => observer.observe(el));
});

// --- HELPER FUNCTIONS FOR SCROLL LOCKING ---
function lockScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden'; // Locks HTML for mobile support
}

function unlockScroll() {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
}

// --- 4. IMAGE MODAL (Certificates) ---
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    
    if (modal && modalImg) {
        modal.style.display = "flex"; 
        modalImg.src = imageSrc;
        lockScroll(); // <--- FREEZES BACKGROUND
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
        unlockScroll(); // <--- UNFREEZES BACKGROUND
    }
}

// --- 5. CV MODAL (Resume) ---
function openCV() {
    // Mobile Check: Open PDF in new tab on phones (better readability)
    if (window.innerWidth < 768) {
        // Change 'resume.pdf' to your actual file name if different
        window.open('resume.pdf', '_blank'); 
        return;
    }

    const modal = document.getElementById("cvModal");
    if (modal) {
        modal.style.display = "flex";
        lockScroll(); // <--- FREEZES BACKGROUND
    }
}

function closeCV() {
    const modal = document.getElementById("cvModal");
    if (modal) {
        modal.style.display = "none";
        unlockScroll(); // <--- UNFREEZES BACKGROUND
    }
}

// --- 6. CLOSE ON CLICK OUTSIDE ---
window.onclick = function(event) {
    const imgModal = document.getElementById("imageModal");
    const cvModal = document.getElementById("cvModal");
    
    if (event.target == imgModal) {
        imgModal.style.display = "none";
        unlockScroll();
    }
    
    if (event.target == cvModal) {
        cvModal.style.display = "none";
        unlockScroll();
    }
}

// --- 7. TOAST NOTIFICATIONS ---
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✨</span> ${message}`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (container.contains(toast)) {
                container.removeChild(toast);
            }
        }, 400);
    }, 3000);
}