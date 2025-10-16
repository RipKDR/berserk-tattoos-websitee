# Technical Architecture - Berserk Tattoos

## Stack Overview

**Type:** Static website (JAMstack architecture)  
**Languages:** HTML5, CSS3, Vanilla JavaScript  
**Dependencies:** Zero external libraries (except Formspree for forms)  
**Deployment:** Netlify (recommended)  
**Version Control:** Git  

**Why this stack:**
- ✅ Fast performance (no framework overhead)
- ✅ Simple maintenance (studio team can update)
- ✅ Zero hosting costs (Netlify free tier)
- ✅ Maximum control (no abstraction layers)
- ✅ Easy debugging (straightforward code)

---

## File Structure

```
berserk-tattoos/
│
├── index.html                 # Homepage
├── artists.html              # Artists portfolio page
├── booking.html              # Booking form page
├── about.html                # About studio page
├── contact.html              # Contact page (future)
│
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   │   ├── amelia-hero.webp
│   │   │   ├── ben-hero.webp
│   │   │   └── monique-hero.webp
│   │   │
│   │   ├── portfolio/
│   │   │   ├── amelia/
│   │   │   │   ├── fineline-001.webp
│   │   │   │   ├── botanical-001.webp
│   │   │   │   └── [8 total per artist]
│   │   │   ├── ben/
│   │   │   │   ├── portrait-001.webp
│   │   │   │   └── [8 total]
│   │   │   └── monique/
│   │   │       ├── blackwork-001.webp
│   │   │       └── [8 total]
│   │   │
│   │   ├── artists/
│   │   │   ├── amelia-portrait.webp
│   │   │   ├── ben-portrait.webp
│   │   │   └── monique-portrait.webp
│   │   │
│   │   └── studio/
│   │       ├── studio-interior.webp
│   │       └── studio-equipment.webp
│   │
│   └── fonts/
│       ├── cinzel/
│       └── inter/
│
├── _redirects               # Netlify redirect rules
├── netlify.toml            # Netlify configuration
├── robots.txt              # SEO crawling rules
├── sitemap.xml             # SEO sitemap
├── manifest.json           # PWA manifest
│
├── README.md               # Project documentation
├── IMPLEMENTATION-CHECKLIST.md
├── ASSETS-GENERATION-GUIDE.md
├── CURSOR-SETUP-GUIDE.md
└── .gitignore
```

---

## Architecture Principles

### 1. Inline Critical CSS
**Why:** Eliminate render-blocking external stylesheets  
**Implementation:** All CSS in `<style>` tag in `<head>`  
**Trade-off:** Larger HTML file, but faster First Contentful Paint  

### 2. Progressive Enhancement
**Base Layer:** Semantic HTML (works without JS)  
**Enhancement Layer:** CSS for styling  
**Interactive Layer:** JavaScript for interactions  

**Example:**
```html
<!-- Works without JS -->
<nav class="nav-links">
  <a href="#artists">Artists</a>
  <a href="#booking">Book Now</a>
</nav>

<!-- Enhanced with JS -->
<script>
  // Smooth scrolling added if JS available
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
</script>
```

### 3. Mobile-First CSS
**Pattern:** Base styles = mobile, media queries = desktop  
**Breakpoints:**
- Mobile: 320px - 767px (base styles)
- Tablet: 768px - 1023px (@media min-width: 768px)
- Desktop: 1024px+ (@media min-width: 1024px)

**Example:**
```css
/* Mobile first (no media query) */
.artist-card {
  width: 100%;
  margin-bottom: 1rem;
}

/* Desktop enhancement */
@media (min-width: 768px) {
  .artist-card {
    width: calc(33.333% - 2rem);
    display: inline-block;
  }
}
```

### 4. Component-Based Structure
**Pattern:** Self-contained, reusable sections  
**Naming:** BEM-inspired (Block__Element--Modifier)

**Example:**
```html
<!-- Component: Artist Card -->
<div class="artist-card" data-artist="amelia">
  <div class="artist-card__avatar"></div>
  <h4 class="artist-card__name">Amelia Kelso</h4>
  <p class="artist-card__specialty">Fine Line Specialist</p>
</div>
```

---

## Page Architecture

### Homepage (index.html)

