/* IE11 Specific Compatibility Script - Berserk Tattoos */

// Detect IE11
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

if (isIE11) {
    // Add IE11 class to body for CSS targeting
    document.body.className += ' ie11';
    
    // Console log for debugging
    if (window.console) {
        console.log('IE11 detected - applying compatibility fixes');
    }
    
    // Fix for forEach on NodeList (already in polyfills but ensuring)
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
    
    // Fix for remove() method
    if (!Element.prototype.remove) {
        Element.prototype.remove = function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }
    
    // Fix for classList on SVG elements
    if (!('classList' in SVGElement.prototype)) {
        Object.defineProperty(SVGElement.prototype, 'classList', {
            get: function() {
                var self = this;
                return {
                    contains: function(className) {
                        return self.className.baseVal.indexOf(className) !== -1;
                    },
                    add: function(className) {
                        if (!self.classList.contains(className)) {
                            self.className.baseVal += ' ' + className;
                        }
                    },
                    remove: function(className) {
                        self.className.baseVal = self.className.baseVal.replace(
                            new RegExp('(\\s|^)' + className + '(\\s|$)'), ' '
                        ).trim();
                    },
                    toggle: function(className) {
                        if (self.classList.contains(className)) {
                            self.classList.remove(className);
                        } else {
                            self.classList.add(className);
                        }
                    }
                };
            }
        });
    }
    
    // Fix for CustomEvent
    (function() {
        if (typeof window.CustomEvent === 'function') return false;
        
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: null };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        
        window.CustomEvent = CustomEvent;
    })();
    
    // Fix CSS Grid layout with flexbox fallback
    function applyFlexboxFallback() {
        // Artists grid
        var artistsGrid = document.querySelector('.artists-grid');
        if (artistsGrid) {
            artistsGrid.style.display = 'flex';
            artistsGrid.style.flexWrap = 'wrap';
            artistsGrid.style.margin = '-1rem';
            
            var artistCards = artistsGrid.querySelectorAll('.artist-card');
            for (var i = 0; i < artistCards.length; i++) {
                artistCards[i].style.flex = '1 1 320px';
                artistCards[i].style.margin = '1rem';
                artistCards[i].style.maxWidth = 'calc(33.333% - 2rem)';
            }
        }
        
        // Gallery grid
        var galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid) {
            galleryGrid.style.display = 'flex';
            galleryGrid.style.flexWrap = 'wrap';
            galleryGrid.style.margin = '-0.5rem';
            
            var galleryItems = galleryGrid.querySelectorAll('.gallery-item');
            for (var i = 0; i < galleryItems.length; i++) {
                galleryItems[i].style.flex = '1 1 300px';
                galleryItems[i].style.margin = '0.5rem';
                galleryItems[i].style.maxWidth = 'calc(33.333% - 1rem)';
            }
        }
        
        // Contact grid
        var contactGrid = document.querySelector('.contact-grid');
        if (contactGrid) {
            contactGrid.style.display = 'flex';
            contactGrid.style.flexWrap = 'wrap';
            contactGrid.style.margin = '-1rem';
            
            var contactCards = contactGrid.querySelectorAll('.contact-card');
            for (var i = 0; i < contactCards.length; i++) {
                contactCards[i].style.flex = '1 1 250px';
                contactCards[i].style.margin = '1rem';
            }
        }
        
        // Portfolio grid
        var portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            portfolioGrid.style.display = 'flex';
            portfolioGrid.style.flexWrap = 'wrap';
            portfolioGrid.style.margin = '-0.5rem';
            
            var portfolioItems = portfolioGrid.querySelectorAll('.portfolio-item');
            for (var i = 0; i < portfolioItems.length; i++) {
                portfolioItems[i].style.flex = '1 1 300px';
                portfolioItems[i].style.margin = '0.5rem';
                portfolioItems[i].style.maxWidth = 'calc(33.333% - 1rem)';
                // Reset grid spanning
                portfolioItems[i].style.gridColumn = 'auto';
                portfolioItems[i].style.gridRow = 'auto';
            }
        }
    }
    
    // Apply fixes when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyFlexboxFallback);
    } else {
        applyFlexboxFallback();
    }
    
    // Fix for object-fit
    function fixObjectFit() {
        var images = document.querySelectorAll('.media-cover');
        for (var i = 0; i < images.length; i++) {
            var img = images[i];
            var parent = img.parentElement;
            
            // Make parent relative positioned
            parent.style.position = 'relative';
            parent.style.overflow = 'hidden';
            
            // Position image absolutely
            img.style.position = 'absolute';
            img.style.top = '50%';
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -50%)';
            img.style.minWidth = '100%';
            img.style.minHeight = '100%';
            img.style.width = 'auto';
            img.style.height = 'auto';
        }
    }
    
    // Apply object-fit fix
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixObjectFit);
    } else {
        fixObjectFit();
    }
    
    // Fix smooth scrolling
    document.addEventListener('click', function(e) {
        // Check if clicked element is an anchor with hash
        var target = e.target;
        while (target && target.tagName !== 'A') {
            target = target.parentElement;
        }
        
        if (target && target.hash && target.pathname === location.pathname) {
            e.preventDefault();
            var element = document.querySelector(target.hash);
            if (element) {
                // Simple scroll without animation for IE11
                var offsetTop = element.offsetTop - 100; // Account for fixed header
                window.scrollTo(0, offsetTop);
            }
        }
    });
    
    // Fix CSS variables with static values
    function applyCSSVariableFallbacks() {
        // This would be more comprehensive in production
        var style = document.createElement('style');
        style.innerHTML = `
            .ie11 body { color: #F2F2F2; background: #111111; }
            .ie11 .btn-primary { background: #7B1113; border-color: #7B1113; }
            .ie11 .nav-container { background: rgb(17, 17, 17); }
            .ie11 h2, .ie11 h3 { color: #7B1113; }
            .ie11 .artist-specialty { color: #7B1113; }
            .ie11 input:focus, .ie11 select:focus, .ie11 textarea:focus {
                outline: 2px solid #7B1113;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
    
    applyCSSVariableFallbacks();
    
    // Performance warning
    var performanceWarning = document.createElement('div');
    performanceWarning.innerHTML = '<p style="background:#7B1113;color:#fff;padding:10px;text-align:center;position:fixed;top:0;left:0;right:0;z-index:9999;">You are using an outdated browser. For the best experience, please use a modern browser like Chrome, Firefox, or Edge.</p>';
    document.body.insertBefore(performanceWarning, document.body.firstChild);
    
    // Remove warning after 10 seconds
    setTimeout(function() {
        if (performanceWarning.parentNode) {
            performanceWarning.parentNode.removeChild(performanceWarning);
        }
    }, 10000);
}
