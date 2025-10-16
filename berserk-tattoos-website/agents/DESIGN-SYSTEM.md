# Design System - Berserk Tattoos

## Design Philosophy

**Core Concept:** "Where film noir meets fine art tattoo craft"

**Visual Strategy:**
- High contrast (dark backgrounds, light text)
- Cinematic photography (moody, dramatic)
- Bold typography (Cinzel + Inter pairing)
- Subtle film grain texture
- Microinteractions that feel intentional
- Rebellion through restraint

---

## Color System

### Primary Palette

```css
/* Dark Base */
--color-dark: #111111
RGB: 17, 17, 17
Usage: Primary background, headers, text on light backgrounds
Psychology: Power, mystery, sophistication

/* Light Base */
--color-light: #F2F2F2
RGB: 242, 242, 242
Usage: Primary text, headings, hover states on dark
Psychology: Clarity, precision, contrast

/* Accent Red */
--color-accent: #7B1113
RGB: 123, 17, 19
Usage: CTAs, active states, important highlights
Psychology: Passion, intensity, rebellion

/* Accent Red Hover */
--color-accent-hover: #9A1416
RGB: 154, 20, 22
Usage: Hover state for accent elements
Psychology: Intensified passion, energy
```

### Secondary Palette

```css
/* Grays for UI elements */
--color-gray-100: #1A1A1A;  /* Subtle elevation */
--color-gray-200: #2A2A2A;  /* Card backgrounds */
--color-gray-300: #3A3A3A;  /* Borders, dividers */
--color-gray-400: #555555;  /* Disabled states */
--color-gray-500: #888888;  /* Subtle text */

/* Semantic Colors */
--color-success: #2D5F2E;   /* Form success */
--color-error: #7B1113;     /* Form errors, warnings */
--color-warning: #8B6914;   /* Caution states */
--color-info: #1A3A5F;      /* Informational messages */
```

### Usage Guidelines