**Structure:**
```
<header>
  - Logo
  - Navigation
  - Mobile menu toggle
</header>

<main>
  <section class="hero">
    - Studio tagline
    - Primary CTA (Book Now)
  </section>

  <section class="artists-preview">
    - Artist cards (all 3)
    - Links to full profiles
  </section>

  <section class="featured-work">
    - Gallery grid (12 images)
    - Filter by artist
  </section>

  <section class="booking-cta">
    - Secondary booking prompt
    - Studio info
  </section>
</main>

<footer>
  - Copyright
  - Social links
</footer>
```

**Critical Interactions:**
1. Mobile menu toggle
2. Smooth scroll navigation
3. Gallery filtering
4. Artist card hover states

### Artists Page (artists.html)

**Structure:**
```
<header>
  [Same as homepage]
</header>

<nav class="artist-navigation">
  - Tab buttons: Amelia | Ben | Monique
</nav>

<main>
  <section class="artist-profile" data-profile="amelia">
    <div class="profile-header">
      - Hero image
      - Artist name
      - Specialty tag
      - Bio
    </div>

    <div class="profile-portfolio">
      - Filter buttons (by style)
      - Portfolio grid (8+ images)
      - Image modals
    </div>

    <div class="profile-cta">
      - Book with [Artist] button
    </div>
  </section>

  [Repeat for Ben and Monique]
</main>

<footer>
  [Same as homepage]
</footer>
```

**Critical Interactions:**
1. Artist tab switching
2. Portfolio filtering by style
3. Portfolio image modal/lightbox
4. CTA button artist pre-selection

**JavaScript Logic:**
```javascript
// Artist tab switching
artistNavBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetArtist = btn.dataset.artist;
    
    // Update active button
    artistNavBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Show target profile
    artistProfiles.forEach(profile => {
      profile.classList.remove('active');
      if (profile.dataset.profile === targetArtist) {
        profile.classList.add('active');
      }
    });
  });
});
```

### Booking Page (booking.html)

**Structure:**
```
<header>
  [Same as homepage]
</header>

<section class="booking-hero">
  - Page title
  - Subheading
</section>

<div class="progress-steps">
  - Step indicator (1/4, 2/4, etc.)
</div>

<main class="booking-main">
  <form id="booking-form" class="booking-form">
    <section class="form-section artist-selection">
      - Artist cards (clickable, radio input)
    </section>

    <section class="form-section personal-details">
      - Name, email, phone fields
    </section>

    <section class="form-section design-brief">
      - Style dropdown
      - Description textarea
      - Reference image upload
      - Placement dropdown
      - Size selection
    </section>

    <section class="form-section review">
      - Summary of selections
      - Submit button
    </section>
  </form>

  <aside class="booking-summary">
    - Selected artist (dynamic)
    - Selected details (dynamic)
    - Next steps info
  </aside>
</main>

<footer>
  [Same as homepage]
</footer>
```

**Critical Interactions:**
1. Progress step updates
2. Artist card selection
3. Form validation (real-time)
4. Live summary updates
5. Form submission handling

**JavaScript Logic:**
```javascript
// Artist selection
artistCards.forEach(card => {
  card.addEventListener('click', () => {
    // Update visual selection
    artistCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    // Update hidden radio input
    const radio = card.querySelector('input[type="radio"]');
    radio.checked = true;
    
    // Update live summary
    updateBookingSummary('artist', card.dataset.artist);
    
    // Advance to next step
    advanceStep(2);
  });
});

// Form validation
function validateStep(stepNumber) {
  const requiredFields = document.querySelectorAll(`[data-step="${stepNumber}"] [required]`);
  let valid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    } else {
      field.classList.remove('error');
    }
  });
  
  return valid;
}

// Live summary update
function updateBookingSummary(field, value) {
  const summaryElement = document.querySelector(`[data-summary="${field}"]`);
  if (summaryElement) {
    summaryElement.textContent = value;
  }
}
```

---

## CSS Architecture

### Design Token System

```css
:root {
  /* Colors */
  --color-dark: #111111;
  --color-light: #F2F2F2;
  --color-accent: #7B1113;
  --color-accent-hover: #9A1416;
  
  /* Typography */
  --font-heading: 'Cinzel', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  
  /* Spacing */
  --space-xs: 0.5rem;    /* 8px */
  --space-sm: 1rem;      /* 16px */
  --space-md: 1.5rem;    /* 24px */
  --space-lg: 2rem;      /* 32px */
  --space-xl: 3rem;      /* 48px */
  --space-2xl: 4rem;     /* 64px */
  
  /* Layout */
  --container-max: 1200px;
  --container-padding: 1.5rem;
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.2);
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

### Component Classes

**Naming Convention:** Semantic, reusable, BEM-inspired

```css
/* Button Component */
.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-heading);
  font-size: var(--text-base);
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn--primary {
  background: var(--color-accent);
  color: var(--color-light);
}

