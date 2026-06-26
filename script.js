/* ===============================================
   CYBERSECURITY PORTFOLIO - JAVASCRIPT
   Interactive Features & Animations
   =============================================== */

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const heroScroll = document.querySelector('.hero-scroll');

// ===============================================
// MOBILE MENU TOGGLE
// ===============================================

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===============================================
// SMOOTH SCROLLING & ACTIVE NAV LINK
// ===============================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===============================================
// SCROLL REVEAL ANIMATIONS
// ===============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===============================================
// PROJECT FILTERING
// ===============================================

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                // Trigger fade-in animation
                setTimeout(() => {
                    card.style.animation = 'fadeInEffect 0.5s ease';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===============================================
// SKILL BARS ANIMATION ON SCROLL
// ===============================================

const skillProgressBars = document.querySelectorAll('.skill-progress');
const skillsSection = document.querySelector('.skills');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillProgressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===============================================
// CONTACT FORM SUBMISSION
// ===============================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Show success message
        showNotification('Thank you for your message! I will get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Here you would typically send the email using a backend service
        // For now, we'll just show a success message
        console.log({
            name,
            email,
            message
        });
    });
}

// ===============================================
// NOTIFICATION SYSTEM
// ===============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff3366' : '#0066ff'};
        color: ${type === 'success' ? '#0a0e27' : '#fff'};
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-weight: 600;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// ===============================================
// BUTTON EVENT LISTENERS
// ===============================================

// Download CV Button
const downloadCVBtn = document.querySelector('.hero-buttons .btn-primary');
if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', () => {
        // In a real scenario, this would download a CV file
        showNotification('CV download will be implemented soon!', 'info');
    });
}

// Contact Me Button
const contactMeBtn = document.querySelector('.hero-buttons .btn-secondary');
if (contactMeBtn) {
    contactMeBtn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// View Certificate Buttons
const viewCertBtns = document.querySelectorAll('.cert-card .btn-small');
viewCertBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        showNotification('Opening certificate...', 'info');
const pdfPath = e.target.getAttribute('data-pdf');
        
        if (pdfPath) {
            window.open(pdfPath, '_blank');
        }
    });
});

// ===============================================
// HERO SCROLL INDICATOR
// ===============================================

if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });

    // Make it fade out when scrolling down
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            heroScroll.style.opacity = '0';
            heroScroll.style.pointerEvents = 'none';
        } else {
            heroScroll.style.opacity = '1';
            heroScroll.style.pointerEvents = 'auto';
        }
    });
}

// ===============================================
// COUNTER ANIMATION FOR STATISTICS
// ===============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===============================================
// DARK MODE / LIGHT MODE TOGGLE (Optional)
// ===============================================

function initThemeToggle() {
    const themeToggle = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', themeToggle);
}

initThemeToggle();

// ===============================================
// CURSOR EFFECT (Optional)
// ===============================================

const createCursorEffect = () => {
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #00ff88;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    `;

    cursorOutline.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid #00ff88;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0.5;
    `;

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX - 4 + 'px';
        cursorDot.style.top = mouseY - 4 + 'px';

        // Smooth animation for cursor outline
        setTimeout(() => {
            cursorOutline.style.left = mouseX - 15 + 'px';
            cursorOutline.style.top = mouseY - 15 + 'px';
        }, 100);
    });

    // Hide cursor when not moving
    let cursorTimeout;
    document.addEventListener('mousemove', () => {
        clearTimeout(cursorTimeout);
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '0.5';

        cursorTimeout = setTimeout(() => {
            cursorDot.style.opacity = '0.3';
            cursorOutline.style.opacity = '0.2';
        }, 3000);
    });

    // Disable custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
        cursorDot.remove();
        cursorOutline.remove();
    }
};

// Uncomment to enable custom cursor
// createCursorEffect();

// ===============================================
// PERFORMANCE OPTIMIZATION
// ===============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===============================================
// KEYBOARD SHORTCUTS
// ===============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (can be used for navigation)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }

    // Esc to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===============================================
// LOADING ANIMATION
// ===============================================

window.addEventListener('load', () => {
    // Remove loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }

    // Animate elements on page load
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// ===============================================
// RESPONSIVE CHECKS
// ===============================================

function handleResponsive() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    if (isMobile) {
        // Disable some animations on mobile for better performance
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            if (!el.classList.contains('essential-animation')) {
                el.style.animationDuration = '0.3s';
            }
        });
    }
}

handleResponsive();
window.addEventListener('resize', handleResponsive);

// ===============================================
// INITIALIZATION
// ===============================================

console.log('Portfolio loaded successfully! 🎉');
