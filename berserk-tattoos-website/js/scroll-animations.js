/**
 * Scroll Animations
 * Reveal animations triggered by scroll position
 * Uses Intersection Observer for performance
 */

class ScrollAnimations {
  constructor(options = {}) {
    this.options = {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
      animationDelay: 100,
      ...options
    };

    this.observer = null;
    this.elements = [];
    this.init();
  }

  init() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Create observer
    this.createObserver();

    // Find and observe elements
    this.observeElements();

    // Setup parallax effects
    this.setupParallax();

    // Setup scroll progress indicator
    this.setupScrollProgress();

  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, {
      threshold: this.options.threshold,
      rootMargin: this.options.rootMargin
    });
  }

  observeElements() {
    // Default selectors
    const selectors = [
      '.fade-in',
      '.slide-up',
      '.slide-in-left',
      '.slide-in-right',
      '.scale-in',
      '.portfolio-item',
      '.artist-card',
      '.sidebar-card',
      '.form-section',
      '.booking-hero',
      'section'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        // Add animation class if not already present
        if (!el.classList.contains('animate')) {
          el.classList.add('animate');
          el.style.opacity = '0';
          el.style.transform = this.getInitialTransform(el);
        }

        // Store element with delay
        this.elements.push({
          element: el,
          delay: index * this.options.animationDelay
        });

        // Observe element
        this.observer.observe(el);
      });
    });

    // Add animation styles
    this.addAnimationStyles();
  }

  getInitialTransform(element) {
    if (element.classList.contains('slide-up')) {
      return 'translateY(40px)';
    } else if (element.classList.contains('slide-in-left')) {
      return 'translateX(-40px)';
    } else if (element.classList.contains('slide-in-right')) {
      return 'translateX(40px)';
    } else if (element.classList.contains('scale-in')) {
      return 'scale(0.9)';
    }
    return 'translateY(20px)';
  }

  animateElement(element) {
    const elementData = this.elements.find(e => e.element === element);
    const delay = elementData ? elementData.delay : 0;

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

      // Unobserve after animation
      this.observer.unobserve(element);
    }, delay);
  }

  addAnimationStyles() {
    if (document.getElementById('scroll-animation-styles')) return;

    const style = document.createElement('style');
    style.id = 'scroll-animation-styles';
    style.textContent = `
            .animate {
                will-change: opacity, transform;
            }

            /* Stagger animation for children */
            .stagger-children > * {
                opacity: 0;
                transform: translateY(20px);
            }

            .stagger-children.animated > * {
                animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }

            .stagger-children.animated > *:nth-child(1) { animation-delay: 0s; }
            .stagger-children.animated > *:nth-child(2) { animation-delay: 0.1s; }
            .stagger-children.animated > *:nth-child(3) { animation-delay: 0.2s; }
            .stagger-children.animated > *:nth-child(4) { animation-delay: 0.3s; }
            .stagger-children.animated > *:nth-child(5) { animation-delay: 0.4s; }
            .stagger-children.animated > *:nth-child(6) { animation-delay: 0.5s; }

            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Parallax elements */
            .parallax {
                will-change: transform;
            }
        `;
    document.head.appendChild(style);
  }

  setupParallax() {
    const parallaxElements = document.querySelectorAll('.parallax, [data-parallax]');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateParallax(parallaxElements);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  updateParallax(elements) {
    const scrollY = window.pageYOffset;

    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const viewportHeight = window.innerHeight;

      // Only calculate if element is in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
        const offset = (scrollY - elementTop + viewportHeight) * speed;

        element.style.transform = `translateY(${offset}px)`;
      }
    });
  }

  setupScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--color-accent), var(--color-accent-light));
            width: 0%;
            z-index: 9999;
            transition: width 0.1s ease-out;
            box-shadow: 0 0 10px var(--color-accent-alpha-50);
        `;

    document.body.appendChild(progressBar);

    // Update progress on scroll
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = (window.pageYOffset / scrollHeight) * 100;
          progressBar.style.width = `${scrolled}%`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Public method to manually trigger animation
  animateNow(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => this.animateElement(el));
  }

  // Public method to destroy observer
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.scrollAnimations = new ScrollAnimations();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollAnimations;
}