.btn--primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn--outline {
  background: transparent;
  border: 2px solid var(--color-light);
  color: var(--color-light);
}
```

**Utility Classes:**
```css
/* Layout utilities */
.container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-padding); }
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }

/* Spacing utilities */
.mt-sm { margin-top: var(--space-sm); }
.mb-lg { margin-bottom: var(--space-lg); }
.p-md { padding: var(--space-md); }

/* Text utilities */
.text-center { text-align: center; }
.text-light { color: var(--color-light); }
.text-accent { color: var(--color-accent); }
```

### Layout Patterns

**Grid System:**
```css
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

@media (max-width: 767px) {
  .grid-2,
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
```

**Container Pattern:**
```css
.section {
  padding: var(--space-2xl) 0;
}

.section__content {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
```

---

## JavaScript Architecture

### Module Pattern

**Structure:** Self-contained modules for each feature

```javascript
// Mobile Navigation Module
const MobileNav = (function() {
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  
  function toggle() {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
  }
  
  function close() {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
  }
  
  function init() {
    mobileMenu.addEventListener('click', toggle);
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', close);
    });
  }
  
  return {
    init: init,
    close: close
  };
})();

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  MobileNav.init();
});
```

### Event Delegation

**Pattern:** Attach listeners to parent, not each child

```javascript
// ❌ Bad: Listener on each item
portfolioItems.forEach(item => {
  item.addEventListener('click', handleClick);
});

// ✅ Good: Single listener on parent
portfolioGrid.addEventListener('click', function(e) {
  const item = e.target.closest('.portfolio-item');
  if (item) {
    handleClick(item);
  }
});
```

### State Management

**Simple state object for booking form:**

```javascript
const BookingState = {
  artist: null,
  name: '',
  email: '',
  phone: '',
  style: '',
  description: '',
  placement: '',
  size: '',
  
  update(field, value) {
    this[field] = value;
    this.render();
  },
  
  render() {
    // Update summary sidebar
    document.querySelector('[data-summary="artist"]').textContent = this.artist || 'Not selected';
    document.querySelector('[data-summary="name"]').textContent = this.name || 'Not provided';
    // ... etc
  },
  
  validate() {
    return this.artist && this.name && this.email && this.phone;
  }
};
```

---

## Form Handling

### Formspree Integration

**Setup:**
1. Create Formspree account
2. Get form endpoint ID
3. Replace `YOUR_FORM_ID` in booking.html

**Form Configuration:**
```html
<form 
  action="https://formspree.io/f/YOUR_FORM_ID" 
  method="POST"
  id="booking-form">
  
  <!-- Hidden fields for metadata -->
  <input type="hidden" name="_subject" value="New Booking Request - Berserk Tattoos">
  <input type="hidden" name="_cc" value="admin@berserktattoos.com">
  <input type="hidden" name="_next" value="/booking-confirmation.html">
  
  <!-- Form fields -->
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <!-- ... -->
</form>
```

**Validation Logic:**
```javascript
const form = document.getElementById('booking-form');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Validate all fields
  if (!validateForm()) {
    showError('Please fill in all required fields');
    return;
  }
  
  // Show loading state
  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  
  try {
    // Submit via fetch
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      // Success
      window.location.href = '/booking-confirmation.html';
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    // Error handling
    showError('Something went wrong. Please try again.');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Booking';
  }
});
```

---

## Performance Optimization

### Image Optimization

**Format Strategy:**
```html
<picture>
  <source 
    srcset="image.webp" 
    type="image/webp">
  <img 
    src="image.jpg" 
    alt="Description"
    loading="lazy"
    width="800"
    height="600">
</picture>
```

**Lazy Loading:**
```javascript
// Native lazy loading (modern browsers)
<img src="image.jpg" loading="lazy">

