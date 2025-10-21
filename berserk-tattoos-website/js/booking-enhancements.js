/**
 * Berserk Tattoos - Advanced Booking Enhancements
 * Features: Online deposits, automated reminders, referral tracking
 */

class BookingEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupOnlineDeposits();
        this.setupAppointmentReminders();
        this.setupReferralTracking();
        this.setupDigitalConsent();
        this.setupFeedbackSystem();
        this.setupCalendarIntegration();
    }

    // 1. Online Payment Integration (Square/PayPal)
    setupOnlineDeposits() {
        const depositSection = document.getElementById('deposit-section');
        if (!depositSection) return;

        // Create deposit options
        const depositOptions = `
            <div class="deposit-options">
                <h3>Secure Your Appointment</h3>
                <p>Pay a $50 deposit to confirm your booking</p>
                <div class="payment-methods">
                    <button class="payment-btn square-btn" data-method="square">
                        <span>💳</span> Pay with Square
                    </button>
                    <button class="payment-btn paypal-btn" data-method="paypal">
                        <span>💙</span> Pay with PayPal
                    </button>
                </div>
                <div class="deposit-info">
                    <small>Deposit is non-refundable but applies to your tattoo cost</small>
                </div>
            </div>
        `;

        depositSection.innerHTML = depositOptions;

        // Handle payment button clicks
        document.querySelectorAll('.payment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const method = e.currentTarget.dataset.method;
                this.processDeposit(method);
            });
        });
    }

    async processDeposit(method) {
        try {
            // Show loading state
            this.showLoading('Processing payment...');

            // Simulate payment processing
            const paymentData = {
                method: method,
                amount: 50,
                currency: 'AUD',
                description: 'Berserk Tattoos - Consultation Deposit',
                bookingId: this.generateBookingId()
            };

            // In production, integrate with actual payment processors
            if (method === 'square') {
                await this.processSquarePayment(paymentData);
            } else if (method === 'paypal') {
                await this.processPayPalPayment(paymentData);
            }

            // Track successful payment
            this.trackEvent('deposit_paid', {
                method: method,
                amount: 50,
                booking_id: paymentData.bookingId
            });

            // Show success message
            this.showSuccess('Deposit paid successfully! Your appointment is confirmed.');
            
            // Redirect to payment success page
            setTimeout(() => {
                window.location.href = '/payment-success.html';
            }, 2000);

        } catch (error) {
            console.error('Payment processing error:', error);
            this.showError('Payment failed. Please try again or contact us directly.');
        }
    }

    async processSquarePayment(data) {
        // Square integration would go here
        // For demo purposes, simulate successful payment
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true, transactionId: 'sq_' + Date.now() });
            }, 1500);
        });
    }

    async processPayPalPayment(data) {
        // PayPal integration would go here
        // For demo purposes, simulate successful payment
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true, transactionId: 'pp_' + Date.now() });
            }, 1500);
        });
    }

    // 2. Automated Appointment Reminders
    setupAppointmentReminders() {
        const reminderForm = document.getElementById('reminder-preferences');
        if (!reminderForm) return;

        // Add reminder options to booking form
        const reminderOptions = `
            <div class="reminder-section">
                <h4>Appointment Reminders</h4>
                <div class="reminder-options">
                    <label class="reminder-option">
                        <input type="checkbox" name="email-reminder" checked>
                        <span>Email reminder 24 hours before</span>
                    </label>
                    <label class="reminder-option">
                        <input type="checkbox" name="sms-reminder">
                        <span>SMS reminder 2 hours before</span>
                    </label>
                    <label class="reminder-option">
                        <input type="checkbox" name="phone-reminder">
                        <span>Phone call reminder 1 hour before</span>
                    </label>
                </div>
                <div class="reminder-note">
                    <small>Reminders help reduce no-shows and ensure you don't miss your appointment</small>
                </div>
            </div>
        `;

        reminderForm.innerHTML = reminderOptions;

        // Track reminder preferences
        document.querySelectorAll('input[name*="reminder"]').forEach(input => {
            input.addEventListener('change', () => {
                this.trackEvent('reminder_preference_changed', {
                    type: input.name,
                    enabled: input.checked
                });
            });
        });
    }

    // 3. Referral Program
    setupReferralTracking() {
        const referralSection = document.getElementById('referral-section');
        if (!referralSection) return;

        // Add referral code input
        const referralInput = `
            <div class="referral-section">
                <h4>Referral Program</h4>
                <p>Have a friend who referred you? Enter their code for 10% off!</p>
                <div class="referral-input">
                    <input type="text" id="referral-code" placeholder="Enter referral code">
                    <button type="button" id="apply-referral">Apply</button>
                </div>
                <div class="referral-benefits">
                    <h5>Referral Benefits:</h5>
                    <ul>
                        <li>10% discount for you</li>
                        <li>10% discount for your friend</li>
                        <li>Valid for first-time clients only</li>
                    </ul>
                </div>
            </div>
        `;

        referralSection.innerHTML = referralInput;

        // Handle referral code application
        document.getElementById('apply-referral').addEventListener('click', () => {
            const code = document.getElementById('referral-code').value.trim();
            if (code) {
                this.applyReferralCode(code);
            }
        });
    }

    async applyReferralCode(code) {
        try {
            // Validate referral code (in production, check against database)
            const validCodes = ['BERSERK10', 'FRIEND10', 'MELB2025'];
            
            if (validCodes.includes(code.toUpperCase())) {
                // Apply discount
                this.applyDiscount(10);
                this.showSuccess('Referral code applied! You saved 10%');
                
                // Track successful referral
                this.trackEvent('referral_applied', {
                    code: code,
                    discount: 10
                });
            } else {
                this.showError('Invalid referral code. Please check and try again.');
            }
        } catch (error) {
            console.error('Referral code error:', error);
            this.showError('Error applying referral code. Please contact us.');
        }
    }

    applyDiscount(percentage) {
        // Apply discount to booking form
        const priceInputs = document.querySelectorAll('input[name="estimated-price"]');
        priceInputs.forEach(input => {
            const originalPrice = parseFloat(input.dataset.originalPrice || input.value);
            const discountedPrice = originalPrice * (1 - percentage / 100);
            input.value = discountedPrice.toFixed(2);
            input.dataset.discountApplied = percentage;
        });

        // Update price display
        this.updatePriceDisplay();
    }

    // 4. Digital Consent Forms
    setupDigitalConsent() {
        const consentSection = document.getElementById('consent-section');
        if (!consentSection) return;

        const consentForm = `
            <div class="consent-section">
                <h4>Digital Consent & Waiver</h4>
                <div class="consent-form">
                    <div class="consent-item">
                        <label class="consent-checkbox">
                            <input type="checkbox" name="age-verification" required>
                            <span>I confirm I am 18 years or older</span>
                        </label>
                    </div>
                    <div class="consent-item">
                        <label class="consent-checkbox">
                            <input type="checkbox" name="health-disclosure" required>
                            <span>I have disclosed all relevant health conditions</span>
                        </label>
                    </div>
                    <div class="consent-item">
                        <label class="consent-checkbox">
                            <input type="checkbox" name="aftercare-understanding" required>
                            <span>I understand the aftercare instructions</span>
                        </label>
                    </div>
                    <div class="consent-item">
                        <label class="consent-checkbox">
                            <input type="checkbox" name="photo-consent">
                            <span>I consent to photos being taken for portfolio use</span>
                        </label>
                    </div>
                    <div class="consent-item">
                        <label class="consent-checkbox">
                            <input type="checkbox" name="marketing-consent">
                            <span>I consent to receiving marketing communications</span>
                        </label>
                    </div>
                </div>
                <div class="consent-note">
                    <small>Digital consent is legally binding. Please read carefully before agreeing.</small>
                </div>
            </div>
        `;

        consentSection.innerHTML = consentForm;

        // Track consent changes
        document.querySelectorAll('input[name*="consent"]').forEach(input => {
            input.addEventListener('change', () => {
                this.trackEvent('consent_changed', {
                    type: input.name,
                    agreed: input.checked
                });
            });
        });
    }

    // 5. Client Feedback System
    setupFeedbackSystem() {
        // Add feedback request to thank you page
        const feedbackSection = document.getElementById('feedback-section');
        if (!feedbackSection) return;

        const feedbackForm = `
            <div class="feedback-section">
                <h4>How was your experience?</h4>
                <p>Help us improve by sharing your feedback</p>
                <div class="feedback-form">
                    <div class="rating-section">
                        <label>Overall Rating:</label>
                        <div class="star-rating">
                            <input type="radio" name="rating" value="5" id="star5">
                            <label for="star5">★</label>
                            <input type="radio" name="rating" value="4" id="star4">
                            <label for="star4">★</label>
                            <input type="radio" name="rating" value="3" id="star3">
                            <label for="star3">★</label>
                            <input type="radio" name="rating" value="2" id="star2">
                            <label for="star2">★</label>
                            <input type="radio" name="rating" value="1" id="star1">
                            <label for="star1">★</label>
                        </div>
                    </div>
                    <div class="feedback-text">
                        <label for="feedback-text">Comments (optional):</label>
                        <textarea id="feedback-text" placeholder="Tell us about your experience..."></textarea>
                    </div>
                    <button type="button" id="submit-feedback">Submit Feedback</button>
                </div>
            </div>
        `;

        feedbackSection.innerHTML = feedbackForm;

        // Handle feedback submission
        document.getElementById('submit-feedback').addEventListener('click', () => {
            this.submitFeedback();
        });
    }

    async submitFeedback() {
        const rating = document.querySelector('input[name="rating"]:checked');
        const comments = document.getElementById('feedback-text').value;

        if (!rating) {
            this.showError('Please select a rating');
            return;
        }

        try {
            // Submit feedback (in production, send to backend)
            const feedbackData = {
                rating: rating.value,
                comments: comments,
                timestamp: new Date().toISOString(),
                sessionId: this.getSessionId()
            };

            // Track feedback submission
            this.trackEvent('feedback_submitted', {
                rating: feedbackData.rating,
                has_comments: feedbackData.comments.length > 0
            });

            this.showSuccess('Thank you for your feedback!');
            
            // Clear form
            document.querySelectorAll('input[name="rating"]').forEach(input => {
                input.checked = false;
            });
            document.getElementById('feedback-text').value = '';

        } catch (error) {
            console.error('Feedback submission error:', error);
            this.showError('Error submitting feedback. Please try again.');
        }
    }

    // 6. Calendar Integration
    setupCalendarIntegration() {
        const calendarSection = document.getElementById('calendar-section');
        if (!calendarSection) return;

        // Add real-time availability display
        const calendarWidget = `
            <div class="calendar-section">
                <h4>Available Appointments</h4>
                <div class="calendar-widget">
                    <div class="calendar-header">
                        <button id="prev-month">‹</button>
                        <h5 id="current-month">October 2025</h5>
                        <button id="next-month">›</button>
                    </div>
                    <div class="calendar-grid" id="calendar-grid">
                        <!-- Calendar will be populated by JavaScript -->
                    </div>
                    <div class="time-slots" id="time-slots">
                        <!-- Time slots will be populated when date is selected -->
                    </div>
                </div>
            </div>
        `;

        calendarSection.innerHTML = calendarWidget;

        // Initialize calendar
        this.initializeCalendar();
    }

    initializeCalendar() {
        const currentDate = new Date();
        this.currentMonth = currentDate.getMonth();
        this.currentYear = currentDate.getFullYear();
        
        this.renderCalendar();
        this.setupCalendarEvents();
    }

    renderCalendar() {
        const calendarGrid = document.getElementById('calendar-grid');
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        
        // Update month display
        document.getElementById('current-month').textContent = 
            `${monthNames[this.currentMonth]} ${this.currentYear}`;

        // Generate calendar days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        let calendarHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            calendarHTML += `<div class="day-header">${day}</div>`;
        });

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDay; i++) {
            calendarHTML += '<div class="day empty"></div>';
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isAvailable = this.isDateAvailable(day);
            const isToday = this.isToday(day);
            const className = `day ${isAvailable ? 'available' : 'unavailable'} ${isToday ? 'today' : ''}`;
            
            calendarHTML += `<div class="${className}" data-day="${day}">${day}</div>`;
        }

        calendarGrid.innerHTML = calendarHTML;

        // Add click handlers for available days
        document.querySelectorAll('.day.available').forEach(day => {
            day.addEventListener('click', () => {
                this.selectDate(parseInt(day.dataset.day));
            });
        });
    }

    isDateAvailable(day) {
        // In production, check against actual availability
        // For demo, simulate some unavailable dates
        const date = new Date(this.currentYear, this.currentMonth, day);
        const dayOfWeek = date.getDay();
        
        // Studio closed on Tuesdays
        if (dayOfWeek === 2) return false;
        
        // Random unavailable dates for demo
        const unavailableDays = [5, 12, 19, 26];
        if (unavailableDays.includes(day)) return false;
        
        return true;
    }

    isToday(day) {
        const today = new Date();
        return today.getDate() === day && 
               today.getMonth() === this.currentMonth && 
               today.getFullYear() === this.currentYear;
    }

    selectDate(day) {
        // Remove previous selection
        document.querySelectorAll('.day.selected').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selection to clicked day
        document.querySelector(`[data-day="${day}"]`).classList.add('selected');

        // Show available time slots
        this.showTimeSlots(day);
    }

    showTimeSlots(day) {
        const timeSlots = document.getElementById('time-slots');
        const selectedDate = new Date(this.currentYear, this.currentMonth, day);
        
        // Generate time slots (in production, fetch from backend)
        const availableSlots = this.getAvailableTimeSlots(selectedDate);
        
        let slotsHTML = `<h5>Available Times for ${selectedDate.toLocaleDateString()}</h5>`;
        
        if (availableSlots.length > 0) {
            slotsHTML += '<div class="time-slot-grid">';
            availableSlots.forEach(slot => {
                slotsHTML += `<button class="time-slot" data-time="${slot}">${slot}</button>`;
            });
            slotsHTML += '</div>';
        } else {
            slotsHTML += '<p>No available times for this date.</p>';
        }

        timeSlots.innerHTML = slotsHTML;

        // Add click handlers for time slots
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.addEventListener('click', () => {
                this.selectTimeSlot(slot.dataset.time);
            });
        });
    }

    getAvailableTimeSlots(date) {
        // In production, fetch from backend
        // For demo, generate some sample slots
        const dayOfWeek = date.getDay();
        
        if (dayOfWeek === 0) { // Sunday
            return ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
        } else if (dayOfWeek === 2) { // Tuesday
            return ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
        } else {
            return ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
        }
    }

    selectTimeSlot(time) {
        // Remove previous selection
        document.querySelectorAll('.time-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selection to clicked slot
        document.querySelector(`[data-time="${time}"]`).classList.add('selected');

        // Update booking form with selected date/time
        this.updateBookingForm(time);
    }

    updateBookingForm(time) {
        const selectedDate = document.querySelector('.day.selected');
        const selectedDay = selectedDate.dataset.day;
        const selectedDateObj = new Date(this.currentYear, this.currentMonth, selectedDay);
        
        // Update form fields
        const dateInput = document.querySelector('input[name="preferred-date"]');
        const timeInput = document.querySelector('input[name="preferred-time"]');
        
        if (dateInput) dateInput.value = selectedDateObj.toISOString().split('T')[0];
        if (timeInput) timeInput.value = time;

        // Track appointment selection
        this.trackEvent('appointment_selected', {
            date: selectedDateObj.toISOString().split('T')[0],
            time: time
        });
    }

    setupCalendarEvents() {
        // Previous month button
        document.getElementById('prev-month').addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.renderCalendar();
        });

        // Next month button
        document.getElementById('next-month').addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.renderCalendar();
        });
    }

    // Utility Methods
    generateBookingId() {
        return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('berserk_session_id');
        if (!sessionId) {
            sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('berserk_session_id', sessionId);
        }
        return sessionId;
    }

    trackEvent(eventName, parameters = {}) {
        // Google Analytics event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'booking_enhancement',
                ...parameters
            });
        }

    }

    showLoading(message) {
        // Show loading state
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-overlay';
        loadingDiv.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(loadingDiv);
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    updatePriceDisplay() {
        // Update price display in booking form
        const priceDisplay = document.getElementById('price-display');
        if (priceDisplay) {
            const priceInput = document.querySelector('input[name="estimated-price"]');
            if (priceInput) {
                priceDisplay.textContent = `$${priceInput.value}`;
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BookingEnhancements();
});

// Export for use in other scripts
window.BookingEnhancements = BookingEnhancements;
