/**
 * Aftercare Timeline Interactive Component
 * Adds progressive reveal, progress tracking, and interactive features
 */

class AftercareTimeline {
  constructor() {
    this.currentDay = 1;
    this.totalPhases = 4;
    this.init();
  }

  init() {
    this.setupProgressTracker();
    this.setupInteractiveTimeline();
    this.setupAccordions();
    this.setupPrintButton();
    this.loadUserProgress();

  }

  setupProgressTracker() {
    // Create progress tracker UI
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const tracker = document.createElement('div');
    tracker.className = 'healing-progress-tracker';
    tracker.innerHTML = `
            <div class="progress-tracker-container">
                <h3 class="progress-title">Track Your Healing Progress</h3>
                <div class="progress-days">
                    <label for="healing-day">What day are you on?</label>
                    <input type="number" id="healing-day" min="1" max="60" value="1" class="day-input">
                    <button class="track-btn" id="track-progress">Update Progress</button>
                </div>
                <div class="progress-bar-wrapper">
                    <div class="progress-bar-track">
                        <div class="progress-bar-fill" id="healing-progress-bar"></div>
                    </div>
                    <div class="progress-label" id="progress-label">Day 1 - Initial Healing</div>
                </div>
            </div>
        `;

    heroSection.appendChild(tracker);

    // Add event listener
    document.getElementById('track-progress')?.addEventListener('click', () => {
      const dayInput = document.getElementById('healing-day');
      if (dayInput) {
        this.updateProgress(parseInt(dayInput.value));
      }
    });

    // Update on input change
    document.getElementById('healing-day')?.addEventListener('input', (e) => {
      this.updateProgress(parseInt(e.target.value));
    });

    // Add styles
    this.addProgressStyles();
  }

  updateProgress(day) {
    if (isNaN(day) || day < 1) day = 1;
    if (day > 60) day = 60;

    this.currentDay = day;
    localStorage.setItem('aftercare_day', day.toString());

    // Calculate progress percentage
    const percentage = Math.min((day / 30) * 100, 100);
    const progressBar = document.getElementById('healing-progress-bar');
    const progressLabel = document.getElementById('progress-label');

    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }

    // Update label
    let phase = '';
    if (day <= 3) {
      phase = 'Initial Healing';
      this.highlightTimelineItem(0);
    } else if (day <= 14) {
      phase = 'Peeling Phase';
      this.highlightTimelineItem(1);
    } else if (day <= 30) {
      phase = 'Settling Phase';
      this.highlightTimelineItem(2);
    } else {
      phase = 'Long-term Care';
      this.highlightTimelineItem(3);
    }

    if (progressLabel) {
      progressLabel.textContent = `Day ${day} - ${phase}`;
    }