// Fallback for older browsers
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
```

### Critical CSS Inlining

**Pattern:** Inline above-the-fold styles in `<head>`

```html
<head>
  <style>
    /* Critical CSS: Header, Hero, Above-fold content */
    header { /* ... */ }
    .hero { /* ... */ }
    /* ... */
  </style>
  
  <!-- Non-critical CSS loaded async (if externalized later) -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
```

### Font Loading

**Strategy:** System fonts + FOUT (Flash of Unstyled Text)

```css
/* System font stack fallback */
body {
  font-family: 
    'Inter', 
    -apple-system, 
    BlinkMacSystemFont, 
    'Segoe UI', 
    Roboto, 
    sans-serif;
}

h1, h2, h3 {
  font-family: 
    'Cinzel', 
    Georgia, 
    'Times New Roman', 
    serif;
}
```

**Google Fonts Loading:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

---

## SEO Implementation

### Meta Tags Template

```html
<head>
  <!-- Primary Meta Tags -->
  <title>Berserk Tattoos | Melbourne's Premier Tattoo Studio</title>
  <meta name="title" content="Berserk Tattoos | Melbourne's Premier Tattoo Studio">
  <meta name="description" content="Award-winning tattoo artists specializing in fine line, realism, and bold blackwork. Book your consultation today.">
  <meta name="keywords" content="tattoo melbourne, fine line tattoo, realism tattoo, blackwork, berserk tattoos">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://berserktattoos.com/">
  <meta property="og:title" content="Berserk Tattoos | Melbourne's Premier Tattoo Studio">
  <meta property="og:description" content="Award-winning tattoo artists specializing in fine line, realism, and bold blackwork.">
  <meta property="og:image" content="https://berserktattoos.com/assets/images/social-share.jpg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://berserktattoos.com/">
  <meta property="twitter:title" content="Berserk Tattoos | Melbourne's Premier Tattoo Studio">
  <meta property="twitter:description" content="Award-winning tattoo artists specializing in fine line, realism, and bold blackwork.">
  <meta property="twitter:image" content="https://berserktattoos.com/assets/images/social-share.jpg">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://berserktattoos.com/">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TattooShop",
    "name": "Berserk Tattoos",
    "image": "https://berserktattoos.com/assets/images/logo.png",
    "description": "Award-winning tattoo artists in Melbourne specializing in fine line, realism, and bold blackwork.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tattoo Street",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "postalCode": "3000",
      "addressCountry": "AU"
    },
    "telephone": "+61-3-xxxx-xxxx",
    "priceRange": "$$$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "18:00"
      }
    ]
  }
  </script>
</head>
```

### Sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://berserktattoos.com/</loc>
    <lastmod>2025-10-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://berserktattoos.com/artists</loc>
    <lastmod>2025-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://berserktattoos.com/booking</loc>
    <lastmod>2025-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://berserktattoos.com/about</loc>
    <lastmod>2025-10-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

## Deployment Configuration

### Netlify Setup

**netlify.toml:**
```toml
[build]
  publish = "."
  command = "echo 'No build step required'"

[[redirects]]
  from = "/artist/amelia"
  to = "/artists#amelia"
  status = 301

[[redirects]]
  from = "/artist/ben"
  to = "/artists#ben"
  status = 301

[[redirects]]
  from = "/artist/monique"
  to = "/artists#monique"
  status = 301

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**_redirects:**
```
/artist/amelia  /artists#amelia  301
/artist/ben     /artists#ben     301
/artist/monique /artists#monique 301

/*  /404.html  404
```

---

## Testing Strategy

### Manual Testing Checklist

**Cross-Browser:**
- [ ] Chrome (desktop + mobile)
- [ ] Safari (desktop + mobile)
- [ ] Firefox
- [ ] Edge

**Device Testing:**
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)

**Functionality:**
- [ ] All navigation links work
- [ ] Mobile menu opens/closes
- [ ] Artist tabs switch correctly
- [ ] Portfolio filters work
- [ ] Booking form submits
- [ ] Form validation displays errors
- [ ] Images load (no 404s)
- [ ] Social links work

**Performance:**
- [ ] Lighthouse score 90+
- [ ] Page load <3s (3G network)
- [ ] Images lazy load
- [ ] No console errors

**SEO:**
- [ ] All pages have unique titles
- [ ] Meta descriptions present
- [ ] Alt text on all images
- [ ] Structured data validates
- [ ] Sitemap accessible
- [ ] Robots.txt configured

---

## Error Handling

