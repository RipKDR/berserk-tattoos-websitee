# Performance Optimization Guide - Berserk Tattoos

## Current Performance Status

### ✅ Already Optimized

- Inline CSS (no render-blocking external stylesheets)
- No external JavaScript dependencies
- Font preconnect configured
- IntersectionObserver lazy loading ready
- Efficient event delegation
- Smooth scroll behavior

### 🔧 Pending Optimizations

- CSS/JS minification
- Image optimization (see IMAGE-OPTIMIZATION-GUIDE.md)
- Resource preloading
- Critical asset prioritization

---

## CSS/JS Minification

### Current State

- CSS: ~800-1000 lines per page (inline `<style>` tags)
- JavaScript: ~200-300 lines per page (inline `<script>` tags)
- Total unminified: ~15-20KB CSS + ~8-10KB JS per page

### Target State (After Minification)

- CSS: Reduce by 30-40% → ~10-12KB per page
- JavaScript: Reduce by 20-30% → ~6-8KB per page
- **Total savings: ~8-10KB per page load**

### Method 1: Online Tools (Quick & Easy)

#### For CSS Minification

1. Go to [CSS Minifier](https://cssminifier.com/) or [CSS Minify](https://cssminify.com/)
2. Copy entire `<style>` block from HTML file
3. Paste into minifier
4. Click "Minify"
5. Replace original CSS with minified version

**Example:**

```css
/* Before (21 bytes) */
.nav-container {
  position: fixed;
}

/* After (20 bytes) */
.nav-container {
  position: fixed;
}
```

#### For JavaScript Minification

1. Go to [JavaScript Minifier](https://javascript-minifier.com/) or [Minify JS](https://www.minifycode.com/javascript-minifier/)
2. Copy entire `<script>` block contents
3. Paste into minifier
4. Click "Minify"
5. Replace original JS with minified version

**Important:** Keep comments like Google Analytics setup instructions!

### Method 2: Automated Build Process (Advanced)

#### Using Terser (CLI)

```bash
# Install Terser globally
npm install -g terser

# Minify JavaScript
terser input.js -o output.min.js --compress --mangle

# With source maps
terser input.js -o output.min.js --compress --mangle --source-map
```

#### Using cssnano (CLI)

```bash
# Install cssnano
npm install -g cssnano-cli

# Minify CSS
cssnano input.css output.min.css
```

### Method 3: VS Code Extensions

#### CSS Minifier

- Extension: "Minify" by HookyQR
- Right-click CSS → "Minify" → Automatically creates .min.css

#### JS Minifier

- Extension: "JS & CSS Minifier" by olback
- Select code → Command Palette → "Minify"

---

## Critical Asset Preloading

### What to Preload

1. **Fonts** (Already done ✅)
2. **Critical images** (Hero section, artist portraits)
3. **Important scripts** (Google Analytics)

### Current Preloading (Already Implemented)

```html
<!-- Already in index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### Additional Preloading to Add

#### Add to `<head>` of index.html (after fonts)

```html
<!-- Preload critical hero images -->
<link
  rel="preload"
  as="image"
  href="/images/portfolio/amelia-1.webp"
  type="image/webp"
/>
<link
  rel="preload"
  as="image"
  href="/images/portfolio/ben-1.webp"
  type="image/webp"
/>
<link
  rel="preload"
  as="image"
  href="/images/portfolio/monique-1.webp"
  type="image/webp"
/>

<!-- Preload Google Analytics -->
<link
  rel="preload"
  as="script"
  href="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
/>
```

#### Add to `<head>` of artists.html

```html
<!-- Preload artist portrait images -->
<link
  rel="preload"
  as="image"
  href="/images/portfolio/amelia.webp"
  type="image/webp"
/>
<link
  rel="preload"
  as="image"
  href="/images/portfolio/ben.webp"
  type="image/webp"
/>
<link
  rel="preload"
  as="image"
  href="/images/portfolio/monique.webp"
  type="image/webp"
/>
```

#### Add to `<head>` of book.html

```html
<!-- Preload artist avatar images -->
<link
  rel="preload"
  as="image"
  href="/images/portfolio/amelia.webp"
  type="image/webp"
/>
<link
  rel="preload"
  as="image"
  href="/images/portfolio/ben.webp"
  type="image/webp"
/>
<link
  rel="preload"
  as="image"
  href="/images/portfolio/monique.webp"
  type="image/webp"
/>
```

---

## Resource Hints

### DNS Prefetch (For External Resources)

Add to `<head>` section:

```html
<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
```

### Preconnect (For Critical Third-Party Resources)

Already implemented for Google Fonts ✅

Additional connections:

```html
<!-- Preconnect to Google Analytics -->
<link rel="preconnect" href="https://www.google-analytics.com" />
<link rel="preconnect" href="https://www.googletagmanager.com" />
```

---

## Lazy Loading Enhancement

### Current Implementation

```javascript
// Already in index.html - works but can be enhanced
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Add image loading logic here
        observer.unobserve(img);
      }
    });
  });
}
```

### Enhanced Implementation (Replace existing)

```javascript
// Enhanced lazy loading with fade-in effect
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // For background-image elements
          if (element.dataset.bg) {
            element.style.backgroundImage = `url('${element.dataset.bg}')`;
            element.classList.add("loaded");
          }

          // For img elements
          if (element.tagName === "IMG" && element.dataset.src) {
            element.src = element.dataset.src;
            element.classList.add("loaded");
          }

          observer.unobserve(element);
        }
      });
    },
    {
      rootMargin: "50px", // Start loading 50px before entering viewport
    }
  );

  // Observe all lazy-loadable elements
  document.querySelectorAll("[data-bg], img[data-src]").forEach((element) => {
    imageObserver.observe(element);
  });
}
```

### CSS for Lazy Loading (Add to style section)

```css
/* Lazy loading fade-in effect */
.lazy-load {
  opacity: 0;
  transition: opacity 0.3s ease-in;
}