    // Show success message
    this.showProgressUpdate(day, phase);
  }

  highlightTimelineItem(index) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active-phase');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        item.classList.remove('active-phase');
      }
    });
  }

  showProgressUpdate(day, phase) {
    const existing = document.querySelector('.progress-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'progress-notification';
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✓</span>
                <span>Progress updated! You're on Day ${day} - ${phase}</span>
            </div>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  setupInteractiveTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
      // Add expand/collapse functionality
      const content = item.querySelector('.timeline-content');
      if (!content) return;

      // Add expansion indicator
      const title = item.querySelector('.timeline-title');
      if (title) {
        title.style.cursor = 'pointer';
        title.addEventListener('click', () => {
          item.classList.toggle('expanded');
        });
      }

      // Add checkbox for completed items
      const checklist = item.querySelector('.timeline-list');
      if (checklist) {
        const items = checklist.querySelectorAll('li');
        items.forEach((listItem, i) => {
          listItem.style.cursor = 'pointer';
          listItem.addEventListener('click', () => {
            listItem.classList.toggle('completed');
            this.saveChecklistProgress();
          });
        });
      }
    });
  }

  setupAccordions() {
    // Make timeline items collapsible on mobile
    if (window.innerWidth <= 768) {
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => {
        item.classList.add('collapsible');
      });
    }
  }

  setupPrintButton() {
    const container = document.querySelector('.container');
    if (!container) return;

    const printSection = document.createElement('div');
    printSection.className = 'print-section';
    printSection.innerHTML = `
            <button class="print-btn" id="print-guide">
                <span class="print-icon">🖨️</span>
                Print Aftercare Guide
            </button>
        `;

    container.appendChild(printSection);

    document.getElementById('print-guide')?.addEventListener('click', () => {
      window.print();
    });
  }

  loadUserProgress() {
    const savedDay = localStorage.getItem('aftercare_day');
    if (savedDay) {
      const dayInput = document.getElementById('healing-day');
      if (dayInput) {
        dayInput.value = savedDay;
        this.updateProgress(parseInt(savedDay));
      }
    }

    // Load checklist progress
    const checklistData = localStorage.getItem('aftercare_checklist');
    if (checklistData) {
      try {
        const completed = JSON.parse(checklistData);
        const items = document.querySelectorAll('.timeline-list li');
        completed.forEach(index => {
          if (items[index]) {
            items[index].classList.add('completed');
          }
        });
      } catch (e) {
        console.warn('Could not load checklist progress');
      }
    }
  }

  saveChecklistProgress() {
    const items = document.querySelectorAll('.timeline-list li');
    const completed = [];
    items.forEach((item, index) => {
      if (item.classList.contains('completed')) {
        completed.push(index);
      }
    });
    localStorage.setItem('aftercare_checklist', JSON.stringify(completed));
  }

  addProgressStyles() {
    if (document.getElementById('aftercare-progress-styles')) return;

    const style = document.createElement('style');
    style.id = 'aftercare-progress-styles';
    style.textContent = `
            .healing-progress-tracker {
                background: rgba(242, 242, 242, 0.02);
                border: 1px solid rgba(242, 242, 242, 0.1);
                border-radius: 12px;
                padding: 2rem;
                margin: 2rem 0;
            }

            .progress-tracker-container {
                max-width: 600px;
                margin: 0 auto;
            }

            .progress-title {
                font-family: 'Cinzel', serif;
                font-size: 1.5rem;
                text-align: center;
                margin-bottom: 1.5rem;
                color: var(--color-accent, #7B1113);
            }

            .progress-days {
                display: flex;
                gap: 1rem;
                align-items: center;
                justify-content: center;
                margin-bottom: 1.5rem;
                flex-wrap: wrap;
            }

            .progress-days label {
                font-weight: 500;
            }

            .day-input {
                width: 80px;
                padding: 0.5rem;
                background: rgba(242, 242, 242, 0.05);
                border: 1px solid rgba(242, 242, 242, 0.2);
                color: var(--color-light, #F2F2F2);
                border-radius: 4px;
                font-size: 1rem;
                text-align: center;
            }

            .track-btn {
                padding: 0.5rem 1.5rem;
                background: var(--color-accent, #7B1113);
                border: none;
                color: white;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
                transition: transform 0.2s, box-shadow 0.2s;
            }

            .track-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(123, 17, 19, 0.3);
            }

            .progress-bar-wrapper {
                margin-top: 1rem;
            }

            .progress-bar-track {
                height: 8px;
                background: rgba(242, 242, 242, 0.1);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }

            .progress-bar-fill {
                height: 100%;
                background: linear-gradient(90deg, #7B1113, #9B1515);
                width: 0%;
                transition: width 0.6s ease-out;
                box-shadow: 0 0 10px rgba(123, 17, 19, 0.5);
            }

            .progress-label {
                text-align: center;
                font-weight: 600;
                color: var(--color-accent, #7B1113);
                font-size: 1.1rem;
            }

            .timeline-item.active-phase {
                animation: pulseGlow 2s ease-in-out infinite;
            }

            .timeline-item.active-phase .timeline-content {
                border-color: var(--color-accent, #7B1113);
                box-shadow: 0 0 20px rgba(123, 17, 19, 0.2);
            }

            @keyframes pulseGlow {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.8;
                }
            }

            .timeline-list li {
                transition: all 0.3s ease;
            }

            .timeline-list li.completed {
                opacity: 0.6;
                text-decoration: line-through;
            }

            .timeline-list li.completed::before {
                content: '✓';
                color: #10B981;
            }

            .progress-notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #10B981;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                opacity: 0;
                transform: translateX(400px);
                transition: all 0.3s ease;
            }

            .progress-notification.show {
                opacity: 1;
                transform: translateX(0);
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .notification-icon {
                font-size: 1.5rem;
            }

            .print-section {
                text-align: center;
                margin: 3rem 0;
            }

            .print-btn {
                padding: 1rem 2rem;
                background: rgba(242, 242, 242, 0.05);
                border: 2px solid rgba(242, 242, 242, 0.2);
                color: var(--color-light, #F2F2F2);
                border-radius: 8px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 600;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.3s ease;
            }

            .print-btn:hover {
                border-color: var(--color-accent, #7B1113);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(123, 17, 19, 0.2);
            }

            .print-icon {
                font-size: 1.5rem;
            }

            @media (max-width: 768px) {
                .progress-days {
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .healing-progress-tracker {
                    padding: 1.5rem;
                }

                .progress-notification {
                    bottom: 10px;
                    right: 10px;
                    left: 10px;
                }
            }

            @media print {
                .healing-progress-tracker,
                .print-section,
                .progress-notification {
                    display: none !important;
                }
            }
        `;

    document.head.appendChild(style);
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.aftercareTimeline = new AftercareTimeline();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AftercareTimeline;
}

