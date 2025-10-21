/**
 * Booking Wizard
 * 5-step booking flow with form persistence, validation, and Stripe integration
 * Professional, mobile-first implementation
 */

class BookingWizard {
  constructor(options = {}) {
    this.currentStep = 1;
    this.totalSteps = 5;
    this.formData = {};
    this.storageKey = 'berserk_booking_data';

    // Options
    this.onComplete = options.onComplete || this.handleComplete.bind(this);
    this.onStepChange = options.onStepChange || null;

    // Elements
    this.wizardContainer = document.querySelector('.booking-wizard');
    this.progressBar = document.querySelector('.progress-bar');
    this.progressSteps = document.querySelectorAll('.progress-step');
    this.wizardSteps = document.querySelectorAll('.wizard-step');
    this.prevBtn = document.querySelector('.wizard-btn-prev');
    this.nextBtn = document.querySelector('.wizard-btn-next');

    // Initialize
    this.init();
  }

  init() {
    // Load saved data
    this.loadFormData();

    // Set up event listeners
    this.setupEventListeners();

    // Show first step
    this.showStep(1);

    // Auto-save on form changes
    this.setupAutoSave();
  }

  setupEventListeners() {
    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousStep());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextStep());
    }

    // Consultation type selection
    const consultationOptions = document.querySelectorAll('.consultation-option');
    consultationOptions.forEach(option => {
      option.addEventListener('click', () => this.selectConsultation(option));
      option.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectConsultation(option);
        }
      });
    });

    // Artist selection
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
      card.addEventListener('click', () => this.selectArtist(card));
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectArtist(card);
        }
      });
    });

    // Form validation on blur
    const formInputs = this.wizardContainer.querySelectorAll('.form-input, .form-select, .form-textarea');
    formInputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' && !e.target.matches('input, textarea, select')) {
        this.nextStep();
      } else if (e.key === 'ArrowLeft' && !e.target.matches('input, textarea, select')) {
        this.previousStep();
      }
    });
  }

  setupAutoSave() {
    // Save form data on any change
    const formInputs = this.wizardContainer.querySelectorAll('.form-input, .form-select, .form-textarea');
    formInputs.forEach(input => {
      input.addEventListener('change', () => this.saveFormData());
      input.addEventListener('input', () => {
        // Debounce text inputs
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => this.saveFormData(), 500);
      });
    });
  }

  showStep(stepNumber) {
    // Update current step
    this.currentStep = stepNumber;

    // Hide all steps
    this.wizardSteps.forEach(step => {
      step.classList.remove('active');
    });

    // Show current step
    const currentStepEl = document.querySelector(`.wizard-step[data-step="${stepNumber}"]`);
    if (currentStepEl) {
      currentStepEl.classList.add('active');
    }

    // Update progress bar
    const progress = ((stepNumber - 1) / (this.totalSteps - 1)) * 100;
    this.progressBar.style.width = `${progress}%`;

    // Update progress steps
    this.progressSteps.forEach((step, index) => {
      const stepNum = index + 1;
      step.classList.remove('active', 'completed');

      if (stepNum === stepNumber) {
        step.classList.add('active');
      } else if (stepNum < stepNumber) {
        step.classList.add('completed');
      }
    });

    // Update navigation buttons
    if (this.prevBtn) {
      this.prevBtn.disabled = stepNumber === 1;
      this.prevBtn.style.opacity = stepNumber === 1 ? '0.5' : '1';
    }

    if (this.nextBtn) {
      if (stepNumber === this.totalSteps) {
        this.nextBtn.textContent = 'Complete Booking';
        this.nextBtn.classList.add('wizard-btn-complete');
      } else {
        this.nextBtn.textContent = 'Next Step';
        this.nextBtn.classList.remove('wizard-btn-complete');
      }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Callback
    if (this.onStepChange) {
      this.onStepChange(stepNumber);
    }

    // Update summary if on final step
    if (stepNumber === this.totalSteps) {
      this.updateSummary();
    }
  }

  nextStep() {
    // Validate current step
    if (!this.validateCurrentStep()) {
      return;
    }

    // Save form data
    this.saveFormData();

    // Move to next step
    if (this.currentStep < this.totalSteps) {
      this.showStep(this.currentStep + 1);
    } else {
      // Last step - complete booking
      this.onComplete();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.showStep(this.currentStep - 1);
    }
  }

  selectConsultation(option) {
    // Remove previous selections
    document.querySelectorAll('.consultation-option').forEach(opt => {
      opt.classList.remove('selected');
    });

    // Select clicked option
    option.classList.add('selected');

    // Get consultation type
    const consultationType = option.dataset.consultation;
    const hiddenInput = document.querySelector('input[name="consultationType"]');
    if (hiddenInput) {
      hiddenInput.value = consultationType;
    }

    // Store in form data
    this.formData.consultationType = consultationType;

    // Update consultation fee display
    const feeDisplay = document.getElementById('consultation-fee-display');
    const creditNote = document.getElementById('credit-note');
    
    if (consultationType === 'phone') {
      if (feeDisplay) feeDisplay.textContent = '$0.00';
      if (creditNote) creditNote.style.display = 'none';
    } else if (consultationType === 'in-person') {
      if (feeDisplay) feeDisplay.textContent = '$100.00';
      if (creditNote) creditNote.style.display = 'block';
    }

    // Show artist selection after consultation type is selected
    const artistWrapper = document.querySelector('.artist-selection-wrapper');
    if (artistWrapper) {
      artistWrapper.style.display = 'block';
      // Smooth scroll to artist selection
      setTimeout(() => {
        artistWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

    // Save form data
    this.saveFormData();
  }

  selectArtist(card) {
    // Remove previous selections
    document.querySelectorAll('.artist-card').forEach(c => {
      c.classList.remove('selected');
    });

    // Select clicked card
    card.classList.add('selected');

    // Update hidden input
    const artistId = card.dataset.artistId;
    const artistName = card.querySelector('.artist-name')?.textContent || '';
    const hiddenInput = document.querySelector('input[name="artist"]');
    if (hiddenInput) {
      hiddenInput.value = artistId;
    }

    // Store in form data
    this.formData.artist = artistId;
    this.formData.artistName = artistName;

    // Save to localStorage
    this.saveFormData();

  }

  validateCurrentStep() {
    const currentStepEl = document.querySelector(`.wizard-step[data-step="${this.currentStep}"]`);
    if (!currentStepEl) return true;

    const requiredFields = currentStepEl.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    // Special validation for step 1 (consultation type and artist selection)
    if (this.currentStep === 1) {
      const selectedConsultation = document.querySelector('.consultation-option.selected');
      if (!selectedConsultation) {
        this.showError('Please select a consultation type to continue');
        isValid = false;
      }
      
      const selectedArtist = document.querySelector('.artist-card.selected');
      if (!selectedArtist) {
        this.showError('Please select an artist to continue');
        isValid = false;
      }
    }

    // Special validation for step 3 (calendar selection)
    if (this.currentStep === 3) {
      if (!this.formData.appointmentDate || !this.formData.appointmentTime) {
        this.showError('Please select a date and time for your consultation');
        isValid = false;
      }
    }

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    // Update field state
    if (!isValid) {
      field.classList.add('error');
      this.showFieldError(field, errorMessage);
    } else {
      field.classList.remove('error');
      this.clearFieldError(field);
    }

    return isValid;
  }

  showFieldError(field, message) {
    // Remove existing error
    this.clearFieldError(field);

    // Create error element
    const errorEl = document.createElement('div');
    errorEl.className = 'form-error visible';
    errorEl.textContent = message;

    // Insert after field
    field.parentNode.appendChild(errorEl);
  }

  clearFieldError(field) {
    const errorEl = field.parentNode.querySelector('.form-error');
    if (errorEl) {
      errorEl.remove();
    }
    field.classList.remove('error');
  }

  showError(message) {
    // Remove existing error
    const existingError = this.wizardContainer.querySelector('.wizard-error');
    if (existingError) {
      existingError.remove();
    }

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'wizard-error';
    errorDiv.style.cssText = `
            padding: 1rem;
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid var(--color-error);
            color: var(--color-error);
            border-radius: 4px;
            margin: 1rem 0;
            font-size: 0.875rem;
        `;
    errorDiv.textContent = message;

    // Insert at top of current step
    const currentStepEl = document.querySelector(`.wizard-step[data-step="${this.currentStep}"]`);
    if (currentStepEl) {
      currentStepEl.insertBefore(errorDiv, currentStepEl.firstChild);
    }

    // Scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (errorDiv && errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }

  saveFormData() {
    // Collect form data
    const formInputs = this.wizardContainer.querySelectorAll('.form-input, .form-select, .form-textarea');
    formInputs.forEach(input => {
      if (input.name) {
        this.formData[input.name] = input.value;
      }
    });

    // Save to localStorage
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.formData));
    } catch (e) {
      // Silently handle localStorage errors in production
    }
  }

  loadFormData() {
    try {
      const savedData = localStorage.getItem(this.storageKey);
      if (savedData) {
        this.formData = JSON.parse(savedData);

        // Restore form values
        Object.keys(this.formData).forEach(key => {
          const input = this.wizardContainer.querySelector(`[name="${key}"]`);
          if (input) {
            input.value = this.formData[key];
          }
        });

        // Restore artist selection
        if (this.formData.artist) {
          const artistCard = document.querySelector(`.artist-card[data-artist-id="${this.formData.artist}"]`);
          if (artistCard) {
            artistCard.classList.add('selected');
          }
        }

      }
    } catch (e) {
      // Silently handle localStorage errors in production
    }
  }

  clearFormData() {
    try {
      localStorage.removeItem(this.storageKey);
      this.formData = {};
    } catch (e) {
      // Silently handle localStorage errors in production
    }
  }

  updateSummary() {
    // Update summary display with collected form data
    const summaryItems = {
      artist: this.formData.artistName || 'Not selected',
      firstName: this.formData.firstName || '',
      lastName: this.formData.lastName || '',
      email: this.formData.email || '',
      phone: this.formData.phone || '',
      placement: this.formData.placement || 'Not specified',
      size: this.formData.size || 'Not specified',
      description: this.formData.description || '',
      appointmentDate: this.formData.appointmentDate || 'Not selected',
      appointmentTime: this.formData.appointmentTime || 'Not selected',
      budget: this.formData.budget || 'To be discussed'
    };

    // Update summary elements
    Object.keys(summaryItems).forEach(key => {
      const summaryEl = document.querySelector(`[data-summary="${key}"]`);
      if (summaryEl) {
        summaryEl.textContent = summaryItems[key];
      }
    });

    // Calculate estimated price
    this.updatePriceEstimate();
  }

  updatePriceEstimate() {
    const size = this.formData.size;
    let estimate = '$0';

    const priceMap = {
      'small': '$500 - $1,000',
      'medium': '$1,000 - $2,500',
      'large': '$2,500 - $5,000',
      'extra-large': '$5,000 - $10,000',
      'sleeve': '$10,000+'
    };

    estimate = priceMap[size] || '$0';

    const priceEl = document.querySelector('[data-summary="price"]');
    if (priceEl) {
      priceEl.textContent = estimate;
    }
  }

  handleComplete() {
    // Validate final step
    if (!this.validateCurrentStep()) {
      return;
    }

    // Show loading state
    this.showLoading();

    // Submit booking and redirect to Stripe
    this.submitBooking();
  }

  showLoading() {
    const loadingEl = document.querySelector('.wizard-loading');
    if (loadingEl) {
      loadingEl.classList.add('active');
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = true;
      this.nextBtn.textContent = 'Processing...';
    }
  }

  hideLoading() {
    const loadingEl = document.querySelector('.wizard-loading');
    if (loadingEl) {
      loadingEl.classList.remove('active');
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = false;
      this.nextBtn.textContent = 'Complete Booking';
    }
  }

  async submitBooking() {
    try {
      // Prepare booking data
      const bookingData = {
        ...this.formData,
        timestamp: new Date().toISOString(),
        source: 'website_booking_wizard'
      };

      // Submit to Netlify function
      const response = await fetch('/.netlify/functions/create-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Booking submission failed');
      }

      const result = await response.json();

      // Store booking ID
      this.formData.bookingId = result.bookingId;
      this.saveFormData();

      // Redirect to Stripe Checkout
      if (result.stripeUrl) {
        window.location.href = result.stripeUrl;
      } else {
        throw new Error('No Stripe checkout URL received');
      }

    } catch (error) {
      // Log error silently in production, track via analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'booking_error', {
          event_category: 'booking',
          event_label: error.message,
          value: 1
        });
      }
      this.hideLoading();
      this.showError('There was an error processing your booking. Please try again or contact us directly.');
    }
  }

  // Public method to set appointment date/time
  setAppointment(date, time) {
    this.formData.appointmentDate = date;
    this.formData.appointmentTime = time;
    this.saveFormData();
  }

  // Public method to get current form data
  getFormData() {
    return { ...this.formData };
  }
}

// Initialize wizard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the booking page
  if (document.querySelector('.booking-wizard')) {
    window.bookingWizard = new BookingWizard({
      onComplete: function () {
      },
      onStepChange: function (stepNumber) {
        // Track step changes in analytics
        if (typeof gtag !== 'undefined') {
          gtag('event', 'booking_step_view', {
            event_category: 'booking_funnel',
            event_label: `Step ${stepNumber}`,
            value: stepNumber
          });
        }
      }
    });
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BookingWizard;
}

