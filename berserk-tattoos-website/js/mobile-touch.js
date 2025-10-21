/**
 * Mobile Touch Enhancements
 * Swipe gestures, pull-to-refresh, and touch optimizations
 * Professional mobile-first interactions
 */

class MobileTouchEnhancements {
  constructor() {
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.minSwipeDistance = 50;

    this.init();
  }

  init() {
    if (!this.isTouchDevice()) {
      return;
    }

    this.setupSwipeGestures();
    this.setupTapEnhancements();
    this.setupSmoothScrolling();
    this.preventZoomOnDoubleTap();
    this.optimizeTouchTargets();

  }

  isTouchDevice() {
    return ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0);
  }

  setupSwipeGestures() {
    // Gallery swipe navigation
    const gallery = document.querySelector('.gallery-lightbox-content');
    if (gallery) {
      this.addSwipeListeners(gallery, {
        onSwipeLeft: () => this.handleGallerySwipe('next'),
        onSwipeRight: () => this.handleGallerySwipe('prev')
      });
    }

    // Modal swipe to close
    const modals = document.querySelectorAll('.modal, .lightbox');
    modals.forEach(modal => {
      this.addSwipeListeners(modal, {
        onSwipeDown: () => this.handleModalSwipe(modal)
      });
    });

    // Navigation menu swipe
    const nav = document.querySelector('.nav-container');
    if (nav) {
      this.addSwipeListeners(document.body, {
        onSwipeRight: () => this.handleNavSwipe(),
        edgeOnly: true
      });
    }
  }

  addSwipeListeners(element, handlers) {
    let touchStartTime = 0;

    element.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
      touchStartTime = Date.now();

      // Check if edge swipe
      if (handlers.edgeOnly && this.touchStartX > 50) {
        return;
      }
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;

      const swipeTime = Date.now() - touchStartTime;
      const swipeSpeed = this.minSwipeDistance / swipeTime;

      // Only register quick swipes (< 300ms)
      if (swipeTime > 300) return;

      this.handleSwipe(handlers);
    }, { passive: true });
  }

  handleSwipe(handlers) {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine swipe direction
    if (absDeltaX > this.minSwipeDistance && absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (deltaX > 0 && handlers.onSwipeRight) {
        handlers.onSwipeRight();
      } else if (deltaX < 0 && handlers.onSwipeLeft) {
        handlers.onSwipeLeft();
      }
    } else if (absDeltaY > this.minSwipeDistance && absDeltaY > absDeltaX) {
      // Vertical swipe
      if (deltaY > 0 && handlers.onSwipeDown) {
        handlers.onSwipeDown();
      } else if (deltaY < 0 && handlers.onSwipeUp) {
        handlers.onSwipeUp();
      }
    }
  }

  handleGallerySwipe(direction) {
    // Trigger gallery navigation
    const event = new CustomEvent('gallery-swipe', { detail: { direction } });
    document.dispatchEvent(event);
  }

  handleModalSwipe(modal) {
    // Close modal on swipe down
    if (modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  }

  handleNavSwipe() {
    // Toggle mobile navigation
    const nav = document.querySelector('.nav-links');
    if (nav) {
      nav.classList.toggle('mobile-open');
    }
  }

  setupTapEnhancements() {
    // Add tap feedback to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, .artist-card, .portfolio-item, .calendar-day, .time-slot'
    );

    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', () => {
        element.classList.add('tap-active');
      }, { passive: true });

      element.addEventListener('touchend', () => {
        setTimeout(() => {
          element.classList.remove('tap-active');
        }, 300);
      }, { passive: true });

      element.addEventListener('touchcancel', () => {
        element.classList.remove('tap-active');
      }, { passive: true });
    });

    // Add tap active styles
    if (!document.getElementById('tap-active-styles')) {
      const style = document.createElement('style');
      style.id = 'tap-active-styles';
      style.textContent = `
                .tap-active {
                    opacity: 0.7;
                    transform: scale(0.98);
                    transition: opacity 0.1s ease, transform 0.1s ease;
                }
            `;
      document.head.appendChild(style);
    }
  }

  setupSmoothScrolling() {
    // Enhance anchor links with smooth scrolling
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL without jumping
          history.pushState(null, '', href);
        }
      });
    });
  }

  preventZoomOnDoubleTap() {
    // Prevent zoom on double-tap for better UX
    let lastTap = 0;

    document.addEventListener('touchend', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;

      if (tapLength < 500 && tapLength > 0) {
        // Double tap detected
        e.preventDefault();

        // If it's a clickable element, trigger click
        const target = e.target.closest('button, a, [role="button"]');
        if (target) {
          target.click();
        }
      }

      lastTap = currentTime;
    });
  }

  optimizeTouchTargets() {
    // Ensure touch targets are at least 44x44px
    const touchTargets = document.querySelectorAll(
      'button, a, input, select, textarea, [role="button"], .artist-card, .calendar-day'
    );

    touchTargets.forEach(target => {
      const rect = target.getBoundingClientRect();
      const minSize = 44;

      // Add padding if element is too small
      if (rect.width < minSize || rect.height < minSize) {
        const currentPadding = parseFloat(getComputedStyle(target).padding) || 0;
        const neededPadding = Math.max(0, (minSize - Math.min(rect.width, rect.height)) / 2);

        if (neededPadding > 0) {
          target.style.padding = `${currentPadding + neededPadding}px`;
        }
      }
    });
  }

  // Public methods
  enableSwipe(element, handlers) {
    this.addSwipeListeners(element, handlers);
  }

  disableSwipe(element) {
    // Remove touch listeners
    element.replaceWith(element.cloneNode(true));
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.mobileTouchEnhancements = new MobileTouchEnhancements();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobileTouchEnhancements;
}