.lazy-load.loaded {
  opacity: 1;
}
```

### HTML Implementation

```html
<!-- Before (eager loading) -->
<div
  class="gallery-item"
  style="background: url('/images/portfolio/amelia-1.jpg') center/cover;"
></div>

<!-- After (lazy loading) -->
<div
  class="gallery-item lazy-load"
  data-bg="/images/portfolio/amelia-1.webp"
></div>
```

---

## Font Optimization

### Current Implementation (Good)

```html
<link
  href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
  rel="stylesheet"
/>
```

### Optimized Implementation (Better)

```html
<!-- Add font-display: swap for immediate text rendering -->
<link
  href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

**Changes:**

- Reduced Cinzel weights (400, 600, 700 only)
- Reduced Inter weights (400, 500, 600 only)
- Explicit `display=swap` parameter
- **Saves ~30KB** in font loading

---

## Caching Strategy (For Server Configuration)

### Netlify Configuration (netlify.toml)

Already exists ✅ - Verify it includes:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    # Cache static assets for 1 year
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.html"
  [headers.values]
    # HTML files cached for 1 hour
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "*.jpg"
  [headers.values]
    # Images cached for 1 year
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.webp"
  [headers.values]
    # WebP images cached for 1 year
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## Compression (Server-Side)

### Enable Gzip/Brotli Compression

Most modern hosts (Netlify, Vercel) enable this automatically ✅

### Verify Compression

```bash
# Check if compression is enabled
curl -H "Accept-Encoding: gzip, deflate" -I https://berserktattoos.com/

# Should see:
# Content-Encoding: gzip  OR  Content-Encoding: br (brotli)
```

---

## Performance Monitoring

### Google Analytics 4 - Core Web Vitals

Already configured in tracking code ✅

### Additional Monitoring

```javascript
// Add to Google Analytics section
// Monitor Core Web Vitals
if ("PerformanceObserver" in window) {
  // Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    gtag("event", "LCP", {
      value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
      event_category: "Web Vitals",
    });
  });
  lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

  // First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      gtag("event", "FID", {
        value: Math.round(entry.processingStart - entry.startTime),
        event_category: "Web Vitals",
      });
    });
  });
  fidObserver.observe({ entryTypes: ["first-input"] });

  // Cumulative Layout Shift (CLS)
  let clsScore = 0;
  const clsObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsScore += entry.value;
      }
    });
  });
  clsObserver.observe({ entryTypes: ["layout-shift"] });

  // Report CLS on page unload
  window.addEventListener("beforeunload", () => {
    gtag("event", "CLS", {
      value: Math.round(clsScore * 1000),
      event_category: "Web Vitals",
    });
  });
}
```

