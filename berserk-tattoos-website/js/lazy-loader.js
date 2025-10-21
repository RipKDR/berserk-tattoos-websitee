/**
 * Lazy Loading Implementation for Berserk Tattoos
 * BMAD Optimization - Phase 2.3
 * 
 * Implements intersection observer for images and components
 * Reduces initial page load time and improves performance
 */

(function(window) {
    'use strict';
    
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        return;
    }
    
    const LazyLoader = {
        // Configuration
        config: {
            rootMargin: '50px 0px',
            threshold: 0.1,
            fadeInDuration: 300
        },
        
        // Initialize lazy loading
        init: function() {
            this.lazyLoadImages();
            this.lazyLoadComponents();
            this.lazyLoadInstagramEmbeds();
        },
        
        // Lazy load images
        lazyLoadImages: function() {
            const images = document.querySelectorAll('img[data-src]');
            
            if (images.length === 0) return;
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, this.config);
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        },
        
        // Load individual image
        loadImage: function(img) {
            const src = img.dataset.src;
            const srcset = img.dataset.srcset;
            
            // Create new image to preload
            const newImg = new Image();
            
            newImg.onload = function() {
                // Fade in effect
                img.style.opacity = '0';
                img.style.transition = `opacity ${this.config.fadeInDuration}ms ease-in-out`;
                
                // Set sources
                img.src = src;
                if (srcset) {
                    img.srcset = srcset;
                }
                
                // Remove data attributes
                img.removeAttribute('data-src');
                img.removeAttribute('data-srcset');
                
                // Add loaded class
                img.classList.add('lazy-loaded');
                
                // Fade in
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 10);
            }.bind(this);
            
            newImg.onerror = function() {
                // Handle image load error
                img.classList.add('lazy-error');
                img.src = '/portfolio/placeholder.jpg'; // Fallback image
            };
            
            // Start loading
            newImg.src = src;
            if (srcset) {
                newImg.srcset = srcset;
            }
        },
        
        // Lazy load components (sections that can be loaded later)
        lazyLoadComponents: function() {
            const components = document.querySelectorAll('[data-lazy-component]');
            
            if (components.length === 0) return;
            
            const componentObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const component = entry.target;
                        this.loadComponent(component);
                        observer.unobserve(component);
                    }
                });
            }, this.config);
            
            components.forEach(component => {
                componentObserver.observe(component);
            });
        },
        
        // Load component
        loadComponent: function(component) {
            const componentType = component.dataset.lazyComponent;
            
            switch (componentType) {
                case 'instagram-feed':
                    this.loadInstagramFeed(component);
                    break;
                case 'testimonials':
                    this.loadTestimonials(component);
                    break;
                case 'portfolio-gallery':
                    this.loadPortfolioGallery(component);
                    break;
                default:
                    // Generic component loading
                    component.classList.add('loaded');
            }
        },
        
        // Lazy load Instagram embeds
        lazyLoadInstagramEmbeds: function() {
            const embeds = document.querySelectorAll('.instagram-embed-wrapper');
            
            if (embeds.length === 0) return;
            
            const embedObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const embed = entry.target;
                        this.loadInstagramEmbed(embed);
                        observer.unobserve(embed);
                    }
                });
            }, this.config);
            
            embeds.forEach(embed => {
                embedObserver.observe(embed);
            });
        },
        
        // Load Instagram embed
        loadInstagramEmbed: function(embed) {
            // Add loading class
            embed.classList.add('loading');
            
            // Simulate loading delay for better UX
            setTimeout(() => {
                embed.classList.remove('loading');
                embed.classList.add('loaded');
                
                // Trigger Instagram script if not already loaded
                if (window.instgrm && !embed.querySelector('iframe')) {
                    window.instgrm.Embeds.process();
                }
            }, 500);
        },
        
        // Load Instagram feed
        loadInstagramFeed: function(component) {
            component.classList.add('loading');
            
            // Simulate API call delay
            setTimeout(() => {
                component.classList.remove('loading');
                component.classList.add('loaded');
                
                // Trigger any Instagram processing
                if (window.instgrm) {
                    window.instgrm.Embeds.process();
                }
            }, 800);
        },
        
        // Load testimonials
        loadTestimonials: function(component) {
            component.classList.add('loading');
            
            setTimeout(() => {
                component.classList.remove('loading');
                component.classList.add('loaded');
                
                // Add animation classes
                const testimonialCards = component.querySelectorAll('.testimonial-card');
                testimonialCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 100);
                });
            }, 300);
        },
        
        // Load portfolio gallery
        loadPortfolioGallery: function(component) {
            component.classList.add('loading');
            
            setTimeout(() => {
                component.classList.remove('loading');
                component.classList.add('loaded');
                
                // Initialize gallery interactions
                this.initGalleryInteractions(component);
            }, 400);
        },
        
        // Initialize gallery interactions
        initGalleryInteractions: function(gallery) {
            const images = gallery.querySelectorAll('img');
            
            images.forEach(img => {
                img.addEventListener('click', function() {
                    // Open gallery modal
                    if (window.openGalleryModal) {
                        window.openGalleryModal(img.src, img.alt);
                    }
                });
            });
        },
        
        // Preload critical images
        preloadCriticalImages: function() {
            const criticalImages = [
                '/portfolio/amelia-1.jpg',
                '/portfolio/ben-1.jpg',
                '/portfolio/monique-1.jpg'
            ];
            
            criticalImages.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            });
        },
        
        // Get loading statistics
        getStats: function() {
            const loadedImages = document.querySelectorAll('.lazy-loaded').length;
            const totalImages = document.querySelectorAll('img[data-src]').length + loadedImages;
            const loadedComponents = document.querySelectorAll('.loaded').length;
            
            return {
                images: {
                    loaded: loadedImages,
                    total: totalImages,
                    percentage: totalImages > 0 ? Math.round((loadedImages / totalImages) * 100) : 0
                },
                components: {
                    loaded: loadedComponents,
                    total: document.querySelectorAll('[data-lazy-component]').length
                }
            };
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            LazyLoader.init();
        });
    } else {
        LazyLoader.init();
    }
    
    // Expose to global scope
    window.BerserkLazyLoader = LazyLoader;
    
    // Preload critical images immediately
    LazyLoader.preloadCriticalImages();
    
})(typeof window !== 'undefined' ? window : global);
