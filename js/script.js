// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initProductFilters();

    initScrollAnimations();
    initSmoothScrolling();
    initNavbarScroll();
});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Product Filters
function initProductFilters() {
    // Product filtering for new category-based layout
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categorySections = document.querySelectorAll('.category-section');
    const productCards = document.querySelectorAll('.product-card'); // Legacy support

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Handle new category sections
            categorySections.forEach(section => {
                const sectionCategory = section.getAttribute('data-category');
                
                if (filter === 'all' || sectionCategory === filter) {
                    section.classList.remove('hidden');
                    // Add staggered animation for parts within the section
                    const partItems = section.querySelectorAll('.part-item');
                    partItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.transform = 'translateY(0)';
                            item.style.opacity = '1';
                        }, index * 50);
                    });
                } else {
                    section.classList.add('hidden');
                }
            });

            // Legacy product card support
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                    card.style.transform = 'scale(0.8)';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // Add click-to-inquire functionality for part items
    const partItems = document.querySelectorAll('.part-item');
    partItems.forEach(item => {
        item.addEventListener('click', () => {
            const partName = item.textContent.trim();
            const message = `Hi! I'm interested in: ${partName}. Could you please provide more details about availability and pricing?`;
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Track analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'part_inquiry', {
                    'event_category': 'engagement',
                    'event_label': partName
                });
            }
        });
    });
}



// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.product-card, .about-text, .about-stats, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Utility Functions

// Debounce function for performance
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
}

// Initialize image loading when DOM is ready
document.addEventListener('DOMContentLoaded', initImageLoading);

// Add click tracking for analytics (placeholder)
function trackClick(element, action) {
    // This is where you would integrate with analytics
    console.log(`Clicked: ${element} - Action: ${action}`);
}

// Add click tracking to important elements
document.addEventListener('DOMContentLoaded', function() {
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .call-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            trackClick(this.textContent.trim(), 'CTA Click');
        });
    });
    
    // Track phone number clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackClick('Phone', 'Call Initiated');
        });
    });
    
    // Track WhatsApp clicks
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackClick('WhatsApp', 'WhatsApp Opened');
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could trigger some action
            console.log('Swiped up');
        } else {
            // Swipe down - could trigger some action
            console.log('Swiped down');
        }
    }
}

// Performance optimization: Lazy load content
function initLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const src = element.getAttribute('data-lazy');
                
                if (src) {
                    element.src = src;
                    element.removeAttribute('data-lazy');
                    lazyObserver.unobserve(element);
                }
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add error handling for failed network requests
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // Could show user-friendly error message here
});

// Add online/offline detection
window.addEventListener('online', function() {
    showMessage('Connection restored!', 'success');
});

window.addEventListener('offline', function() {
    showMessage('You are currently offline. Some features may not work.', 'error');
});

// Export functions for potential external use
window.SARefrigeration = {
    showMessage,
    trackClick,
    debounce,
    throttle
};