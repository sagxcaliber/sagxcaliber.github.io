// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-indicator');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-indicator';
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrollPercent + '%';
}

// Navbar background on scroll
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100; // Offset for navbar
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all animatable elements
function setupAnimations() {
    const animatableElements = document.querySelectorAll(
        '.project-card, .skill-item, .stat-item, .contact-link'
    );
    
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation
function initTypeWriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 50);
        }, 1000);
    }
}

// Parallax effect for hero section
function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
}

// Scroll to top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 18px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    `;
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll button
    function toggleScrollButton() {
        if (window.scrollY > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    }
    
    window.addEventListener('scroll', toggleScrollButton);
    document.body.appendChild(scrollButton);
}

// Smooth scroll for CTA buttons
function setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn[href^="#"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add loading animation
function showLoadingComplete() {
    document.body.classList.add('loaded');
    
    // Add loaded class to body for any additional styling
    const style = document.createElement('style');
    style.textContent = `
        body.loaded .hero-content {
            animation: fadeInUp 0.8s ease-out;
        }
        
        body.loaded .hero-image {
            animation: fadeInUp 0.8s ease-out 0.2s both;
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functionality
function init() {
    // Setup animations
    setupAnimations();
    
    // Initialize typing animation
    initTypeWriter();
    
    // Add scroll to top button
    addScrollToTop();
    
    // Setup CTA buttons
    setupCTAButtons();
    
    // Show loading complete
    setTimeout(showLoadingComplete, 100);
}

// Event listeners
window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateNavbar();
    updateActiveNavLink();
    updateParallax();
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle form submissions (if any forms are added later)
function handleFormSubmission(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add form handling logic here
        const formData = new FormData(form);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Message sent successfully!';
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateScrollProgress();
    updateNavbar();
    updateActiveNavLink();
    updateParallax();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Arrow keys for section navigation
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const sections = document.querySelectorAll('section');
        const currentSection = getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        if (currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const sections = document.querySelectorAll('section');
        const currentSection = getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        if (currentIndex > 0) {
            const prevSection = sections[currentIndex - 1];
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Helper function to get current section
function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            return section;
        }
    }
    
    return sections[0]; // Default to first section
}