/**
 * Logger Utility for Berserk Tattoos
 * BMAD Optimization - Phase 1.3
 * 
 * Provides controlled logging with environment awareness
 * Only logs in development, silent in production unless errors
 */

(function(window) {
    'use strict';
    
    // Detect environment
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.search.includes('debug=true');
    
    // Logger levels
    const LogLevel = {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3
    };
    
    // Current log level based on environment
    const currentLogLevel = isDevelopment ? LogLevel.DEBUG : LogLevel.ERROR;
    
    // Logger implementation
    const Logger = {
        // Error logging - always enabled
        error: function(...args) {
            if (console && console.error) {
                console.error('[Berserk]', ...args);
            }
            
            // In production, also send to error tracking service
            if (!isDevelopment && typeof window.trackError === 'function') {
                window.trackError(args);
            }
        },
        
        // Warning logging
        warn: function(...args) {
            if (currentLogLevel >= LogLevel.WARN && console && console.warn) {
                console.warn('[Berserk]', ...args);
            }
        },
        
        // Info logging
        info: function(...args) {
            if (currentLogLevel >= LogLevel.INFO && console && console.info) {
                console.info('[Berserk]', ...args);
            }
        },
        
        // Debug logging
        debug: function(...args) {
            if (currentLogLevel >= LogLevel.DEBUG && console && console.log) {
                console.log('[Berserk Debug]', ...args);
            }
        },
        
        // Log with custom prefix
        log: function(...args) {
            if (currentLogLevel >= LogLevel.INFO && console && console.log) {
                console.log('[Berserk]', ...args);
            }
        },
        
        // Group logging (for better organization)
        group: function(label) {
            if (currentLogLevel >= LogLevel.DEBUG && console && console.group) {
                console.group('[Berserk] ' + label);
            }
        },
        
        groupEnd: function() {
            if (currentLogLevel >= LogLevel.DEBUG && console && console.groupEnd) {
                console.groupEnd();
            }
        },
        
        // Table logging (for structured data)
        table: function(data) {
            if (currentLogLevel >= LogLevel.DEBUG && console && console.table) {
                console.table(data);
            }
        },
        
        // Performance timing
        time: function(label) {
            if (currentLogLevel >= LogLevel.DEBUG && console && console.time) {
                console.time('[Berserk] ' + label);
            }
        },
        
        timeEnd: function(label) {
            if (currentLogLevel >= LogLevel.DEBUG && console && console.timeEnd) {
                console.timeEnd('[Berserk] ' + label);
            }
        },
        
        // Check if logging is enabled
        isEnabled: function(level) {
            return currentLogLevel >= (level || LogLevel.INFO);
        },
        
        // Get current environment
        getEnvironment: function() {
            return isDevelopment ? 'development' : 'production';
        }
    };
    
    // Expose logger globally
    window.BerserkLogger = Logger;
    
    // Also create a shorthand
    window.logger = Logger;
    
    // For CommonJS environments (Node.js/Netlify Functions)
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Logger;
    }
    
})(typeof window !== 'undefined' ? window : global);