**Do:**
- ✅ Use dark (#111111) for 90% of backgrounds
- ✅ Use light (#F2F2F2) for all body text
- ✅ Reserve red (#7B1113) for CTAs and critical actions
- ✅ Maintain 4.5:1 contrast ratio minimum (WCAG AA)

**Don't:**
- ❌ Use red for decorative elements
- ❌ Mix grays arbitrarily (stick to defined shades)
- ❌ Use pure black (#000000) or pure white (#FFFFFF)
- ❌ Add additional accent colors without strategic reason

---

## Typography System

### Typeface Pairing

**Cinzel (Headings)**
- **Family:** Serif
- **Weights:** 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Character:** Elegant, classical, commanding
- **Usage:** H1-H6, buttons, important labels

**Inter (Body)**
- **Family:** Sans-serif
- **Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Character:** Clean, modern, highly legible
- **Usage:** Body text, form inputs, UI labels

### Type Scale

```css
/* Mobile-first scale */
--text-xs: 0.75rem;    /* 12px - Captions, footnotes */
--text-sm: 0.875rem;   /* 14px - Small UI text */
--text-base: 1rem;     /* 16px - Body text, inputs */
--text-lg: 1.125rem;   /* 18px - Lead paragraphs */
--text-xl: 1.25rem;    /* 20px - H5 */
--text-2xl: 1.5rem;    /* 24px - H4 */
--text-3xl: 1.875rem;  /* 30px - H3 */
--text-4xl: 2.25rem;   /* 36px - H2 */
--text-5xl: 3rem;      /* 48px - H1 */

/* Desktop scale (768px+) */
@media (min-width: 768px) {
  --text-3xl: 2.25rem;   /* 36px - H3 */
  --text-4xl: 3rem;      /* 48px - H2 */
  --text-5xl: 4rem;      /* 64px - H1 */
}
```

### Heading Styles

```css
h1, .heading-1 {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-light);
  margin-bottom: var(--space-lg);
}

h2, .heading-2 {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--color-light);
  margin-bottom: var(--space-md);
}

h3, .heading-3 {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-light);
  margin-bottom: var(--space-md);
}

h4, .heading-4 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-light);
  margin-bottom: var(--space-sm);
}
```

### Body Text Styles

```css
body, .body-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-light);
}

.lead-text {
  font-size: var(--text-lg);
  font-weight: 300;
  line-height: 1.7;
  letter-spacing: 0.01em;
}

.small-text {
  font-size: var(--text-sm);
  line-height: 1.5;
}

.caption-text {
  font-size: var(--text-xs);
  line-height: 1.4;
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Text Utilities

```css
.text-light { color: var(--color-light); }
.text-accent { color: var(--color-accent); }
.text-muted { color: var(--color-gray-500); }

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.text-uppercase { text-transform: uppercase; letter-spacing: 0.05em; }
.text-capitalize { text-transform: capitalize; }

.font-heading { font-family: var(--font-heading); }
.font-body { font-family: var(--font-body); }

.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

---

## Spacing System

### Scale

```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 1.5rem;    /* 24px */
--space-lg: 2rem;      /* 32px */
--space-xl: 3rem;      /* 48px */
--space-2xl: 4rem;     /* 64px */
--space-3xl: 6rem;     /* 96px */
```

### Usage Guidelines

**Micro spacing (8-16px):**
- Form input padding
- Button padding
- Icon gaps
- List item spacing

**Standard spacing (24-32px):**
- Section internal spacing
- Card padding
- Component margins
- Grid gaps

**Macro spacing (48-96px):**
- Section separation
- Page padding (top/bottom)
- Major layout divisions

**Examples:**

```css
/* Micro: Form field */
.form-input {
  padding: var(--space-xs) var(--space-sm);
  margin-bottom: var(--space-sm);
}

/* Standard: Card component */
.card {
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
}

/* Macro: Page section */
.section {
  padding: var(--space-2xl) 0;
}
```

---

## Component Library

### Buttons

**Primary Button**
```css
.btn-primary {
  /* Structure */
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  
  /* Typography */
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  /* Visual */
  background: var(--color-accent);
  color: var(--color-light);
  cursor: pointer;
  
  /* Interaction */
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(123, 17, 19, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 5px 10px rgba(123, 17, 19, 0.2);
}
```

**Secondary Button**
```css
.btn-secondary {
  /* Structure */
  padding: 1rem 2rem;
  border: 2px solid var(--color-light);
  border-radius: 4px;
  
  /* Typography */
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  /* Visual */
  background: transparent;
  color: var(--color-light);
  cursor: pointer;
  
  /* Interaction */
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--color-light);
  color: var(--color-dark);
  transform: translateY(-2px);
}
```

**Button Sizes**
```css
.btn-sm { padding: 0.5rem 1rem; font-size: var(--text-sm); }
.btn-md { padding: 0.75rem 1.5rem; font-size: var(--text-base); }
.btn-lg { padding: 1rem 2rem; font-size: var(--text-lg); }
```

### Form Elements

**Text Input**
```css
.form-input {
  /* Structure */
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-gray-300);
  border-radius: 4px;
  
  /* Typography */
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-light);
  
  /* Visual */
  background: var(--color-gray-200);
  
  /* Interaction */
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(123, 17, 19, 0.1);
}

.form-input::placeholder {
  color: var(--color-gray-500);
}

.form-input.error {
  border-color: var(--color-error);
}
```

**Textarea**
```css
.form-textarea {
  /* Inherits from .form-input */
  min-height: 150px;
  resize: vertical;
}
```

**Select Dropdown**
```css
.form-select {
  /* Inherits from .form-input */
  appearance: none;
  background-image: url("data:image/svg+xml...");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 3rem;
}
```

**Radio/Checkbox**
```css
.form-radio,
.form-checkbox {
  /* Custom styling */
  position: relative;
  cursor: pointer;
}

.form-radio input[type="radio"],
.form-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}

.form-radio label::before,
.form-checkbox label::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-gray-300);
  margin-right: 0.5rem;
  vertical-align: middle;
}

.form-radio label::before {
  border-radius: 50%;
}

.form-checkbox label::before {
  border-radius: 4px;
}

.form-radio input:checked + label::before,
.form-checkbox input:checked + label::before {
  background: var(--color-accent);
  border-color: var(--color-accent);
}
```

### Cards

**Standard Card**
```css
.card {
  /* Structure */
  padding: var(--space-md);
  border-radius: 8px;
  
  /* Visual */
  background: var(--color-gray-200);
  
  /* Interaction */
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
```

**Artist Card** (Booking page)
```css
.artist-card {
  /* Structure */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-lg);
  border: 2px solid transparent;
  border-radius: 8px;
  
  /* Visual */
  background: var(--color-gray-200);
  text-align: center;
  cursor: pointer;
  
  /* Interaction */
  transition: all 0.3s ease;
}

.artist-card:hover {
  border-color: var(--color-accent);
  transform: scale(1.02);
}

.artist-card.selected {
  border-color: var(--color-accent);
  background: rgba(123, 17, 19, 0.1);
}

.artist-card__avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin-bottom: var(--space-sm);
  border: 3px solid var(--color-light);
}

.artist-card__name {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  margin-bottom: var(--space-xs);
}

.artist-card__specialty {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
}
```

**Portfolio Card**
```css
.portfolio-item {
  /* Structure */
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  aspect-ratio: 1 / 1;
  
  /* Visual */
  background-size: cover;
  background-position: center;
  cursor: pointer;
  
  /* Interaction */
  transition: all 0.3s ease;
}

.portfolio-item:hover {
  transform: scale(1.05);
}

.portfolio-overlay {
  /* Positioning */
  position: absolute;
  inset: 0;
  
  /* Layout */
  display: flex;
  align-items: flex-end;
  padding: var(--space-md);
  
  /* Visual */
  background: linear-gradient(
    to top,
    rgba(17, 17, 17, 0.9) 0%,
    rgba(17, 17, 17, 0.4) 50%,
    rgba(17, 17, 17, 0) 100%
  );
  
  /* Interaction */
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-info h4 {
  font-size: var(--text-lg);
  margin-bottom: var(--space-xs);
}

.portfolio-info p {
  font-size: var(--text-sm);
  color: var(--color-gray-500);
}
```

---

## Layout Patterns

### Container System

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.container-narrow {
  max-width: 800px;
}

.container-wide {
  max-width: 1400px;
}

.container-full {
  max-width: 100%;
  padding: 0;
}
```

### Grid System

```css
.grid {
  display: grid;
  gap: var(--space-md);
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grid-3,
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Flexbox Utilities

```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }

.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }

.gap-xs { gap: var(--space-xs); }
.gap-sm { gap: var(--space-sm); }
.gap-md { gap: var(--space-md); }
.gap-lg { gap: var(--space-lg); }
```

---

## Interaction Design

### Hover States

**General Principles:**
- Subtle elevation (2-4px translateY)
- Shadow intensification
- Color shift (10-20% lighter/darker)
- Scale transformation (1.02-1.05x)
- Timing: 0.3s ease

**Examples:**

```css
/* Link Hover */
a {
  color: var(--color-light);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-accent);
}

/* Card Hover */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Image Hover */
.portfolio-item:hover {
  transform: scale(1.05);
}
```

### Focus States

**Accessibility-First:**
- Clear focus indicators (3px outline)
- High contrast
- Keyboard navigable
- Skip link for keyboard users

```css
*:focus {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

/* Custom focus for inputs */
.form-input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(123, 17, 19, 0.2);
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: var(--color-accent);
  color: var(--color-light);
  padding: 0.5rem 1rem;
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}
```

### Loading States

```css
.loading {
  position: relative;
  pointer-events: none;
  opacity: 0.6;
}

.loading::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-dark);
  opacity: 0.5;
}

.loading::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  border: 4px solid var(--color-light);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 1;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Disabled States

```css
.btn:disabled,
.btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.form-input:disabled {
  background: var(--color-gray-400);
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

## Animation System

### Timing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Duration Scale

```css
--duration-fast: 150ms;
--duration-base: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
```

### Keyframe Animations

**Fade In:**
```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn var(--duration-base) var(--ease-out);
}
```

**Slide Up:**
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp var(--duration-slow) var(--ease-out);
}
```

**Scale In:**
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn var(--duration-base) var(--ease-out);
}
```

**Pulse (for CTAs):**
```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pulse {
  animation: pulse 2s var(--ease-in-out) infinite;
}
```

### Microinteractions

**Button Click Feedback:**
```css
.btn:active {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}
```

**Form Input Focus:**
```css
.form-input:focus {
  animation: inputFocus 0.3s ease;
}

@keyframes inputFocus {
  0% {
    border-color: var(--color-gray-300);
  }
  50% {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 5px rgba(123, 17, 19, 0.2);
  }
  100% {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(123, 17, 19, 0.1);
  }
}
```

**Portfolio Image Hover:**
```css
.portfolio-item {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover {
  transform: scale(1.05);
}

.portfolio-overlay {
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform: translateY(10px);
  opacity: 0;
}

.portfolio-item:hover .portfolio-overlay {
  transform: translateY(0);
  opacity: 1;
}
```

---

## Responsive Design Breakpoints

### Breakpoint System

```css
/* Mobile First Approach */

/* Extra Small (default) */
/* 320px - 767px */

/* Small (Tablet) */
@media (min-width: 768px) {
  /* Styles for tablets and up */
}

/* Medium (Small Desktop) */
@media (min-width: 1024px) {
  /* Styles for small desktops and up */
}

/* Large (Desktop) */
@media (min-width: 1280px) {
  /* Styles for larger desktops */
}

/* Extra Large */
@media (min-width: 1536px) {
  /* Styles for very large screens */
}
```

### Responsive Typography

```css
/* Mobile (base styles, no media query) */
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
body { font-size: 1rem; }

/* Tablet */
@media (min-width: 768px) {
  h1 { font-size: 3rem; }
  h2 { font-size: 2.5rem; }
  h3 { font-size: 2rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  h1 { font-size: 4rem; }
  h2 { font-size: 3rem; }
  h3 { font-size: 2.25rem; }
}
```

### Responsive Spacing

```css
/* Mobile */
.section {
  padding: var(--space-xl) 0;
}

.container {
  padding: 0 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .section {
    padding: var(--space-2xl) 0;
  }
  
  .container {
    padding: 0 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .section {
    padding: var(--space-3xl) 0;
  }
  
  .container {
    padding: 0 2rem;
  }
}
```

---

## Image Guidelines

### Aspect Ratios

```css
/* Hero Images */
.hero-image {
  aspect-ratio: 16 / 9;
}

/* Portfolio Images */
.portfolio-item {
  aspect-ratio: 1 / 1;
}

/* Artist Portraits */
.artist-avatar {
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

/* Wide Banner */
.banner-image {
  aspect-ratio: 21 / 9;
}
```

### Image Treatments

**Film Grain Overlay:**
```css
.film-grain {
  position: relative;
}

.film-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml...');
  opacity: 0.03;
  mix-blend-mode: multiply;
  pointer-events: none;
}
```

**Vignette Effect:**
```css
.vignette {
  position: relative;
}

.vignette::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 0%,
    transparent 50%,
    rgba(17, 17, 17, 0.6) 100%
  );
  pointer-events: none;
}
```

**Grayscale Hover Effect:**
```css
.image-hover {
  filter: grayscale(30%);
  transition: filter 0.3s ease;
}

.image-hover:hover {
  filter: grayscale(0%);
}
```

---

## Iconography

### Icon System

**Style:** Outlined (2px stroke)  
**Size Scale:** 16px, 20px, 24px, 32px, 48px  
**Color:** Inherits from parent

```css
.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 24px; height: 24px; }
.icon-lg { width: 32px; height: 32px; }
.icon-xl { width: 48px; height: 48px; }
```

### Icon Usage

**Navigation:**
- Menu icon (hamburger)
- Close icon (X)
- Arrow icons (navigation)

**Social Media:**
- Instagram, Facebook, Twitter icons
- Outlined style, 24px default

**UI Elements:**
- Search icon
- Filter icon
- Upload icon
- Calendar icon
- Location pin

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI elements: 3:1 minimum

**Focus Indicators:**
- Visible on all interactive elements
- 3:1 contrast ratio
- Not obscured by other content

**Touch Targets:**
- Minimum 44x44px
- Adequate spacing (8px minimum)

**Screen Reader Support:**
```html
<!-- Semantic HTML -->
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<!-- ARIA labels -->
<button aria-label="Open mobile menu">
  <span class="icon-menu"></span>
</button>

<!-- Alt text -->
<img 
  src="tattoo.jpg" 
  alt="Fine line botanical forearm tattoo featuring delicate roses"
  loading="lazy">

<!-- Skip link -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

---

## Design Tokens Export

```json
{
  "colors": {
    "dark": "#111111",
    "light": "#F2F2F2",
    "accent": "#7B1113",
    "accentHover": "#9A1416"
  },
  "typography": {
    "fontFamily": {
      "heading": "'Cinzel', serif",
      "body": "'Inter', sans-serif"
    },
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem"
    }
  },
  "spacing": {
    "xs": "0.5rem",
    "sm": "1rem",
    "md": "1.5rem",
    "lg": "2rem",
    "xl": "3rem",
    "2xl": "4rem",
    "3xl": "6rem"
  },
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "full": "9999px"
  },
  "transitions": {
    "fast": "0.15s ease",
    "base": "0.3s ease",
    "slow": "0.5s ease"
  }
}
```

---

## Component Checklist

When creating new components, ensure:

- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Hover states defined
- [ ] Focus states (keyboard accessibility)
- [ ] Loading states (if applicable)
- [ ] Error states (if applicable)
- [ ] Disabled states (if applicable)
- [ ] ARIA labels (if needed)
- [ ] Semantic HTML used
- [ ] Color contrast verified (4.5:1+)
- [ ] Touch targets 44x44px minimum
- [ ] Animations use approved timings
- [ ] Typography follows scale
- [ ] Spacing uses design tokens

---

## Brand Voice in UI Copy

**Tone:** Confident, authentic, slightly edgy  
**Style:** Short sentences, active voice, specific details

**Examples:**

**Good:**
- "Book your consultation" (not "Schedule an appointment")
- "Crafted in Melbourne since 2018" (not "Established in 2018")
- "This will hurt. It's worth it." (not "Mild discomfort expected")

**Bad:**
- Corporate speak: "We leverage our expertise to deliver..."
- Vague: "High-quality tattoos"
- Apologetic: "We hope you like our work"

**CTA Patterns:**
- "Book Now" (primary action)
- "View Portfolio" (secondary action)
- "Meet the Artists" (exploration)
- "Start Your Design" (engagement)

---

## Design System Maintenance

**Version:** 1.0  
**Last Updated:** October 16, 2025  
**Owner:** Design Team  

**Change Process:**
1. Propose change in design review
2. Document rationale
3. Update this guide
4. Implement across codebase
5. Test for regressions
6. Deploy with version note

**Future Considerations:**
- Dark mode variant (already dark, but could add light mode)
- Animation library expansion
- Component variations
- Design token tooling integration

---

**Remember:** These guidelines serve the brand and the user. When in doubt, prioritize:
1. User experience
2. Accessibility
3. Brand consistency
4. Performance
5. Innovation

**Question everything. Perfect nothing. Ship constantly.**