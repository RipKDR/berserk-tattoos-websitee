/**
 * Berserk Tattoos - Enhanced Gallery System
 * Features: Lightbox modal, touch gestures, keyboard navigation, filter animations
 */

(function () {
    'use strict';

    class EnhancedGallery {
        constructor() {
            this.gallery = null;
            this.lightbox = null;
            this.currentIndex = 0;
            this.images = [];
            this.filters = [];
            this.isAnimating = false;
            this.touchStartX = 0;
            this.touchStartY = 0;
            this.touchEndX = 0;
            this.touchEndY = 0;

            this.config = {
                minSwipeDistance: 50,
                maxVerticalSwipe: 100,
                animationDuration: 300,
                preloadDistance: 2
            };

            this.init();
        }

        init() {
            this.setupGallery();
            this.setupLightbox();
            this.setupFilters();
            this.setupKeyboardNavigation();
            this.setupTouchGestures();
            this.setupIntersectionObserver();
        }

        setupGallery() {
            this.gallery = document.querySelector('.gallery-grid');
            if (!this.gallery) return;

            // Collect all gallery items
            this.images = Array.from(this.gallery.querySelectorAll('.gallery-item'));

            // Add click handlers
            this.images.forEach((item, index) => {
                item.addEventListener('click', () => this.openLightbox(index));
                item.setAttribute('data-index', index);
            });
        }

        setupLightbox() {
            // Create lightbox HTML if it doesn't exist
            if (!document.querySelector('.lightbox')) {
                this.createLightboxHTML();
            }

            this.lightbox = document.querySelector('.lightbox');
            this.lightboxContent = document.querySelector('.lightbox-content');
            this.lightboxImage = document.querySelector('.lightbox-image');
            this.lightboxInfo = document.querySelector('.lightbox-info');
            this.lightboxClose = document.querySelector('.lightbox-close');
            this.lightboxPrev = document.querySelector('.lightbox-prev');
            this.lightboxNext = document.querySelector('.lightbox-next');

            // Add event listeners
            this.lightboxClose?.addEventListener('click', () => this.closeLightbox());
            this.lightboxPrev?.addEventListener('click', () => this.previousImage());
            this.lightboxNext?.addEventListener('click', () => this.nextImage());

            // Close on backdrop click
            this.lightbox?.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });
        }

        createLightboxHTML() {
            const lightboxHTML = `
                <div class="lightbox" role="dialog" aria-modal="true" aria-label="Image gallery">
                    <div class="lightbox-content">
                        <img class="lightbox-image" alt="" />
                        <button class="lightbox-close" aria-label="Close gallery">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button class="lightbox-nav lightbox-next" aria-label="Next image">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                        <div class="lightbox-info">
                            <h4></h4>
                            <p></p>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        }

        openLightbox(index) {
            if (this.isAnimating) return;

            this.currentIndex = index;
            this.lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';

            this.updateLightboxContent();
            this.preloadAdjacentImages();

            // Focus management for accessibility
            this.lightboxClose.focus();

            // Announce to screen readers
            this.announceImageChange();
        }

        closeLightbox() {
            if (this.isAnimating) return;

            this.lightbox.classList.remove('active');
            document.body.style.overflow = '';

            // Return focus to the gallery item that was clicked
            const activeItem = this.images[this.currentIndex];
            activeItem?.focus();
        }

        previousImage() {
            if (this.isAnimating) return;

            this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
            this.updateLightboxContent();
            this.preloadAdjacentImages();
            this.announceImageChange();
        }

        nextImage() {
            if (this.isAnimating) return;

            this.currentIndex = this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
            this.updateLightboxContent();
            this.preloadAdjacentImages();
            this.announceImageChange();
        }

        updateLightboxContent() {
            const currentItem = this.images[this.currentIndex];
            if (!currentItem) return;

            const img = currentItem.querySelector('img');
            const overlay = currentItem.querySelector('.gallery-overlay');

            if (img) {
                this.lightboxImage.src = img.src;
                this.lightboxImage.alt = img.alt;
            }

            if (overlay) {
                const title = overlay.querySelector('h4');
                const description = overlay.querySelector('p');

                if (title) {
                    this.lightboxInfo.querySelector('h4').textContent = title.textContent;
                }
                if (description) {
                    this.lightboxInfo.querySelector('p').textContent = description.textContent;
                }
            }

            // Update navigation button states
            this.lightboxPrev.style.display = this.images.length > 1 ? 'flex' : 'none';
            this.lightboxNext.style.display = this.images.length > 1 ? 'flex' : 'none';
        }

        preloadAdjacentImages() {
            const preloadDistance = this.config.preloadDistance;

            for (let i = -preloadDistance; i <= preloadDistance; i++) {
                const index = this.currentIndex + i;
                if (index >= 0 && index < this.images.length && index !== this.currentIndex) {
                    const item = this.images[index];
                    const img = item.querySelector('img');
                    if (img && !img.complete) {
                        const preloadImg = new Image();
                        preloadImg.src = img.src;
                    }
                }
            }
        }

        setupFilters() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            if (!filterButtons.length) return;

            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => this.filterGallery(btn));
            });
        }

        filterGallery(activeButton) {
            const filter = activeButton.dataset.filter;

            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            activeButton.classList.add('active');

            // Filter images
            this.images.forEach((item) => {
                const category = item.dataset.category || 'all';
                const shouldShow = filter === 'all' || category === filter;

                if (shouldShow) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });

            // Update URL without page reload
            const url = new URL(window.location);
            if (filter === 'all') {
                url.searchParams.delete('filter');
            } else {
                url.searchParams.set('filter', filter);
            }
            window.history.replaceState({}, '', url);
        }

        setupKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                if (!this.lightbox.classList.contains('active')) return;

                switch (e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextImage();
                        break;
                    case 'ArrowUp':
                    case 'ArrowDown':
                        e.preventDefault();
                        break;
                }
            });
        }

        setupTouchGestures() {
            this.lightbox?.addEventListener('touchstart', (e) => {
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
            }, { passive: true });

            this.lightbox?.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].clientX;
                this.touchEndY = e.changedTouches[0].clientY;
                this.handleSwipe();
            }, { passive: true });
        }

        handleSwipe() {
            const deltaX = this.touchEndX - this.touchStartX;
            const deltaY = this.touchEndY - this.touchStartY;

            // Check if it's a horizontal swipe
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.config.minSwipeDistance) {
                if (Math.abs(deltaY) < this.config.maxVerticalSwipe) {
                    if (deltaX > 0) {
                        this.previousImage();
                    } else {
                        this.nextImage();
                    }
                }
            }
        }

        setupIntersectionObserver() {
            if (!('IntersectionObserver' in window)) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, {
                rootMargin: '50px',
                threshold: 0.1
            });

            this.images.forEach(item => {
                item.classList.add('reveal-on-scroll');
                observer.observe(item);
            });
        }

        announceImageChange() {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `Image ${this.currentIndex + 1} of ${this.images.length}`;

            document.body.appendChild(announcement);

            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }

        // Public methods for external control
        goToImage(index) {
            if (index >= 0 && index < this.images.length) {
                this.currentIndex = index;
                if (this.lightbox.classList.contains('active')) {
                    this.updateLightboxContent();
                }
            }
        }

        getCurrentIndex() {
            return this.currentIndex;
        }

        getTotalImages() {
            return this.images.length;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.BerserkGallery = new EnhancedGallery();
        });
    } else {
        window.BerserkGallery = new EnhancedGallery();
    }

    // Expose globally for external access
    window.BerserkGallery = window.BerserkGallery || EnhancedGallery;

})();