---

## Quick Wins Summary

### Immediate (Do Today - 30 minutes)

1. ✅ **Minify CSS** → Use cssminifier.com

   - Copy `<style>` content
   - Minify online
   - Replace in HTML
   - **Result:** 4-6KB savings per page

2. ✅ **Minify JavaScript** → Use javascript-minifier.com

   - Copy `<script>` content
   - Minify online
   - Replace in HTML
   - **Result:** 2-3KB savings per page

3. ✅ **Add resource hints** → Add preconnect tags
   - Add DNS prefetch for Google Analytics
   - Add preconnect for critical origins
   - **Result:** 100-200ms faster resource loading

### Short-term (This Week - 2 hours)

4. ✅ **Optimize images** → See IMAGE-OPTIMIZATION-GUIDE.md

   - Convert to WebP
   - Compress with TinyJPG
   - **Result:** 60-70% image size reduction

5. ✅ **Add preload tags** → Preload critical resources

   - Hero images
   - Artist portraits
   - **Result:** 200-400ms faster perceived load

6. ✅ **Enhance lazy loading** → Implement fade-in effects
   - Add IntersectionObserver rootMargin
   - Add loaded state CSS
   - **Result:** Better UX, faster initial load

### Long-term (Optional - Future)

7. ⏳ **Service Worker** → Offline support
8. ⏳ **HTTP/2 Push** → Push critical assets
9. ⏳ **CDN** → Distribute static assets globally

---

## Expected Performance Impact

### Current Lighthouse Scores (Estimated)

- Performance: 75-85
- Accessibility: 95+
- Best Practices: 90+
- SEO: 100

### After All Optimizations

- Performance: **95-98** (+15-20 points)
- Accessibility: 95+ (maintain)
- Best Practices: 95+ (+5 points)
- SEO: 100 (maintain)

### Load Time Improvements

- **Current:** 3-4s on 3G, 1-2s on 4G
- **After:** 1-2s on 3G, <1s on 4G
- **Mobile users save:** 2-3 seconds per page load

### Business Impact

- Lower bounce rate (every 1s = 10% reduction in bounces)
- Better SEO rankings (Core Web Vitals are ranking factors)
- Higher conversion rates (faster sites convert better)
- Reduced hosting costs (smaller bandwidth usage)

---

## Testing Checklist

### Before Deployment

- [ ] Run Lighthouse audit (baseline)
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (iOS/Android)
- [ ] Verify all images load correctly
- [ ] Check console for errors
- [ ] Validate HTML/CSS

### After Optimization

- [ ] Run Lighthouse audit (compare results)
- [ ] Check PageSpeed Insights
- [ ] Verify WebP fallbacks work
- [ ] Test lazy loading behavior
- [ ] Monitor Core Web Vitals in GA4
- [ ] Check total page weight

### Tools

1. **Lighthouse** (built into Chrome DevTools)

   - F12 → Lighthouse tab → Generate report

2. **PageSpeed Insights** (<https://pagespeed.web.dev/>)

   - Enter URL → Analyze
   - Shows real-world data + lab data

3. **WebPageTest** (<https://www.webpagetest.org/>)

   - Detailed waterfall charts
   - Filmstrip view
   - Multiple location testing

4. **GTmetrix** (<https://gtmetrix.com/>)
   - Performance + Structure scores
   - Historical tracking
   - Recommendations

---

## Priority Action Items

### Critical (Do First)

1. ⭐ **Minify CSS/JS** (30 min) → 6-9KB savings
2. ⭐ **Optimize images** (1 hour) → 60-70% size reduction
3. ⭐ **Add preload tags** (15 min) → Faster perceived load

### High Priority

4. **Enhance lazy loading** (30 min) → Better UX
5. **Add Core Web Vitals tracking** (20 min) → Monitor performance
6. **Test cross-browser** (1 hour) → Ensure compatibility

### Nice to Have

7. **Reduce font weights** (5 min) → 30KB savings
8. **Add DNS prefetch** (5 min) → Faster third-party loads
9. **Create maintenance docs** (30 min) → Future-proof

---

**Total time for critical items:** ~2 hours  
**Expected performance gain:** 40-50% faster load times  
**Difficulty:** Easy to Medium
