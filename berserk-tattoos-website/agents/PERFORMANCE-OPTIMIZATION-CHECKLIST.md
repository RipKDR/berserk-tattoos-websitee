# ✅ PERFORMANCE OPTIMIZATION CHECKLIST

Quick reference checklist for implementing the performance optimizations identified in the audit.

---

## 🚀 PHASE 1: QUICK WINS (45 Minutes)

**Target: +5-8 Performance Points**

### [ ] 1. Add Image Preload (15 min)

**Files to Edit:** `index.html`, `artists.html`

Add to `<head>` section after meta tags:

```html
<!-- Preload LCP images -->
<link
  rel="preload"
  as="image"
  href="/images/portfolio/amelia-1.jpg"
  imagesrcset="/images/portfolio/amelia-1.webp"
  type="image/webp"
/>
```

**index.html:** Preload hero gallery images (amelia-1, ben-1, monique-1)  
**artists.html:** Preload first artist portrait (amelia.jpg)

---

### [ ] 2. Reduce Font Weights (15 min)

**Files to Edit:** All HTML files

**Current Font URL:**

```html
<link
  href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
  rel="stylesheet"
/>
```

**Optimized Font URL:**

```html
<link
  href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@400;600&display=swap"
  rel="stylesheet"
/>
```

**Impact:** Removes 4 font weights, saves ~80 KB

---

### [ ] 3. Add Defer to Scripts (5 min)

**Files to Edit:** All HTML files

Update Google Analytics script tag:

```html
<script
  defer
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
```

---

### [ ] 4. Add Netlify Cache Headers (10 min)

**File to Edit:** `netlify.toml`

Add to netlify.toml:

```toml
# Cache static assets aggressively
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/portfolio/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.webp"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# HTML files - no cache, always revalidate
[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

---

## 🔨 PHASE 2: IMAGE OPTIMIZATION (6-8 Hours)

**Target: +15-18 Performance Points**

### [ ] 5. Compress All JPG Images (1 hour)

**Tools:**

- Online: TinyPNG (https://tinypng.com/)
- Desktop: ImageOptim (Mac), Squoosh (Web)
- CLI: `npm install -g sharp-cli`

**Process:**

1. Backup original images
2. Batch compress all 21 images in `/portfolio/` folder
3. Target: 40-50% size reduction
4. Maintain visual quality

**Command (if using Sharp CLI):**

```bash
cd portfolio
sharp-cli --input "*.jpg" --output "./optimized/" --format jpeg --quality 85 --mozjpeg
```

**Expected Results:**

- Average size: 271 KB → 150 KB
- Total savings: ~2.3 MB

---

### [ ] 6. Convert Images to WebP (2-3 hours)

**Tools:**

- Online: Squoosh (https://squoosh.app/)
- CLI: `cwebp` or Sharp

**Process:**

1. Generate WebP versions of all images
2. Keep JPG as fallback
3. Update HTML with `<picture>` elements

**Command (if using cwebp):**

```bash
cd portfolio
for file in *.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

**HTML Update Pattern:**

**Before:**

```html
<img
  class="media-cover"
  src="/images/portfolio/amelia-1.jpg"
  alt="Fine line tattoo by Amelia Kelso"
  width="800"
  height="1000"
  loading="lazy"
  decoding="async"
/>
```

**After:**

```html
<picture>
  <source srcset="/images/portfolio/amelia-1.webp" type="image/webp" />
  <img
    class="media-cover"
    src="/images/portfolio/amelia-1.jpg"
    alt="Fine line tattoo by Amelia Kelso"
    width="800"
    height="1000"
    loading="lazy"
    decoding="async"
  />
</picture>
```

**Files to Update:**

- [ ] `index.html` (11 images)
- [ ] `artists.html` (21 images)
- [ ] `book.html` (3 background images - CSS update)

**Expected Results:**

- WebP size: ~30% of JPG size
- Total savings: ~3.5 MB

---

### [ ] 7. Implement Responsive Images (2-3 hours)

**Generate Multiple Sizes:**

```bash
# 400px width (mobile)
sharp-cli --input "*.jpg" --output "./400w/" --resize 400

# 800px width (tablet/desktop)
sharp-cli --input "*.jpg" --output "./800w/" --resize 800

# 1200px width (large desktop)
sharp-cli --input "*.jpg" --output "./1200w/" --resize 1200
```

**HTML Update Pattern:**

**Before:**

```html
<picture>
  <source srcset="/images/portfolio/amelia-1.webp" type="image/webp" />
  <img class="media-cover" src="/images/portfolio/amelia-1.jpg" ... />
</picture>
```

**After:**

