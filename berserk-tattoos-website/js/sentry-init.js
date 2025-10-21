/**
 * Sentry Error Tracking for Berserk Tattoos
 * BMAD Optimization - Phase 1.3
 *
 * Provides error tracking and performance monitoring
 * Only loads in production to avoid development noise
 */

(function(window) {
    'use strict';
    
    // Only load Sentry in production
    const isProduction = window.location.hostname !== 'localhost' && 
                        window.location.hostname !== '127.0.0.1' &&
                        !window.location.search.includes('debug=true');
    
    if (!isProduction) {
        // In development, provide mock Sentry functions
        window.Sentry = {
            init: function() {},
            captureException: function() {},
            captureMessage: function() {},
            addBreadcrumb: function() {},
            setUser: function() {},
            setTag: function() {},
            setContext: function() {},
            configureScope: function() {}
        };
        return;
    }
    
    // Production Sentry configuration
    const SENTRY_DSN = 'https://your-sentry-dsn@sentry.io/project-id';
    
    // Load Sentry SDK dynamically
    const script = document.createElement('script');
    script.src = 'https://browser.sentry-cdn.com/7.0.0/bundle.min.js';
    script.crossOrigin = 'anonymous';
    
    script.onload = function() {
        if (window.Sentry) {
            // Initialize Sentry
            window.Sentry.init({
                dsn: SENTRY_DSN,
                environment: 'production',
                release: 'berserk-tattoos@1.0.0',
                
                // Performance monitoring
                tracesSampleRate: 0.1, // 10% of transactions
                
                // Error filtering
                beforeSend: function(event, hint) {
                    // Filter out common non-critical errors
                    const error = hint.originalException;
                    
                    // Ignore network errors
                    if (error && error.name === 'NetworkError') {
                        return null;
                    }
                    
                    // Ignore localStorage errors
                    if (error && error.name === 'QuotaExceededError') {
                        return null;
                    }
                    
                    // Ignore script loading errors for external resources
                    if (event.exception && event.exception.values) {
                        const exception = event.exception.values[0];
                        if (exception.stacktrace && exception.stacktrace.frames) {
                            const frames = exception.stacktrace.frames;
                            const lastFrame = frames[frames.length - 1];
                            if (lastFrame && lastFrame.filename && 
                                (lastFrame.filename.includes('instagram.com') ||
                                 lastFrame.filename.includes('google-analytics.com'))) {
                                return null;
                            }
                        }
                    }
                    
                    return event;
                },
                
                // User context
                initialScope: {
                    tags: {
                        component: 'berserk-tattoos-website'
                    },
                    contexts: {
                        app: {
                            name: 'Berserk Tattoos',
                            version: '1.0.0'
                        }
                    }
                }
            });
            
            // Set up global error handlers
            window.addEventListener('error', function(event) {
                window.Sentry.captureException(event.error);
            });
            
            window.addEventListener('unhandledrejection', function(event) {
                window.Sentry.captureException(event.reason);
            });
            
            // Track booking errors specifically
            window.addEventListener('booking-error', function(event) {
                window.Sentry.captureMessage('Booking error occurred', 'error', {
                    extra: event.detail
                });
            });
            
            // Track performance issues
            window.addEventListener('performance-issue', function(event) {
                window.Sentry.captureMessage('Performance issue detected', 'warning', {
                    extra: event.detail
                });
            });
            
            // Add breadcrumbs for user actions
            document.addEventListener('click', function(event) {
                if (event.target.matches('a[href], button, .booking-wizard button')) {
                    window.Sentry.addBreadcrumb({
                        message: 'User clicked element',
                        category: 'user',
                        data: {
                            element: event.target.tagName,
                            text: event.target.textContent?.substring(0, 50),
                            href: event.target.href
                        }
                    });
                }
            });
            
            // Track form submissions
            document.addEventListener('submit', function(event) {
                window.Sentry.addBreadcrumb({
                    message: 'Form submitted',
                    category: 'user',
                    data: {
                        form: event.target.tagName,
                        action: event.target.action
                    }
                });
            });
            
            // Expose Sentry for manual error tracking
            window.BerserkSentry = {
                trackBookingError: function(error, context) {
                    window.Sentry.captureException(error, {
                        tags: {
                            component: 'booking'
                        },
                        extra: context
                    });
                },
                
                trackPerformanceIssue: function(metric, value) {
                    window.Sentry.captureMessage(`Performance issue: ${metric}`, 'warning', {
                        extra: {
                            metric: metric,
                            value: value,
                            url: window.location.href
                        }
                    });
                },
                
                setUser: function(user) {
                    window.Sentry.setUser(user);
                },
                
                addContext: function(key, value) {
                    window.Sentry.setContext(key, value);
                }
            };
            
            // Log successful initialization
            window.Sentry.captureMessage('Sentry initialized successfully', 'info');
        }
    };
    
    script.onerror = function() {
        // Silently handle Sentry loading errors
        console.warn('Failed to load Sentry SDK');
    };
    
    document.head.appendChild(script);
    
})(typeof window !== 'undefined' ? window : global);
