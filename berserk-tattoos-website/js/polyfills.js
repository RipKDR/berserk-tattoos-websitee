/* Browser Polyfills and Compatibility Enhancements - Berserk Tattoos */

// Feature Detection
var browserSupport = {
    intersectionObserver: 'IntersectionObserver' in window,
    cssVariables: window.CSS && CSS.supports && CSS.supports('--test', 'test'),
    smoothScroll: 'scrollBehavior' in document.documentElement.style,
    objectFit: CSS.supports && CSS.supports('object-fit', 'cover'),
    grid: CSS.supports && CSS.supports('display', 'grid'),
    backdropFilter: CSS.supports && (CSS.supports('backdrop-filter', 'blur(10px)') || CSS.supports('-webkit-backdrop-filter', 'blur(10px)')),
    promise: 'Promise' in window,
    forEach: 'forEach' in NodeList.prototype
};

// Add feature detection classes to HTML element
(function() {
    var html = document.documentElement;
    
    // CSS Variables
    if (!browserSupport.cssVariables) {
        html.className += ' no-css-variables';
    }
    
    // IntersectionObserver
    if (!browserSupport.intersectionObserver) {
        html.className += ' no-intersection-observer';
    }
    
    // Object-fit
    if (!browserSupport.objectFit) {
        html.className += ' no-object-fit';
    }
    
    // Grid
    if (!browserSupport.grid) {
        html.className += ' no-grid';
    }
})();

// Console Polyfill (for IE9 and below)
if (!window.console) {
    window.console = {
        log: function() {},
        warn: function() {},
        error: function() {},
        info: function() {}
    };
}

// NodeList.forEach polyfill (for IE11)
if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// Array.from polyfill (for IE11)
if (!Array.from) {
    Array.from = function(arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    };
}

// Object.assign polyfill (for IE11)
if (!Object.assign) {
    Object.assign = function(target) {
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        
        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}

// Element.matches polyfill (for IE11)
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
                               Element.prototype.webkitMatchesSelector;
}

// Element.closest polyfill (for IE11)
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Smooth Scroll Polyfill
(function() {
    if (!browserSupport.smoothScroll) {
        // Simple smooth scroll implementation
        function smoothScrollTo(element, target, duration) {
            target = Math.round(target);
            duration = Math.round(duration);
            
            if (duration < 0) {
                return Promise.reject("bad duration");
            }
            
            if (duration === 0) {
                element.scrollTop = target;
                return Promise.resolve();
            }
            
            var startTime = Date.now();
            var endTime = startTime + duration;
            var startTop = element.scrollTop;
            var distance = target - startTop;
            
            // Easing function
            var easeInOutQuad = function(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };
            
            var scroll = function() {
                var currentTime = Date.now();
                var time = Math.min(1, ((currentTime - startTime) / duration));
                var timeFunction = easeInOutQuad(time, 0, 1, 1);
                element.scrollTop = Math.ceil((timeFunction * distance) + startTop);
                
                if (currentTime >= endTime) {
                    return;
                }
                
                requestAnimationFrame(scroll);
            };
            
            scroll();
        }
        
        // Override scrollIntoView
        Element.prototype.scrollIntoView = function(options) {
            if (options === undefined) {
                options = { behavior: 'auto', block: 'start', inline: 'nearest' };
            }
            
            if (options === true) {
                options = { behavior: 'auto', block: 'start', inline: 'nearest' };
            }
            
            if (options === false) {
                options = { behavior: 'auto', block: 'end', inline: 'nearest' };
            }
            
            if (options.behavior === 'smooth') {
                var offsetTop = this.offsetTop;
                smoothScrollTo(document.documentElement, offsetTop, 500);
                smoothScrollTo(document.body, offsetTop, 500);
            } else {
                // Fallback to native implementation
                var y = this.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo(0, y);
            }
        };
        
        // Add class to indicate polyfill is active
        document.documentElement.className += ' smooth-scroll-polyfill';
    }
})();