```html
<picture>
  <source
    type="image/webp"
    srcset="
      /images/portfolio/amelia-1-400w.webp   400w,
      /images/portfolio/amelia-1-800w.webp   800w,
      /images/portfolio/amelia-1-1200w.webp 1200w
    "
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
  />
  <source
    type="image/jpeg"
    srcset="
      /images/portfolio/amelia-1-400w.jpg   400w,
      /images/portfolio/amelia-1-800w.jpg   800w,
      /images/portfolio/amelia-1-1200w.jpg 1200w
    "
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
  />
  <img
    class="media-cover"
    src="/images/portfolio/amelia-1-800w.jpg"
    alt="Fine line tattoo by Amelia Kelso"
    width="800"
    height="1000"
    loading="lazy"
    decoding="async"
  />
</picture>
```

**Expected Results:**

- Mobile: 400w images (~80 KB vs 270 KB)
- Savings: ~2 MB on mobile devices

---

### [ ] 8. Remove Unused CSS (1 hour)

**Manual Audit:**

1. Open Chrome DevTools → Coverage panel
2. Record CSS usage while navigating all pages
3. Identify unused rules
4. Remove or lazy-load unused styles

**Common Unused Styles:**

- Modal styles (if not used on every page)
- Some animation keyframes
- Unused responsive breakpoints

**Target:** Remove 3-4 KB per page

---

## 🏗️ PHASE 3: ADVANCED OPTIMIZATIONS (Optional)

### [ ] 9. Self-Host Fonts (2 hours)

**Process:**

1. Download fonts from Google Fonts
2. Use `subfont` or `glyphhanger` to subset
3. Host in `/fonts/` directory
4. Update CSS with `@font-face`

**CSS Update:**

```css
@font-face {
  font-family: "Cinzel";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/cinzel-v11-latin-regular.woff2") format("woff2");
}
```

---

### [ ] 10. Minify HTML (30 min)

**Build Process:**

```bash
npm install -g html-minifier
html-minifier --collapse-whitespace --remove-comments --minify-css --minify-js index.html -o index.min.html
```

**Or use Netlify plugin:**
Add to `netlify.toml`:

```toml
[[plugins]]
  package = "netlify-plugin-minify-html"
```

---

### [ ] 11. Implement Service Worker (6 hours)

**Create `sw.js`:**

```javascript
const CACHE_NAME = "berserk-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/artists.html",
  "/book.html",
  "/images/portfolio/amelia-1.webp",
  // ... more assets
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

**Register in HTML:**

```javascript
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

---

## 📊 TESTING CHECKLIST

After each phase, test performance:

### [ ] Lighthouse Audit (Chrome DevTools)

1. Open Chrome DevTools
2. Navigate to Lighthouse tab
3. Select "Performance" category
4. Run audit
5. Record scores

### [ ] WebPageTest

1. Go to https://www.webpagetest.org/
2. Enter site URL
3. Select location: Sydney, Australia
4. Run test
5. Record metrics

### [ ] Real Device Testing

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Desktop (Chrome)
- [ ] Desktop (Safari)
- [ ] Desktop (Firefox)

### [ ] Metrics to Track

- [ ] Performance Score: \_\_\_/100
- [ ] FCP: \_\_\_ seconds
- [ ] LCP: \_\_\_ seconds
- [ ] TBT: \_\_\_ ms
- [ ] CLS: \_\_\_
- [ ] Page Weight: \_\_\_ MB

---

## 🎯 SUCCESS CRITERIA

✅ **Phase 1 Complete When:**

- [ ] Performance Score increased by 5-8 points
- [ ] Font payload reduced to ~100 KB
- [ ] Cache headers configured
- [ ] Scripts loading with defer

✅ **Phase 2 Complete When:**

- [ ] All images converted to WebP with JPG fallback
- [ ] All images compressed and optimized
- [ ] Responsive images implemented
- [ ] Image payload reduced by 60-70%

✅ **Phase 3 Complete When:**

- [ ] Fonts self-hosted (optional)
- [ ] HTML minified in production
- [ ] Service worker caching assets

✅ **Final Success When:**

- [ ] **Lighthouse Performance: 90+ on all pages** ✅
- [ ] LCP < 2.5 seconds
- [ ] FCP < 1.8 seconds
- [ ] CLS < 0.1
- [ ] Total page weight < 1.5 MB

---

## 📝 NOTES

**Image Optimization Tools:**

- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- ImageOptim: https://imageoptim.com/
- Sharp: https://sharp.pixelplumbing.com/

**Performance Testing:**

- PageSpeed Insights: https://pagespeed.web.dev/
- WebPageTest: https://www.webpagetest.org/
- GTmetrix: https://gtmetrix.com/

**Font Tools:**

- Subfont: https://github.com/Munter/subfont
- Glyphhanger: https://github.com/zachleat/glyphhanger

---

**Last Updated:** October 16, 2025  
**Status:** Ready for Implementation 🚀
