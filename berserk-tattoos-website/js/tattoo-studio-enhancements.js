/**
 * Tattoo Studio Specific Enhancements
 * Features for professional tattoo portfolio presentation
 */

(function() {
    'use strict';

    class TattooStudioEnhancements {
        constructor() {
            this.config = {
                enableImageProtection: true,
                enableZoom: true,
                enableWatermarkProtection: true,
                zoomLevel: 2.5,
                zoomSmoothness: 0.3
            };

            this.init();
        }

        init() {
            // Protect portfolio images from unauthorized downloads
            if (this.config.enableImageProtection) {
                this.protectImages();
            }

            // Add zoom capability to portfolio images
            if (this.config.enableZoom) {
                this.initImageZoom();
            }

            // Add portfolio image metadata display
            this.initImageMetadata();

            // Enhance gallery with tattoo-specific filters
            this.enhanceGalleryFilters();

            // Add image loading announcements for accessibility
            this.initAccessibilityAnnouncements();
        }

        /**
         * Protect portfolio images from right-click download
         */
        protectImages() {
            const portfolioImages = document.querySelectorAll('.portfolio-item img, .gallery-item img');

            portfolioImages.forEach(img => {
                // Prevent right-click context menu
                img.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.showProtectionMessage();
                    return false;
                });

                // Prevent drag and drop
                img.addEventListener('dragstart', (e) => {
                    e.preventDefault();
                    return false;
                });

                // Add CSS pointer-events protection
                img.style.userSelect = 'none';
                img.style.webkitUserSelect = 'none';
                img.style.mozUserSelect = 'none';
                img.style.msUserSelect = 'none';
            });
        }

        showProtectionMessage() {
            // Check if message already exists
            if (document.querySelector('.image-protection-message')) return;

            const message = document.createElement('div');
            message.className = 'image-protection-message';
            message.textContent = '© Berserk Tattoos - Images are protected';
            message.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(123, 17, 19, 0.95);
                color: #F2F2F2;
                padding: 1rem 1.5rem;
                border-radius: 4px;
                font-size: 0.875rem;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            `;

            document.body.appendChild(message);

            setTimeout(() => {
                message.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => message.remove(), 300);
            }, 3000);
        }

        /**
         * Add pinch-to-zoom and hover zoom for portfolio images
         */
        initImageZoom() {
            const portfolioImages = document.querySelectorAll('.portfolio-item, .gallery-item');

            portfolioImages.forEach(item => {
                const img = item.querySelector('img');
                if (!img) return;

                // Desktop: hover to zoom
                if (window.matchMedia('(hover: hover)').matches) {
                    item.addEventListener('mouseenter', () => {
                        img.style.transition = `transform ${this.config.zoomSmoothness}s ease`;
                    });

                    item.addEventListener('mousemove', (e) => {
                        const rect = item.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;

                        img.style.transformOrigin = `${x}% ${y}%`;
                        img.style.transform = `scale(${this.config.zoomLevel})`;
                    });

                    item.addEventListener('mouseleave', () => {
                        img.style.transform = 'scale(1)';
                        img.style.transformOrigin = 'center';
                    });
                }

                // Mobile: double-tap to zoom (handled by enhanced gallery lightbox)
                item.addEventListener('dblclick', (e) => {
                    e.preventDefault();
                    // Trigger lightbox if available
                    if (window.BerserkGallery && window.BerserkGallery.openLightbox) {
                        const index = Array.from(portfolioImages).indexOf(item);
                        window.BerserkGallery.openLightbox(index);
                    }
                });
            });
        }

        /**
         * Display tattoo metadata (style, body part, artist)
         */
        initImageMetadata() {
            const portfolioItems = document.querySelectorAll('.portfolio-item');

            portfolioItems.forEach(item => {
                const img = item.querySelector('img');
                const overlay = item.querySelector('.portfolio-overlay');

                if (!img || !overlay) return;

                // Extract metadata from image attributes
                const category = item.dataset.category || '';

                // Enhance overlay with metadata
                const info = overlay.querySelector('.portfolio-info');
                if (info && category) {
                    const badge = document.createElement('span');
                    badge.className = 'category-badge';
                    badge.textContent = category.toUpperCase();
                    badge.style.cssText = `
                        display: inline-block;
                        background: rgba(123, 17, 19, 0.8);
                        padding: 0.25rem 0.75rem;
                        border-radius: 3px;
                        font-size: 0.75rem;
                        margin-top: 0.5rem;
                        letter-spacing: 0.05em;
                    `;
                    info.appendChild(badge);
                }
            });
        }

        /**
         * Enhance gallery filters with tattoo-specific categories
         */
        enhanceGalleryFilters() {
            const filterButtons = document.querySelectorAll('.filter-btn');

            filterButtons.forEach(btn => {
                // Add count of items per filter
                const filter = btn.dataset.filter;
                const portfolioItems = document.querySelectorAll('.portfolio-item');

                let count = 0;
                if (filter === 'all') {
                    count = portfolioItems.length;
                } else {
                    portfolioItems.forEach(item => {
                        if (item.dataset.category === filter) count++;
                    });
                }

                if (count > 0) {
                    const countBadge = document.createElement('span');
                    countBadge.className = 'filter-count';
                    countBadge.textContent = count;
                    countBadge.style.cssText = `
                        margin-left: 0.5rem;
                        opacity: 0.6;
                        font-size: 0.75rem;
                    `;
                    btn.appendChild(countBadge);
                }
            });
        }

        /**
         * Accessibility announcements for image loading
         */
        initAccessibilityAnnouncements() {
            // Create aria-live region for announcements
            let announcer = document.getElementById('image-load-announcer');

            if (!announcer) {
                announcer = document.createElement('div');
                announcer.id = 'image-load-announcer';
                announcer.setAttribute('role', 'status');
                announcer.setAttribute('aria-live', 'polite');
                announcer.setAttribute('aria-atomic', 'true');
                announcer.style.cssText = `
                    position: absolute;
                    left: -10000px;
                    width: 1px;
                    height: 1px;
                    overflow: hidden;
                `;
                document.body.appendChild(announcer);
            }

            // Listen for image load events
            document.addEventListener('imageLoaded', (e) => {
                const detail = e.detail;
                if (detail && detail.alt) {
                    announcer.textContent = `Image loaded: ${detail.alt}`;
                }
            });

            // Track total images loaded
            let totalImages = document.querySelectorAll('img[loading="lazy"]').length;
            let loadedImages = 0;

            document.addEventListener('imageLoaded', () => {
                loadedImages++;
                if (loadedImages === totalImages && totalImages > 0) {
                    setTimeout(() => {
                        announcer.textContent = 'All portfolio images have loaded successfully';
                    }, 500);
                }
            });
        }

        /**
         * Add image loading progress indicator
         */
        addLoadingProgress() {
            const totalImages = document.querySelectorAll('img[loading="lazy"]').length;
            if (totalImages === 0) return;

            let loadedCount = 0;

            const progressBar = document.createElement('div');
            progressBar.id = 'image-loading-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #7B1113, #9B1515);
                transition: width 0.3s ease;
                z-index: 10000;
            `;
            document.body.appendChild(progressBar);

            document.addEventListener('imageLoaded', () => {
                loadedCount++;
                const progress = (loadedCount / totalImages) * 100;
                progressBar.style.width = `${progress}%`;

                if (loadedCount === totalImages) {
                    setTimeout(() => {
                        progressBar.style.opacity = '0';
                        setTimeout(() => progressBar.remove(), 300);
                    }, 500);
                }
            });
        }

        /**
         * Add skeleton loading placeholders
         */
        addSkeletonLoaders() {
            const images = document.querySelectorAll('img[loading="lazy"]');

            images.forEach(img => {
                const parent = img.closest('.portfolio-item, .gallery-item, .artist-image');
                if (!parent || img.complete) return;

                // Add skeleton overlay
                const skeleton = document.createElement('div');
                skeleton.className = 'image-skeleton';
                skeleton.style.cssText = `
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.05) 0%,
                        rgba(255, 255, 255, 0.1) 50%,
                        rgba(255, 255, 255, 0.05) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    pointer-events: none;
                    z-index: 1;
                `;

                parent.style.position = 'relative';
                parent.appendChild(skeleton);

                // Remove skeleton when image loads
                img.addEventListener('load', () => {
                    skeleton.style.opacity = '0';
                    setTimeout(() => skeleton.remove(), 300);
                }, { once: true });
            });
        }
    }

    // Add CSS animations
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

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        @keyframes shimmer {
            0% {
                background-position: -200% 0;
            }
            100% {
                background-position: 200% 0;
            }
        }

        /* Prevent image selection in portfolio */
        .portfolio-item img,
        .gallery-item img {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* Smooth zoom transitions */
        .portfolio-item img,
        .gallery-item img {
            will-change: transform;
        }

        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
            .portfolio-item img,
            .gallery-item img {
                transition: none !important;
            }

            .image-skeleton {
                animation: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.BerserkTattooEnhancements = new TattooStudioEnhancements();
        });
    } else {
        window.BerserkTattooEnhancements = new TattooStudioEnhancements();
    }

})();
