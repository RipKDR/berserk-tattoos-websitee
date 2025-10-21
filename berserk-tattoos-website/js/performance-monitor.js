/* Performance Monitoring Script - Berserk Tattoos */
/* This script tracks real-world performance metrics across different browsers */

(function() {
    'use strict';
    
    // Only run in production or if explicitly enabled
    var DEBUG_MODE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // Performance data collector
    var PerformanceMonitor = {
        metrics: {},
        browserInfo: {},
        
        init: function() {
            // Detect browser information
            this.detectBrowser();
            
            // Collect performance metrics
            if (window.performance && window.performance.timing) {
                this.collectMetrics();
            }
            
            // Monitor long tasks
            if ('PerformanceObserver' in window) {
                this.monitorLongTasks();
            }
            
            // Monitor resource loading
            this.monitorResources();
            
            // Log metrics in debug mode
            if (DEBUG_MODE) {
                this.logMetrics();
            }
            
            // Send metrics to analytics (in production)
            this.sendMetrics();
        },
        
        detectBrowser: function() {
            var ua = navigator.userAgent;
            var browser = {
                name: 'Unknown',
                version: '',
                platform: navigator.platform,
                mobile: /Mobile|Android|iPhone|iPad/.test(ua)
            };
            
            if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) {
                browser.name = 'Chrome';
                browser.version = ua.match(/Chrome\/(\d+)/)[1];
            } else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
                browser.name = 'Safari';
                browser.version = ua.match(/Version\/(\d+)/)[1];
            } else if (ua.indexOf('Firefox') > -1) {
                browser.name = 'Firefox';
                browser.version = ua.match(/Firefox\/(\d+)/)[1];
            } else if (ua.indexOf('Edg') > -1) {
                browser.name = 'Edge';
                browser.version = ua.match(/Edg\/(\d+)/)[1];
            } else if (ua.indexOf('Trident') > -1) {
                browser.name = 'IE';
                browser.version = '11';
            }
            
            this.browserInfo = browser;
        },
        
        collectMetrics: function() {
            var timing = window.performance.timing;
            var navigation = window.performance.navigation;
            
            // Calculate key metrics
            this.metrics = {
                // Network timings
                dns: timing.domainLookupEnd - timing.domainLookupStart,
                tcp: timing.connectEnd - timing.connectStart,
                ttfb: timing.responseStart - timing.navigationStart,
                
                // Document processing
                domProcessing: timing.domComplete - timing.domLoading,
                domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
                loadComplete: timing.loadEventEnd - timing.navigationStart,
                
                // User-centric metrics
                firstPaint: 0,
                firstContentfulPaint: 0,
                largestContentfulPaint: 0,
                
                // Page info
                transferSize: 0,
                resourceCount: 0,
                navigationType: navigation.type // 0=navigate, 1=reload, 2=back/forward
            };
            
            // Get paint timings if available
            if ('PerformancePaintTiming' in window) {
                var paintEntries = performance.getEntriesByType('paint');
                paintEntries.forEach(function(entry) {
                    if (entry.name === 'first-paint') {
                        this.metrics.firstPaint = Math.round(entry.startTime);
                    } else if (entry.name === 'first-contentful-paint') {
                        this.metrics.firstContentfulPaint = Math.round(entry.startTime);
                    }
                }.bind(this));
            }
            
            // Get resource timings
            if (performance.getEntriesByType) {
                var resources = performance.getEntriesByType('resource');
                this.metrics.resourceCount = resources.length;
                
                // Calculate total transfer size
                var totalSize = 0;
                resources.forEach(function(resource) {
                    if (resource.transferSize) {
                        totalSize += resource.transferSize;
                    }
                });
                this.metrics.transferSize = totalSize;
            }
        },
        
        monitorLongTasks: function() {
            try {
                var observer = new PerformanceObserver(function(list) {
                    var entries = list.getEntries();
                    entries.forEach(function(entry) {
                        if (entry.duration > 50) { // Tasks longer than 50ms
                            if (DEBUG_MODE) {
                                console.warn('Long task detected:', {
                                    duration: Math.round(entry.duration) + 'ms',
                                    startTime: Math.round(entry.startTime) + 'ms'
                                });
                            }
                        }
                    });
                });
                
                // Only observe if longtask is supported
                if (PerformanceObserver.supportedEntryTypes && 
                    PerformanceObserver.supportedEntryTypes.includes('longtask')) {
                    observer.observe({ entryTypes: ['longtask'] });
                }
            } catch (e) {
                // PerformanceObserver not supported or longtask not available
            }
        },
        
        monitorResources: function() {
            window.addEventListener('load', function() {
                if (performance.getEntriesByType) {
                    var resources = performance.getEntriesByType('resource');
                    
                    // Group resources by type
                    var resourceTypes = {};
                    resources.forEach(function(resource) {
                        var type = resource.initiatorType || 'other';
                        if (!resourceTypes[type]) {
                            resourceTypes[type] = {
                                count: 0,
                                totalDuration: 0,
                                totalSize: 0
                            };
                        }
                        
                        resourceTypes[type].count++;
                        resourceTypes[type].totalDuration += resource.duration;
                        if (resource.transferSize) {
                            resourceTypes[type].totalSize += resource.transferSize;
                        }
                    });
                    
                    this.metrics.resourceTypes = resourceTypes;
                }
            }.bind(this));
        },
        
        logMetrics: function() {
            // Only log in development mode
            if (!DEBUG_MODE) return;
            
            window.addEventListener('load', function() {
                setTimeout(function() {
                    console.log('=== Performance Metrics ===');
                    console.log('Browser:', this.browserInfo.name, this.browserInfo.version);
                    console.log('Platform:', this.browserInfo.platform);
                    console.log('Mobile:', this.browserInfo.mobile);
                    console.log('');
                    console.log('Load Metrics:');
                    console.log('- DNS Lookup:', this.metrics.dns + 'ms');
                    console.log('- TCP Connect:', this.metrics.tcp + 'ms');
                    console.log('- Time to First Byte:', this.metrics.ttfb + 'ms');
                    console.log('- DOM Processing:', this.metrics.domProcessing + 'ms');
                    console.log('- DOM Content Loaded:', this.metrics.domContentLoaded + 'ms');
                    console.log('- Page Load Complete:', this.metrics.loadComplete + 'ms');
                    console.log('');
                    console.log('Paint Metrics:');
                    console.log('- First Paint:', this.metrics.firstPaint + 'ms');
                    console.log('- First Contentful Paint:', this.metrics.firstContentfulPaint + 'ms');
                    console.log('');
                    console.log('Resources:');
                    console.log('- Total Resources:', this.metrics.resourceCount);
                    console.log('- Total Size:', Math.round(this.metrics.transferSize / 1024) + 'KB');
                    
                    if (this.metrics.resourceTypes) {
                        console.log('- Resource Breakdown:', this.metrics.resourceTypes);
                    }
                }.bind(this), 100);
            }.bind(this));
        },
        
        sendMetrics: function() {
            // In production, send metrics to analytics
            window.addEventListener('load', function() {
                setTimeout(function() {
                    // Only send if Google Analytics is loaded
                    if (typeof gtag !== 'undefined') {
                        // Send custom events for performance monitoring
                        gtag('event', 'performance', {
                            event_category: 'Performance',
                            event_label: 'Page Load',
                            value: Math.round(this.metrics.loadComplete),
                            browser_name: this.browserInfo.name,
                            browser_version: this.browserInfo.version,
                            is_mobile: this.browserInfo.mobile,
                            time_to_first_byte: this.metrics.ttfb,
                            first_contentful_paint: this.metrics.firstContentfulPaint
                        });
                        
                        // Track slow page loads
                        if (this.metrics.loadComplete > 3000) {
                            gtag('event', 'slow_page_load', {
                                event_category: 'Performance',
                                event_label: 'Slow Load',
                                value: Math.round(this.metrics.loadComplete),
                                browser_name: this.browserInfo.name
                            });
                        }
                    }
                }.bind(this), 1000);
            }.bind(this));
        },
        
        // Public API for getting metrics
        getMetrics: function() {
            return {
                browser: this.browserInfo,
                metrics: this.metrics,
                timestamp: new Date().toISOString()
            };
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            PerformanceMonitor.init();
        });
    } else {
        PerformanceMonitor.init();
    }
    
    // Expose to global scope for debugging
    if (DEBUG_MODE) {
        window.BerserkPerformance = PerformanceMonitor;
    }
})();