### 404 Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page Not Found | Berserk Tattoos</title>
  <style>
    body {
      background: #111111;
      color: #F2F2F2;
      font-family: 'Inter', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: 2rem;
    }
    h1 { font-family: 'Cinzel', serif; font-size: 4rem; margin-bottom: 1rem; }
    p { font-size: 1.25rem; margin-bottom: 2rem; }
    a { 
      background: #7B1113; 
      color: #F2F2F2; 
      padding: 1rem 2rem; 
      text-decoration: none; 
      border-radius: 4px; 
      display: inline-block;
    }
  </style>
</head>
<body>
  <div>
    <h1>404</h1>
    <p>This page has wandered off into the dark.</p>
    <a href="/">Return Home</a>
  </div>
</body>
</html>
```

### Form Error States

```javascript
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    background: #7B1113;
    color: #F2F2F2;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    animation: slideIn 0.3s ease;
  `;
  
  const form = document.getElementById('booking-form');
  form.insertBefore(errorDiv, form.firstChild);
  
  setTimeout(() => errorDiv.remove(), 5000);
}
```

---

## Security Considerations

### Form Security

**Implemented:**
- ✅ Formspree honeypot (catches bots)
- ✅ SSL/HTTPS (via Netlify)
- ✅ No sensitive data stored client-side
- ✅ Input sanitization (Formspree handles)

**Future Additions:**
- [ ] reCAPTCHA v3
- [ ] Rate limiting
- [ ] CSRF protection (if adding backend)

### Headers

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
```

---

## Analytics Integration

### Google Analytics 4

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Event Tracking

```javascript
// Track booking form submissions
document.getElementById('booking-form').addEventListener('submit', function() {
  gtag('event', 'booking_submitted', {
    'event_category': 'engagement',
    'event_label': 'Booking Form'
  });
});

// Track artist selection
artistCards.forEach(card => {
  card.addEventListener('click', function() {
    gtag('event', 'artist_selected', {
      'event_category': 'engagement',
      'event_label': this.dataset.artist
    });
  });
});

// Track portfolio image views
portfolioItems.forEach(item => {
  item.addEventListener('click', function() {
    gtag('event', 'portfolio_view', {
      'event_category': 'engagement',
      'event_label': this.dataset.category
    });
  });
});
```

---

## Maintenance & Updates

### Content Update Process

**How to update portfolio images:**
1. Optimize new image (WebP, <200KB)
2. Add to `/assets/images/portfolio/[artist]/`
3. Update corresponding HTML section
4. Commit and push to Git
5. Auto-deploys via Netlify

**How to update artist bios:**
1. Open `artists.html`
2. Find artist's `.profile-bio` section
3. Update text content
4. Commit and push

### Version Control

**Git workflow:**
```bash
# Make changes
git add .
git commit -m "Update: Added new portfolio images for Amelia"
git push origin main

# Netlify auto-deploys from main branch
```

---

## Performance Benchmarks

**Target Metrics:**
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1
- First Input Delay: <100ms

**File Size Targets:**
- HTML: <50KB (minified)
- CSS: <30KB (inline)
- JS: <20KB
- Images: <200KB each
- Total page weight: <1.5MB

---

## Browser Support Matrix

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | 90+ | Full ✅ |
| Safari | 14+ | Full ✅ |
| Firefox | 88+ | Full ✅ |
| Edge | 90+ | Full ✅ |
| iOS Safari | 14+ | Full ✅ |
| Android Chrome | 90+ | Full ✅ |
| IE11 | - | None ❌ |

---

## Known Limitations

1. **No backend** - All processing client-side or via Formspree
2. **Static content** - Requires manual updates (no CMS)
3. **No user accounts** - No client portal functionality
4. **Simple form handling** - No deposit payments or scheduling
5. **No search** - Small site, not needed yet

**Future considerations:** Add headless CMS (Netlify CMS), integrate Stripe for deposits, add appointment scheduling API.

---

## Quick Reference Commands

```bash
# Start local server (if using)
python -m http.server 8000

# Validate HTML
npx htmlhint **/*.html

# Check for broken links
npx broken-link-checker http://localhost:8000

# Lighthouse audit
npx lighthouse http://localhost:8000 --view

# Deploy to Netlify
git push origin main  # Auto-deploys
```

---

**Last Updated:** October 16, 2025  
**Version:** 1.0  
**Maintainer:** Cursor AI Agent