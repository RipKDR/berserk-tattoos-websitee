/**
 * Micro-Interactions
 * Subtle animations and interactions for enhanced user experience
 * Professional, refined, and performance-optimized
 */

class MicroInteractions {
  constructor() {
    this.init();
  }

  init() {
    // Initialize all micro-interactions
    this.setupButtonRipples();
    this.setupMagneticElements();
    this.setupCardTilts();
    this.setupFormFeedback();
    this.setupScrollHints();
    this.setupLoadingStates();
    this.setupSuccessAnimations();

  }

  // Button ripple effect
  setupButtonRipples() {
    const buttons = document.querySelectorAll('button, .btn, .submit-btn, .wizard-btn');

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                `;

        // Ensure button has position relative
        if (getComputedStyle(button).position === 'static') {
          button.style.position = 'relative';
        }

        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add ripple animation CSS
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  }

  // Magnetic effect for interactive elements
  setupMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic, .artist-card, .nav-links a');

    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const moveX = x * 0.15;
        const moveY = y * 0.15;

        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
      });
    });
  }

  // 3D tilt effect for cards
  setupCardTilts() {
    const cards = document.querySelectorAll('.artist-card, .portfolio-item, .sidebar-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return;
        }

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // Enhanced form feedback
  setupFormFeedback() {
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      // Focus animation
      input.addEventListener('focus', () => {
        this.createFocusRing(input);
      });

      // Success feedback
      input.addEventListener('blur', () => {
        if (input.value && input.checkValidity()) {
          this.showSuccessCheck(input);
        }
      });

      // Real-time validation feedback
      input.addEventListener('input', () => {
        if (input.value) {
          this.validateInputRealtime(input);
        }
      });
    });
  }

  createFocusRing(element) {
    const ring = document.createElement('div');
    ring.className = 'focus-ring';
    ring.style.cssText = `
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            border: 2px solid var(--color-accent);
            border-radius: 4px;
            pointer-events: none;
            animation: focusRing 0.3s ease-out;
            opacity: 0.3;
        `;

    const parent = element.parentElement;
    if (parent && getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
    }

    parent.appendChild(ring);

    element.addEventListener('blur', () => {
      ring.remove();
    }, { once: true });

    // Add animation CSS
    if (!document.getElementById('focus-ring-styles')) {
      const style = document.createElement('style');
      style.id = 'focus-ring-styles';
      style.textContent = `
                @keyframes focusRing {
                    from {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 0.3;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  }

  showSuccessCheck(input) {
    const check = document.createElement('span');
    check.textContent = '✓';
    check.style.cssText = `
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%) scale(0);
            color: var(--color-success);
            font-weight: bold;
            animation: successPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        `;

    const parent = input.parentElement;
    if (parent && getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
    }

    // Remove existing checks
    const existingCheck = parent.querySelector('.success-check');
    if (existingCheck) existingCheck.remove();

    check.className = 'success-check';
    parent.appendChild(check);

    // Add animation CSS
    if (!document.getElementById('success-pop-styles')) {
      const style = document.createElement('style');
      style.id = 'success-pop-styles';
      style.textContent = `
                @keyframes successPop {
                    0% {
                        transform: translateY(-50%) scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: translateY(-50%) scale(1.2);
                    }
                    100% {
                        transform: translateY(-50%) scale(1);
                        opacity: 1;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  }

  validateInputRealtime(input) {
    // Remove existing feedback
    const parent = input.parentElement;
    const existingFeedback = parent.querySelector('.validation-feedback');
    if (existingFeedback) existingFeedback.remove();

    if (!input.checkValidity() && input.value) {
      input.style.borderColor = 'var(--color-error)';
    } else {
      input.style.borderColor = '';
    }
  }

  // Scroll hints
  setupScrollHints() {
    const scrollHints = document.querySelectorAll('.scroll-indicator, [data-scroll-hint]');

    scrollHints.forEach(hint => {
      // Animate scroll hint
      hint.style.animation = 'bounce 2s infinite';
    });

    // Hide scroll hints after user scrolls
    let scrolled = false;
    window.addEventListener('scroll', () => {
      if (!scrolled && window.scrollY > 100) {
        scrolled = true;
        scrollHints.forEach(hint => {
          hint.style.opacity = '0';
          hint.style.transition = 'opacity 0.3s ease-out';
        });
      }
    }, { once: true });
  }

  // Loading states
  setupLoadingStates() {
    // Add loading state to any element with data-loading attribute
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-loading]');
      if (target) {
        this.showLoadingState(target);
      }
    });
  }

  showLoadingState(element) {
    const originalContent = element.innerHTML;
    const originalWidth = element.offsetWidth;

    element.style.width = `${originalWidth}px`;
    element.disabled = true;
    element.style.position = 'relative';
    element.innerHTML = `
            <span style="opacity: 0;">${originalContent}</span>
            <span style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
                <span class="loading-dots">
                    <span style="animation: loadingDot 1.4s infinite; animation-delay: 0s;">•</span>
                    <span style="animation: loadingDot 1.4s infinite; animation-delay: 0.2s;">•</span>
                    <span style="animation: loadingDot 1.4s infinite; animation-delay: 0.4s;">•</span>
                </span>
            </span>
        `;

    // Add loading animation CSS
    if (!document.getElementById('loading-dot-styles')) {
      const style = document.createElement('style');
      style.id = 'loading-dot-styles';
      style.textContent = `
                @keyframes loadingDot {
                    0%, 60%, 100% {
                        opacity: 0.3;
                        transform: scale(0.8);
                    }
                    30% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .loading-dots span {
                    display: inline-block;
                    margin: 0 2px;
                }
            `;
      document.head.appendChild(style);
    }
  }

  // Success animations
  setupSuccessAnimations() {
    // Observe elements with data-success attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-success') {
          const element = mutation.target;
          if (element.dataset.success === 'true') {
            this.playSuccessAnimation(element);
          }
        }
      });
    });

    document.querySelectorAll('[data-success]').forEach((element) => {
      observer.observe(element, { attributes: true });
    });
  }

  playSuccessAnimation(element) {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(16, 185, 129, 0.1);
            pointer-events: none;
            animation: successFlash 0.6s ease-out;
            z-index: 9999;
        `;

    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.remove();
    }, 600);

    // Add success flash animation
    if (!document.getElementById('success-flash-styles')) {
      const style = document.createElement('style');
      style.id = 'success-flash-styles';
      style.textContent = `
                @keyframes successFlash {
                    0% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  }

  // Public method to trigger success animation
  triggerSuccess(message = 'Success!') {
    const notification = document.createElement('div');
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.4s ease-in';
      setTimeout(() => notification.remove(), 400);
    }, 3000);

    // Add slide animations
    if (!document.getElementById('slide-notification-styles')) {
      const style = document.createElement('style');
      style.id = 'slide-notification-styles';
      style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.microInteractions = new MicroInteractions();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MicroInteractions;
}

