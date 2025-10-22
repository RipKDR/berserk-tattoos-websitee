/**
 * Berserk Tattoos - Progressive Image Loader
 * Implements blur-up technique with smooth fade-in animations
 * Handles lazy loading, error states, and performance optimization
 */

(function() {
    'use strict';

    class ImageLoader {
        constructor() {
            this.config = {
                rootMargin: '50px',
                threshold: 0.01,
                fadeInDuration: 600,
                blurAmount: 20,
                // Retry configuration for failed image loads
                maxRetries: 3,
                retryDelays: [1000, 2000, 4000] // Exponential backoff: 1s, 2s, 4s
            };

            this.observer = null;
            this.images = [];
            this.retryAttempts = new Map(); // Track retry attempts per image
            // Check if user prefers reduced motion
            this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            this.init();
        }

        init() {
            // Create ARIA live region for screen reader announcements
            this.createLiveRegion();

            // Check for IntersectionObserver support
            if ('IntersectionObserver' in window) {
                this.setupIntersectionObserver();
            } else {
                // Fallback: load all images immediately
                this.loadAllImages();
            }

            // Set up error handling for all images
            this.setupErrorHandling();

            // Initialize blur-up for images
            this.initializeBlurUp();
        }

        createLiveRegion() {
            // Create hidden live region for screen reader announcements
            if (!document.getElementById('image-loader-status')) {
                const liveRegion = document.createElement('div');
                liveRegion.id = 'image-loader-status';
                liveRegion.setAttribute('role', 'status');
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('aria-atomic', 'true');
                liveRegion.className = 'sr-only'; // Visually hidden but accessible
                liveRegion.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
                document.body.appendChild(liveRegion);
                this.liveRegion = liveRegion;
            } else {
                this.liveRegion = document.getElementById('image-loader-status');
            }
        }

        announce(message) {
            // Announce to screen readers
            if (this.liveRegion) {
                this.liveRegion.textContent = message;
                // Clear after a short delay to allow re-announcement of same message
                setTimeout(() => {
                    this.liveRegion.textContent = '';
                }, 1000);
            }
        }

        setupIntersectionObserver() {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    rootMargin: this.config.rootMargin,
                    threshold: this.config.threshold
                }
            );

            // Observe all images with data-src attribute
            const lazyImages = document.querySelectorAll('img[loading="lazy"], picture source[data-srcset]');
            lazyImages.forEach(img => {
                this.observer.observe(img);
                this.images.push(img);
            });
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    this.loadImage(element);
                    this.observer.unobserve(element);
                }
            });
        }

        loadImage(element) {
            const parent = element.closest('.image-container, .gallery-item, .artist-image, .portfolio-item, .hero-gallery-item');

            if (parent) {
                parent.classList.add('loading');
                parent.setAttribute('aria-busy', 'true');
            }

            // Handle <picture> elements
            if (element.tagName === 'SOURCE' && element.dataset.srcset) {
                element.srcset = element.dataset.srcset;
                delete element.dataset.srcset;
            }

            // Handle <img> elements
            if (element.tagName === 'IMG') {
                const img = element;
                img.setAttribute('aria-busy', 'true');

                // If it has a data-src, use that
                if (img.dataset.src) {
                    this.loadWithProgress(img, img.dataset.src);
                } else if (img.src) {
                    // Already has src, just handle load event
                    this.handleImageLoad(img);
                }
            }
        }

        loadWithProgress(img, src) {
            // Create a new image to preload
            const tempImg = new Image();

            tempImg.onload = () => {
                img.src = src;
                delete img.dataset.src;
                // Clear retry attempts on success
                this.retryAttempts.delete(img);
                this.handleImageLoad(img);
            };

            tempImg.onerror = () => {
                this.retryLoad(img, src);
            };

            tempImg.src = src;
        }

        retryLoad(img, src) {
            const currentAttempts = this.retryAttempts.get(img) || 0;

            if (currentAttempts < this.config.maxRetries) {
                // Increment retry count
                this.retryAttempts.set(img, currentAttempts + 1);

                // Get delay for this retry attempt (exponential backoff)
                const delay = this.config.retryDelays[currentAttempts] || this.config.retryDelays[this.config.retryDelays.length - 1];

                // Log retry attempt (for debugging)
                if (window.BerserkLogger) {
                    window.BerserkLogger.info(`Retrying image load (attempt ${currentAttempts + 1}/${this.config.maxRetries}): ${src}`);
                }

                // Retry after delay
                setTimeout(() => {
                    this.loadWithProgress(img, src);
                }, delay);
            } else {
                // Max retries reached, handle error
                this.retryAttempts.delete(img);
                this.handleImageError(img);
            }
        }

        handleImageLoad(img) {
            const parent = img.closest('.image-container, .gallery-item, .artist-image, .portfolio-item, .hero-gallery-item');

            // Wait for next frame to ensure image is painted
            requestAnimationFrame(() => {
                img.classList.add('loaded');
                img.removeAttribute('aria-busy');

                if (parent) {
                    parent.classList.remove('loading');
                    parent.classList.add('loaded');
                    parent.removeAttribute('aria-busy');
                }

                // Announce to screen readers (only for meaningful images)
                if (img.alt && img.alt.trim()) {
                    this.announce(`Image loaded: ${img.alt}`);
                }

                // Remove blur-up placeholder if exists
                const placeholder = parent?.querySelector('.image-placeholder');
                if (placeholder) {
                    if (this.prefersReducedMotion) {
                        // Skip animation for users who prefer reduced motion
                        placeholder.remove();
                    } else {
                        setTimeout(() => {
                            placeholder.style.opacity = '0';
                            setTimeout(() => placeholder.remove(), this.config.fadeInDuration);
                        }, 100);
                    }
                }

                // Trigger custom event
                img.dispatchEvent(new CustomEvent('imageLoaded', {
                    bubbles: true,
                    detail: { src: img.src, alt: img.alt }
                }));
            });
        }

        handleImageError(img) {
            const parent = img.closest('.image-container, .gallery-item, .artist-image, .portfolio-item, .hero-gallery-item');

            img.classList.add('error');
            img.removeAttribute('aria-busy');
            img.setAttribute('aria-label', 'Image failed to load');

            if (parent) {
                parent.classList.remove('loading');
                parent.classList.add('error');
                parent.removeAttribute('aria-busy');
            }

            // Announce error to screen readers
            if (img.alt && img.alt.trim()) {
                this.announce(`Image unavailable: ${img.alt}`);
            }

            // Try fallback if available
            if (img.dataset.fallback) {
                img.src = img.dataset.fallback;
            } else if (img.getAttribute('onerror')) {
                // Let the inline onerror handler deal with it
                return;
            } else {
                // Hide failed image gracefully
                img.style.display = 'none';
                if (parent) {
                    parent.style.background = '#1a1a1a';
                }
            }

            // Log error for monitoring
            if (window.BerserkSentry) {
                window.BerserkSentry.captureMessage('Image load failed: ' + img.src);
            }
        }

        showErrorPlaceholder(img) {
            const parent = img.closest('.image-container, .gallery-item, .artist-image, .portfolio-item');
            if (!parent) return;
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'image-error-placeholder';
            errorDiv.innerHTML = `
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p>Image unavailable</p>
            `;
            
            parent.appendChild(errorDiv);
        }

        initializeBlurUp() {
            // Add blur-up effect to all images
            const images = document.querySelectorAll('.media-cover, .artist-image img, .gallery-item img');
            
            images.forEach(img => {
                if (!img.complete) {
                    img.classList.add('blur-up');
                    
                    img.addEventListener('load', function handler() {
                        img.classList.remove('blur-up');
                        img.classList.add('blur-up-loaded');
                        img.removeEventListener('load', handler);
                    });
                }
            });
        }

        loadAllImages() {
            // Fallback: load all images immediately
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    delete img.dataset.src;
                }
            });
        }

        setupErrorHandling() {
            // Global error handler for all images
            document.addEventListener('error', (e) => {
                if (e.target.tagName === 'IMG') {
                    this.handleImageError(e.target);
                }
            }, true);
        }

        // Preload critical images
        preloadImages(urls) {
            return Promise.all(
                urls.map(url => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => resolve(url);
                        img.onerror = () => reject(url);
                        img.src = url;
                    });
                })
            );
        }

        // Prefetch images for better UX
        prefetchImages(urls) {
            urls.forEach(url => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.as = 'image';
                link.href = url;
                document.head.appendChild(link);
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.BerserkImageLoader = new ImageLoader();
        });
    } else {
        window.BerserkImageLoader = new ImageLoader();
    }

    // Expose globally for external access
    window.BerserkImageLoader = window.BerserkImageLoader || ImageLoader;

})();

