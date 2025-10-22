/**
 * Conversion Optimization for Berserk Tattoos
 * Subtle enhancements to improve booking conversions while maintaining artistic credibility
 *
 * Features:
 * - Smart availability indicators
 * - Trust signal reinforcement
 * - Friction reduction in booking flow
 * - Mobile-optimized CTAs
 */

(function(window) {
    'use strict';

    const ConversionOptimizer = {
        // Configuration
        config: {
            // Show "X spots left this week" when availability is low
            lowAvailabilityThreshold: 5,
            // Update availability every 5 minutes
            availabilityUpdateInterval: 300000,
            // Consultation types and their conversion value
            consultationTypes: {
                phone: { priority: 'high', freeValue: true },
                inPerson: { priority: 'medium', depositValue: 100 }
            }
        },

        init: function() {
            if (window.BerserkLogger) {
                window.BerserkLogger.debug('Conversion Optimizer initialized');
            }

            this.enhanceBookingButtons();
            this.addHelpfulTooltips();
            this.optimizeMobileCTAs();
            this.addTrustSignals();
            this.setupExitIntentCapture();
        },

        // Enhance all booking buttons with better UX
        enhanceBookingButtons: function() {
            const bookButtons = document.querySelectorAll('a[href="book.html"], a[href="/book.html"]');

            bookButtons.forEach(button => {
                // Add loading state prevention
                button.addEventListener('click', function(e) {
                    if (button.classList.contains('loading')) {
                        e.preventDefault();
                        return;
                    }

                    // Add loading state
                    button.classList.add('loading');
                    button.dataset.originalText = button.textContent;
                    button.textContent = 'Loading...';

                    // Remove loading after a short delay if navigation hasn't occurred
                    setTimeout(() => {
                        if (button.classList.contains('loading')) {
                            button.classList.remove('loading');
                            button.textContent = button.dataset.originalText;
                        }
                    }, 3000);
                });

                // Add hover analytics (non-intrusive)
                let hoverTime = 0;
                let hoverInterval;

                button.addEventListener('mouseenter', () => {
                    hoverTime = 0;
                    hoverInterval = setInterval(() => {
                        hoverTime += 100;
                        // Track engaged users (hover > 1 second)
                        if (hoverTime === 1000 && window.gtag) {
                            window.gtag('event', 'engaged_with_cta', {
                                event_category: 'engagement',
                                event_label: button.textContent.trim()
                            });
                        }
                    }, 100);
                });

                button.addEventListener('mouseleave', () => {
                    clearInterval(hoverInterval);
                });
            });
        },

        // Add helpful tooltips to reduce uncertainty
        addHelpfulTooltips: function() {
            const consultationButtons = document.querySelectorAll('[href*="book"]');

            consultationButtons.forEach(button => {
                const buttonText = button.textContent.toLowerCase();

                // Add subtle tooltip for "free" consultations
                if (buttonText.includes('free') || buttonText.includes('consultation')) {
                    button.title = '15-minute call with our team. No commitment required.';
                }

                // Add deposit clarification
                if (buttonText.includes('$100') || buttonText.includes('deposit')) {
                    button.title = 'Fully credited toward your tattoo. Secures your booking.';
                }
            });
        },

        // Optimize CTAs for mobile users
        optimizeMobileCTAs: function() {
            // Detect mobile
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (!isMobile) return;

            // Make phone number clickable
            const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
            phoneNumbers.forEach(link => {
                link.style.cssText = `
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: var(--color-accent, #7B1113);
                    color: var(--color-light, #F2F2F2);
                    border-radius: 4px;
                    text-decoration: none;
                    font-weight: 600;
                    margin-top: 0.5rem;
                `;
                link.innerHTML = `📞 ${link.textContent}`;
            });

            // Sticky mobile CTA (non-intrusive)
            this.addStickyMobileCTA();
        },

        // Add sticky booking button on mobile (appears after scroll)
        addStickyMobileCTA: function() {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (!isMobile) return;

            // Check if sticky CTA already exists
            if (document.getElementById('sticky-mobile-cta')) return;

            // Create sticky CTA
            const stickyCTA = document.createElement('div');
            stickyCTA.id = 'sticky-mobile-cta';
            stickyCTA.style.cssText = `
                position: fixed;
                bottom: -100px;
                left: 0;
                right: 0;
                background: var(--color-accent, #7B1113);
                padding: 1rem;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
                z-index: 1000;
                transition: bottom 0.3s ease;
                text-align: center;
            `;

            stickyCTA.innerHTML = `
                <a href="/book.html" style="
                    color: var(--color-light, #F2F2F2);
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1.1rem;
                    display: block;
                ">BOOK FREE CONSULTATION</a>
                <button id="close-sticky-cta" style="
                    position: absolute;
                    top: 0.5rem;
                    right: 0.5rem;
                    background: none;
                    border: none;
                    color: var(--color-light, #F2F2F2);
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    line-height: 1;
                ">&times;</button>
            `;

            document.body.appendChild(stickyCTA);

            // Show after user scrolls down
            let scrollThreshold = 500;
            let dismissed = localStorage.getItem('stickyCtaDismissed');

            if (!dismissed) {
                window.addEventListener('scroll', function showSticky() {
                    if (window.scrollY > scrollThreshold && !dismissed) {
                        stickyCTA.style.bottom = '0';
                    } else {
                        stickyCTA.style.bottom = '-100px';
                    }
                });
            }

            // Allow dismissal
            document.getElementById('close-sticky-cta').addEventListener('click', (e) => {
                e.preventDefault();
                stickyCTA.style.bottom = '-100px';
                localStorage.setItem('stickyCtaDismissed', Date.now());
                dismissed = true;
            });

            // Auto-dismiss after 24 hours
            if (dismissed && (Date.now() - parseInt(dismissed)) > 86400000) {
                localStorage.removeItem('stickyCtaDismissed');
            }
        },

        // Add trust signals dynamically
        addTrustSignals: function() {
            // Add subtle "as featured on" badge if near booking buttons
            const heroSection = document.querySelector('.hero, [class*="hero"]');

            if (heroSection && !document.getElementById('trust-badge')) {
                const trustBadge = document.createElement('div');
                trustBadge.id = 'trust-badge';
                trustBadge.style.cssText = `
                    margin-top: 1rem;
                    opacity: 0.8;
                    font-size: 0.875rem;
                    color: var(--color-light, #F2F2F2);
                `;
                trustBadge.innerHTML = `
                    <span style="margin-right: 0.5rem;">✓</span>
                    Licensed & Insured Studio
                    <span style="margin: 0 0.5rem;">•</span>
                    247+ Five-Star Reviews
                `;

                // Insert after first CTA if found
                const firstCTA = heroSection.querySelector('a[href*="book"]');
                if (firstCTA && firstCTA.parentNode) {
                    firstCTA.parentNode.insertBefore(trustBadge, firstCTA.nextSibling);
                }
            }
        },

        // Capture exit intent on booking page (subtle, not popup)
        setupExitIntentCapture: function() {
            // Only on booking page
            if (!window.location.pathname.includes('book')) return;

            let exitIntentTriggered = false;

            document.addEventListener('mouseleave', (e) => {
                // Only trigger if mouse leaves from top of page (intent to close tab/window)
                if (e.clientY < 0 && !exitIntentTriggered) {
                    exitIntentTriggered = true;

                    // Subtle reminder (not a popup)
                    const reminder = document.querySelector('.booking-help, .help-text');
                    if (reminder) {
                        reminder.innerHTML = `
                            <strong>💡 Quick reminder:</strong> Phone consultations are 100% free.
                            No credit card required to schedule a call.
                        `;
                        reminder.style.cssText = `
                            padding: 1rem;
                            background: rgba(123, 17, 19, 0.1);
                            border-left: 3px solid var(--color-accent, #7B1113);
                            margin: 1rem 0;
                        `;

                        // Track exit intent
                        if (window.gtag) {
                            window.gtag('event', 'exit_intent_triggered', {
                                event_category: 'engagement',
                                event_label: 'booking_page'
                            });
                        }
                    }
                }
            });
        },

        // Get conversion rate data (for internal analytics)
        getConversionMetrics: function() {
            const metrics = {
                ctaClicks: localStorage.getItem('ctaClicks') || 0,
                pageViews: localStorage.getItem('pageViews') || 0,
                bookingStarts: localStorage.getItem('bookingStarts') || 0,
                bookingCompletions: localStorage.getItem('bookingCompletions') || 0
            };

            return {
                ...metrics,
                conversionRate: metrics.pageViews > 0
                    ? ((metrics.bookingCompletions / metrics.pageViews) * 100).toFixed(2) + '%'
                    : '0%'
            };
        },

        // Track page view (non-PII)
        trackPageView: function() {
            const views = parseInt(localStorage.getItem('pageViews') || '0');
            localStorage.setItem('pageViews', views + 1);
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            ConversionOptimizer.init();
            ConversionOptimizer.trackPageView();
        });
    } else {
        ConversionOptimizer.init();
        ConversionOptimizer.trackPageView();
    }

    // Expose globally
    window.BerserkConversionOptimizer = ConversionOptimizer;

})(window);
