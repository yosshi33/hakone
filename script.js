// Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
let menuOpen = false;

function toggleMobileMenu() {
    menuOpen = !menuOpen;
    
    if (menuOpen) {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger to X
        mobileMenuToggle.children[0].style.transform = 'rotate(45deg) translateY(8px)';
        mobileMenuToggle.children[1].style.opacity = '0';
        mobileMenuToggle.children[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Animate X back to hamburger
        mobileMenuToggle.children[0].style.transform = '';
        mobileMenuToggle.children[1].style.opacity = '';
        mobileMenuToggle.children[2].style.transform = '';
    }
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (menuOpen) {
            toggleMobileMenu();
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
    
    // Schedule cards
    document.querySelectorAll('.schedule-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Info cards
    document.querySelectorAll('.info-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroBg && heroContent) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
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

// Add hover effect to timeline items
document.querySelectorAll('.timeline-content').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Dynamic date update
function updateDates() {
    const today = new Date();
    const tripStart = new Date('2024-09-14');
    const daysUntilTrip = Math.ceil((tripStart - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilTrip > 0 && daysUntilTrip < 30) {
        const countdownElement = document.createElement('div');
        countdownElement.className = 'countdown-banner';
        countdownElement.innerHTML = `<p>あと${daysUntilTrip}日で旅行です！✨</p>`;
        countdownElement.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            font-weight: 600;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 100;
            animation: slideInRight 0.5s ease;
        `;
        document.body.appendChild(countdownElement);
    }
}

updateDates();

// Add CSS animation for countdown
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Touch events for mobile gallery
let touchStartX = 0;
let touchEndX = 0;

document.querySelectorAll('.gallery-grid').forEach(gallery => {
    gallery.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    gallery.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(gallery);
    });
});

function handleSwipe(gallery) {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        gallery.scrollLeft += 300;
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        gallery.scrollLeft -= 300;
    }
}

// Lazy loading for images (performance optimization)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.card-image, .gallery-image').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });
}