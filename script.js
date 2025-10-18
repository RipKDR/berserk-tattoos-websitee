// Berserk Tattoos - Main JavaScript File
// Handles navigation, artist switching, forms, and analytics

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(10, 10, 10, 0.98)';
            navLinks.style.padding = '2rem';
            navLinks.style.gap = '1.5rem';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// Artist Navigation (for artists.html)
const artistButtons = document.querySelectorAll('.artist-nav button');
const artistSections = document.querySelectorAll('.artist-section');

if (artistButtons.length > 0) {
    artistButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const artist = btn.dataset.artist;
            
            // Update buttons
            artistButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update sections
            artistSections.forEach(section => {
                section.classList.toggle('active', section.dataset.artist === artist);
            });
            
            // Update URL
            window.history.pushState(null, '', `#${artist}`);
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Handle URL hash on load
    const hash = window.location.hash.substring(1);
    if (hash && ['amelia', 'ben', 'monique'].includes(hash)) {
        const targetBtn = document.querySelector(`[data-artist="${hash}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    }
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// FAQ Accordion (for book.html)
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// Pre-select Artist from URL Parameter (for book.html)
const urlParams = new URLSearchParams(window.location.search);
const artistParam = urlParams.get('artist');
const artistSelect = document.getElementById('artist');

if (artistParam && artistSelect) {
    artistSelect.value = artistParam;
}

// Form Submission Handler (for book.html)
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        // Form will submit to Formspree
        // Show success message after short delay
        setTimeout(() => {
            const successMsg = document.getElementById('success-msg');
            if (successMsg) {
                successMsg.style.display = 'block';
                bookingForm.reset();
                
                // Scroll to success message
                successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 1000);
    });
}

// Analytics Event Tracking (if GA4 is installed)
if (typeof gtag !== 'undefined') {
    
    // Track booking button clicks
    document.querySelectorAll('a[href*="book.html"]').forEach(btn => {
        btn.addEventListener('click', function() {
            gtag('event', 'booking_intent', {
                'location': this.closest('section')?.className || 'unknown',
                'link_text': this.textContent.trim()
            });
        });
    });
    
    // Track artist views
    document.querySelectorAll('a[href*="artists.html"]').forEach(link => {
        link.addEventListener('click', function() {
            const artist = this.href.includes('#') ? 
                this.href.split('#')[1] : 'all';
            gtag('event', 'artist_view', {
                'artist_name': artist
            });
        });
    });
    
    // Track phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'phone_click', {
                'phone_number': this.href.replace('tel:', '')
            });
        });
    });
    
    // Track WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'whatsapp_click', {
                'source': this.closest('section')?.className || 'quick_contact'
            });
        });
    });
    
    // Track scroll depth
    let scrollDepth = 0;
    window.addEventListener('scroll', function() {
        const percent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (percent > scrollDepth && percent % 25 === 0) {
            scrollDepth = percent;
            gtag('event', 'scroll_depth', {
                'percent': percent
            });
        }
    });
    
    // Track engaged users (30+ seconds on site)
    setTimeout(() => {
        gtag('event', 'engaged_user', {
            'time_spent': '30_seconds'
        });
    }, 30000);
}

// Lazy Loading for Images (improves performance)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.style.backgroundImage = `url('${img.dataset.src}')`;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe all elements with data-src attribute
    document.querySelectorAll('[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message for developers
console.log('%cBerserk Tattoos Website', 'font-size: 20px; font-weight: bold; color: #7B1113;');
console.log('%cBuilt for conversion. Optimized for performance.', 'font-size: 14px; color: #999;');
console.log('Questions? Check the documentation folder.');