// IntersectionObserver Polyfill (simplified version)
(function() {
    if (!browserSupport.intersectionObserver) {
        // Very basic polyfill - just loads all images immediately
        window.IntersectionObserver = function(callback, options) {
            this.callback = callback;
            this.elements = [];
        };
        
        window.IntersectionObserver.prototype.observe = function(element) {
            // Immediately trigger callback
            this.callback([{
                target: element,
                isIntersecting: true,
                intersectionRatio: 1
            }], this);
        };
        
        window.IntersectionObserver.prototype.unobserve = function(element) {
            // No-op
        };
        
        window.IntersectionObserver.prototype.disconnect = function() {
            // No-op
        };
    }
})();

// URLSearchParams Polyfill (for IE11)
(function() {
    if (!window.URLSearchParams) {
        window.URLSearchParams = function(searchString) {
            var self = this;
            self.searchString = searchString;
            self.params = {};
            
            if (searchString) {
                var pairs = searchString.replace(/^\?/, '').split('&');
                pairs.forEach(function(pair) {
                    var parts = pair.split('=');
                    var key = decodeURIComponent(parts[0]);
                    var value = parts.length > 1 ? decodeURIComponent(parts[1]) : '';
                    self.params[key] = value;
                });
            }
        };
        
        window.URLSearchParams.prototype.get = function(key) {
            return this.params[key] || null;
        };
        
        window.URLSearchParams.prototype.set = function(key, value) {
            this.params[key] = value;
        };
        
        window.URLSearchParams.prototype.has = function(key) {
            return key in this.params;
        };
    }
})();

// FormData.entries polyfill (for older browsers)
if (window.FormData && !FormData.prototype.entries) {
    FormData.prototype.entries = function() {
        // This is a simplified polyfill
        // In production, consider using a full polyfill library
        throw new Error('FormData.entries() is not supported in this browser');
    };
}

// CSS.supports polyfill (basic implementation)
if (!window.CSS || !window.CSS.supports) {
    window.CSS = window.CSS || {};
    window.CSS.supports = function(property, value) {
        var style = document.createElement('div').style;
        
        if (typeof value === 'undefined') {
            // Checking for syntax like 'display: grid'
            var parts = property.split(':');
            if (parts.length === 2) {
                property = parts[0].trim();
                value = parts[1].trim();
            }
        }
        
        // Convert CSS property to camelCase for JavaScript
        var camelCase = property.replace(/-([a-z])/g, function(g) {
            return g[1].toUpperCase();
        });
        
        // Check if property exists
        if (typeof style[camelCase] !== 'undefined') {
            // Try to set the value
            style[camelCase] = value;
            return style[camelCase] === value;
        }
        
        return false;
    };
}

// Object.entries polyfill (for IE11)
if (!Object.entries) {
    Object.entries = function(obj) {
        var ownProps = Object.keys(obj);
        var i = ownProps.length;
        var resArray = new Array(i);
        while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }
        return resArray;
    };
}

// String.prototype.includes polyfill (for IE11)
if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }
        
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

// Array.prototype.includes polyfill (for IE11)
if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement, fromIndex) {
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        
        if (len === 0) {
            return false;
        }
        
        var n = parseInt(fromIndex) || 0;
        var k;
        
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {
                k = 0;
            }
        }
        
        while (k < len) {
            if (searchElement === O[k]) {
                return true;
            }
            k++;
        }
        
        return false;
    };
}

// RequestAnimationFrame polyfill (for older browsers)
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                    window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();

// Performance.now polyfill
if (!window.performance || !window.performance.now) {
    window.performance = window.performance || {};
    window.performance.now = function() {
        return new Date().getTime();
    };
}

// Add browser detection info to window for debugging
window.BerserkTattoos = window.BerserkTattoos || {};
window.BerserkTattoos.browserSupport = browserSupport;

// Log browser support info (remove in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Browser Support:', browserSupport);
}
