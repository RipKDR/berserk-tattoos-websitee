/**
 * Calendar Widget
 * Interactive availability calendar with time slot selection
 * Integrates with booking wizard for consultation scheduling
 */

class CalendarWidget {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Calendar container #${containerId} not found`);
      return;
    }

    // Configuration
    this.artistId = options.artistId || null;
    this.onDateSelect = options.onDateSelect || null;
    this.onTimeSelect = options.onTimeSelect || null;
    this.businessHours = options.businessHours || {
      start: 10, // 10 AM
      end: 18,   // 6 PM
      interval: 60 // 60 minutes
    };

    // State
    this.currentDate = new Date();
    this.selectedDate = null;
    this.selectedTime = null;
    this.availableSlots = {};

    // Initialize
    this.init();
  }

  init() {
    // Load availability data
    this.loadAvailability();

    // Render calendar
    this.render();

  }

  render() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Calendar HTML structure
    this.container.innerHTML = `
            <div class="calendar-container">
                <div class="calendar-header">
                    <div class="calendar-month">${this.getMonthName(month)} ${year}</div>
                    <div class="calendar-nav">
                        <button class="calendar-nav-btn" id="prev-month" aria-label="Previous month">‹</button>
                        <button class="calendar-nav-btn" id="next-month" aria-label="Next month">›</button>
                    </div>
                </div>
                <div class="calendar-grid">
                    ${this.renderDayHeaders()}
                    ${this.renderDays(year, month)}
                </div>
                <div class="time-slots" style="display: none;">
                    <div class="time-slots-title">Available Times</div>
                    <div class="time-slots-grid" id="time-slots-grid"></div>
                </div>
            </div>
        `;

    // Set up event listeners
    this.setupEventListeners();
  }

  renderDayHeaders() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map(day =>
      `<div class="calendar-day-header">${day}</div>`
    ).join('');
  }

  renderDays(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let html = '';

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      html += '<div class="calendar-day disabled"></div>';
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);

      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const isSelected = this.selectedDate &&
        date.getTime() === this.selectedDate.getTime();
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const hasAvailability = this.hasAvailableSlots(date);

      const classes = ['calendar-day'];
      if (isPast) classes.push('past');
      if (isToday) classes.push('today');
      if (isSelected) classes.push('selected');
      if (isWeekend || !hasAvailability) classes.push('disabled');

      const dateString = this.formatDate(date);

      html += `
                <div class="${classes.join(' ')}" 
                     data-date="${dateString}"
                     tabindex="${isPast || isWeekend || !hasAvailability ? '-1' : '0'}"
                     role="button"
                     aria-label="Select ${dateString}">
                    ${day}
                </div>
            `;
    }

    return html;
  }

  setupEventListeners() {
    // Month navigation
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousMonth());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextMonth());
    }

    // Day selection
    const days = this.container.querySelectorAll('.calendar-day:not(.disabled):not(.past)');
    days.forEach(day => {
      day.addEventListener('click', () => this.selectDate(day));
      day.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectDate(day);
        }
      });
    });
  }

  selectDate(dayElement) {
    const dateString = dayElement.dataset.date;
    if (!dateString) return;

    // Parse date
    this.selectedDate = new Date(dateString);

    // Update UI
    this.container.querySelectorAll('.calendar-day').forEach(d => {
      d.classList.remove('selected');
    });
    dayElement.classList.add('selected');

    // Show time slots
    this.renderTimeSlots(this.selectedDate);

    // Callback
    if (this.onDateSelect) {
      this.onDateSelect(this.selectedDate);
    }

  }

  renderTimeSlots(date) {
    const timeSlotsContainer = this.container.querySelector('.time-slots');
    const timeSlotsGrid = document.getElementById('time-slots-grid');

    if (!timeSlotsContainer || !timeSlotsGrid) return;

    // Get available slots for this date
    const slots = this.getAvailableSlotsForDate(date);

    if (slots.length === 0) {
      timeSlotsGrid.innerHTML = '<p style="opacity: 0.6; text-align: center; padding: 1rem;">No available times for this date</p>';
      timeSlotsContainer.style.display = 'block';
      return;
    }

    // Render time slots
    timeSlotsGrid.innerHTML = slots.map(slot => {
      const isSelected = this.selectedTime === slot.time;
      const classes = ['time-slot'];
      if (isSelected) classes.push('selected');
      if (!slot.available) classes.push('disabled');

      return `
                <div class="${classes.join(' ')}" 
                     data-time="${slot.time}"
                     tabindex="${slot.available ? '0' : '-1'}"
                     role="button"
                     aria-label="Select ${slot.time}">
                    ${slot.time}
                </div>
            `;
    }).join('');

    // Show container
    timeSlotsContainer.style.display = 'block';

    // Set up time slot listeners
    const timeSlots = timeSlotsGrid.querySelectorAll('.time-slot:not(.disabled)');
    timeSlots.forEach(slot => {
      slot.addEventListener('click', () => this.selectTime(slot));
      slot.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectTime(slot);
        }
      });
    });

    // Scroll time slots into view
    timeSlotsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  selectTime(timeElement) {
    const time = timeElement.dataset.time;
    if (!time) return;

    this.selectedTime = time;

    // Update UI
    this.container.querySelectorAll('.time-slot').forEach(t => {
      t.classList.remove('selected');
    });
    timeElement.classList.add('selected');

    // Callback
    if (this.onTimeSelect) {
      this.onTimeSelect(this.selectedDate, time);
    }

  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.render();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.render();
  }

  getMonthName(month) {
    const names = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return names[month];
  }

  formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  hasAvailableSlots(date) {
    // Check if date is a weekday (Mon-Fri)
    const day = date.getDay();
    if (day === 0 || day === 6) return false;

    // Check if date is at least 2 days in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 2);

    if (date < minDate) return false;

    // Check if date is within 3 months
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 3);

    if (date > maxDate) return false;

    return true;
  }

  getAvailableSlotsForDate(date) {
    const slots = [];
    const { start, end, interval } = this.businessHours;

    // Generate time slots
    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        // Check if slot is available (mock availability)
        // In production, this would check against actual bookings
        const isAvailable = this.isSlotAvailable(date, time);

        slots.push({
          time: this.formatTime12Hour(hour, minute),
          available: isAvailable
        });
      }
    }

    return slots;
  }

  formatTime12Hour(hour, minute) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
  }

  isSlotAvailable(date, time) {
    // Mock availability check
    // In production, this would make an API call to check real availability

    // For demo purposes, randomly make some slots unavailable
    const dateString = this.formatDate(date);
    const slotKey = `${dateString}-${time}`;

    // Cache random availability to maintain consistency
    if (!this.availableSlots[slotKey]) {
      // 80% of slots are available
      this.availableSlots[slotKey] = Math.random() > 0.2;
    }

    return this.availableSlots[slotKey];
  }

  async loadAvailability() {
    // In production, load real availability from API
    try {
      if (this.artistId) {
        // Fetch artist-specific availability
        // const response = await fetch(`/.netlify/functions/get-availability?artist=${this.artistId}`);
        // const data = await response.json();
        // this.availableSlots = data.slots;
      }
    } catch (error) {
      console.warn('Could not load availability:', error);
    }
  }

  // Public methods
  getSelectedDate() {
    return this.selectedDate;
  }

  getSelectedTime() {
    return this.selectedTime;
  }

  getSelectedDateTime() {
    if (!this.selectedDate || !this.selectedTime) return null;

    return {
      date: this.formatDate(this.selectedDate),
      time: this.selectedTime,
      timestamp: this.selectedDate.toISOString()
    };
  }

  setArtist(artistId) {
    this.artistId = artistId;
    this.loadAvailability();
    this.render();
  }

  reset() {
    this.selectedDate = null;
    this.selectedTime = null;
    this.render();
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CalendarWidget;
}

