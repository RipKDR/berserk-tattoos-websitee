# Maintenance Guide - Berserk Tattoos Website

## Overview

This guide provides step-by-step instructions for maintaining and updating the Berserk Tattoos website. Designed for non-technical users and developers alike.

---

## Table of Contents

1. [Common Updates](#common-updates)
2. [Content Management](#content-management)
3. [Image Management](#image-management)
4. [SEO Maintenance](#seo-maintenance)
5. [Analytics & Monitoring](#analytics--monitoring)
6. [Troubleshooting](#troubleshooting)
7. [Contact Information Updates](#contact-information-updates)

---

## Common Updates

### Updating Text Content

#### Home Page (index.html)

**Update Hero Tagline:**

1. Open `index.html`
2. Find line ~833: `<p class="hero-tagline">`
3. Edit text between `<p>` and `</p>`
4. Keep it under 200 characters
5. Save file

**Update Artist Bios:**

1. Open `index.html`
2. Find line ~863 (Amelia), ~874 (Ben), or ~885 (Monique)
3. Edit text in `<p class="artist-bio">` section
4. Keep around 60-80 words
5. Save file

**Update Testimonials:**

1. Open `index.html`
2. Find line ~920: `<p class="testimonial-text">`
3. Edit testimonial text
4. Update author name on line ~921
5. Keep rating as `★★★★★`
6. Save file

#### Artists Page (artists.html)

**Update Full Artist Bios:**

1. Open `artists.html`
2. Find the artist section:
   - Amelia: Line ~618
   - Ben: Line ~724
   - Monique: Line ~828
3. Edit paragraphs in `<div class="profile-bio">`
4. Keep 150-200 words total
5. Save file

**Update Artist Statistics:**

1. Find `.profile-stats` section for each artist
2. Update numbers in `<span class="stat-number">`
3. Keep labels consistent
4. Save file

#### Booking Page (book.html)

**Update Pricing in FAQ:**

1. Open `book.html`
2. Find line ~796: "How much will my tattoo cost?"
3. Edit pricing ranges
4. Keep format consistent: `$X - $X`
5. Save file

**Update Process Timeline:**

1. Find line ~799: "How far in advance should I book?"
2. Edit timeline information
3. Update wait times as needed
4. Save file

---

## Content Management

### Adding New Portfolio Images

#### Step 1: Prepare Image

```
1. Optimize image to <200KB (use TinyPNG.com)
2. Convert to WebP (optional but recommended)
3. Name file: `artist-number.jpg` (e.g., `amelia-7.jpg`)
4. Save to: `images/portfolio/` folder
```

#### Step 2: Add to Home Page Gallery

Open `index.html` and find the gallery section (~900):

```html
<!-- Add after existing gallery items -->
<div
  class="gallery-item"
  style="background: url('/images/portfolio/amelia-7.jpg') center/cover;"
  data-artist="amelia"
  role="img"
  aria-label="Fine line tattoo by Amelia Kelso"
></div>
```

#### Step 3: Add to Artist Portfolio Page

Open `artists.html` and find artist's portfolio grid:

```html
<!-- Find the artist's .portfolio-grid section and add: -->
<div
  class="portfolio-item"
  data-category="fineline"
  style="background: url('../images/portfolio/amelia-7.jpg') center/cover;"
>
  <div class="portfolio-overlay">
    <div class="portfolio-info">
      <h4>Design Name</h4>
      <p>Fine line · Placement</p>
    </div>
  </div>
</div>
```

**Categories by Artist:**

- Amelia: `fineline`, `botanical`, `script`, `minimal`
- Ben: `portrait`, `wildlife`, `photo`
- Monique: `blackwork`, `dotwork`, `illustrative`

### Removing Portfolio Images

1. **From HTML:**

   - Find the `<div class="gallery-item">` or `<div class="portfolio-item">`
   - Delete entire `<div>...</div>` block
   - Save file

2. **From Server:**
   - Navigate to `images/portfolio/` folder
   - Delete the image file
   - Delete WebP version if it exists

### Adding New Artists

#### Step 1: Add to Home Page

Open `index.html`, find artists section (~857), add before closing tag:

```html
<div
  class="artist-card"
  onclick="window.location.href='artists.html#newartist'"
>
  <div
    class="artist-image"
    style="background: url('/images/portfolio/newartist.jpg') center/cover;"
    role="img"
    aria-label="Portrait of New Artist Name"
  ></div>
  <div class="artist-info">
    <h3 class="artist-name">New Artist Name</h3>
    <p class="artist-specialty">Specialty Style</p>
    <p class="artist-bio">Short bio 60-80 words...</p>
    <a href="artists.html#newartist" class="artist-cta">VIEW PORTFOLIO</a>
  </div>
</div>
```

#### Step 2: Add to Artists Page

Open `artists.html`:

1. **Add navigation button** (~604):

```html
<button
  class="artist-nav-btn"
  data-artist="newartist"
  aria-label="View New Artist's portfolio"
>
  NEW ARTIST NAME
</button>
```

2. **Add full profile section** (after last artist section):

```html
<section class="artist-profile" id="newartist" data-profile="newartist">
  <!-- Copy entire structure from existing artist section -->
  <!-- Update all content -->
</section>
```

3. **Update JavaScript** (~951):

```javascript
// No changes needed - dynamically handles new artists
// Just ensure data-artist and data-profile attributes match
```

---

## Image Management

### Image Optimization Workflow

#### For Each New Image:

```
1. Original photo (taken/received)
   ↓
2. Edit/crop if needed
   ↓
3. Save as JPEG, quality 90
   ↓
4. Visit TinyJPG.com
   ↓
5. Upload and download compressed version
   ↓
6. (Optional) Convert to WebP at Squoosh.app
   ↓
7. Upload to images/portfolio/
   ↓
8. Add to HTML files
```

### File Naming Convention

- **Portfolio images:** `artist-number.jpg` (e.g., `amelia-7.jpg`)
- **Artist portraits:** `artist.jpg` (e.g., `amelia.jpg`)
- **WebP versions:** Same name with `.webp` extension
- **No spaces or special characters**

### Image Specifications

- **File size:** <200KB (target <150KB)
- **Dimensions:**
  - Portfolio: 1200-1920px wide
  - Portraits: 800-1200px wide
- **Format:** JPEG or WebP
- **Quality:** 80-85

### Folder Structure

```
images/
└── portfolio/
    ├── amelia-1.jpg
    ├── amelia-1.webp
    ├── amelia-2.jpg
    ├── amelia-2.webp
    ├── ... (all portfolio images)
    ├── amelia.jpg     (portrait)
    ├── ben.jpg        (portrait)
    └── monique.jpg    (portrait)
```

---

## SEO Maintenance

### Update Sitemap

When adding new pages or making major changes:

1. Open `sitemap.xml`
2. Update `<lastmod>` date to current date (format: YYYY-MM-DD)
3. Add new pages if needed:

```xml
<url>
  <loc>https://berserktattoos.com/new-page.html</loc>
  <lastmod>2025-10-17</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

4. Save file
5. Resubmit to Google Search Console (if major changes)

### Update Meta Descriptions

For better SEO, update meta descriptions when content changes significantly:

1. Open HTML file (index.html, artists.html, or book.html)
2. Find line ~9: `<meta name="description">`
3. Update description (150-160 characters)
4. Keep it relevant and compelling
5. Include keywords naturally
6. Save file

### Monitor SEO Performance

**Google Search Console** (https://search.google.com/search-console)

- Check weekly for:
  - Index coverage issues
  - Mobile usability problems
  - Search performance trends
  - Core Web Vitals

---

## Analytics & Monitoring

### Google Analytics 4 Setup

1. Create GA4 property at https://analytics.google.com/
2. Copy Measurement ID (format: `G-XXXXXXXXXX`)
3. Replace `GA_MEASUREMENT_ID` in all HTML files:
   - `index.html` line ~1088
   - `artists.html` (if implemented)
   - `book.html` line ~1008
4. Deploy changes
5. Verify in GA4 Real-Time reports

### Key Metrics to Monitor

#### Weekly:

- **Page views:** Total site traffic
- **Booking requests:** Form submissions
- **Artist views:** Which artists get most attention
- **Device breakdown:** Mobile vs desktop
- **Top pages:** Most visited pages

#### Monthly:

- **Traffic sources:** Where visitors come from
- **Bounce rate:** Should be <60%
- **Average session duration:** Target >2 minutes
- **Conversion rate:** Booking requests / total visits
- **Core Web Vitals:** LCP, FID, CLS scores

### Events Being Tracked

**Homepage (index.html):**

- `click_book_now` - CTA button clicks
- `view_artist` - Artist card clicks
- `view_gallery_image` - Gallery modal opens

**Booking Page (book.html):**

- `select_artist` - Artist selection
- `form_placement_filled` - Placement field filled
- `form_size_filled` - Size field filled
- `form_description_filled` - Description completed
- `booking_request_submitted` - Form submission (CONVERSION)
- `generate_lead` - GA4 conversion event
- `click_phone` - Phone number clicks
- `click_email` - Email link clicks

### Conversion Funnel Analysis

Track how users move through booking process:

```
1. Visit homepage → 100% of visitors
2. Click "Book Now" → Track in GA4
3. Select artist → Track in GA4
4. Fill form fields → Track in GA4
5. Submit booking → CONVERSION
```

**Optimize drop-off points** where users leave the funnel.

---

## Troubleshooting

### Common Issues

#### Images Not Loading

**Symptoms:** Broken image icons or gray boxes

**Solutions:**

1. Check file path is correct: `/images/portfolio/filename.jpg`
2. Verify file exists in `images/portfolio/` folder
3. Check file name matches exactly (case-sensitive)
4. Ensure image is not corrupted (open in image viewer)
5. Clear browser cache and refresh (Ctrl+F5)

#### Form Not Sending Email

**Symptoms:** Form submits but no email received

**Solutions:**

1. Check email client is configured on user's device
2. Verify email address in form: `berserk.tattoos.au@gmail.com`
3. Test with different browser
4. Check spam/junk folder
5. Verify mailto: link is correctly formatted

#### Mobile Menu Not Working

**Symptoms:** Hamburger menu doesn't open

**Solutions:**

1. Check JavaScript console for errors (F12 → Console)
2. Verify `mobile-menu` ID exists in HTML
3. Ensure no conflicting CSS hiding elements
4. Test on different mobile device/browser
5. Clear cache and reload

#### Styling Looks Broken

**Symptoms:** Layout is messy, colors are wrong

**Solutions:**

1. Check for missing closing tags `</div>`, `</section>`
2. Verify CSS `<style>` tag is not accidentally deleted
3. Look for syntax errors in CSS (missing semicolons, brackets)
4. Clear browser cache (Ctrl+F5)
5. Test in incognito mode

#### Slow Page Loading

**Symptoms:** Site takes >5 seconds to load

**Solutions:**

1. Run Lighthouse audit to identify bottlenecks
2. Check image file sizes (should be <200KB each)
3. Verify images are optimized (see IMAGE-OPTIMIZATION-GUIDE.md)
4. Test on different network (3G vs WiFi)
5. Check hosting server status

### Browser Compatibility

**Fully Supported:**

- ✅ Chrome 90+ (desktop & mobile)
- ✅ Firefox 88+ (desktop & mobile)
- ✅ Safari 14+ (desktop & mobile)
- ✅ Edge 90+
- ✅ Samsung Internet 14+

**Partially Supported:**

- ⚠️ IE 11 (will work but with degraded features)
- ⚠️ Older Android browsers (< Chrome 90)

**Testing Checklist:**

- [ ] Test on Chrome (desktop)
- [ ] Test on Safari (iOS)
- [ ] Test on Firefox (desktop)
- [ ] Test on Chrome (Android)
- [ ] Test on Edge (desktop)

---

## Contact Information Updates

### Updating Phone Number

**Current:** 0478 128 212

Search and replace in all files:

1. Tel link format: `tel:+61478128212`
2. Display format: `0478 128 212`
3. **Files to update:**
   - `index.html` (line ~946)
   - `book.html` (line ~767)
   - Schema.org structured data in index.html (line ~62)

### Updating Email Address

**Current:** berserk.tattoos.au@gmail.com

Search and replace in all files:

1. Mailto link: `mailto:berserk.tattoos.au@gmail.com`
2. Display text: `berserk.tattoos.au@gmail.com`
3. **Files to update:**
   - `index.html` (line ~953)
   - `book.html` (line ~768, ~941)
   - Schema.org structured data (line ~63)

### Updating Physical Address

**Current:** 33 Southern Road, Heidelberg Heights, VIC 3081

**Files to update:**

1. `index.html` (line ~938-939, Schema.org line ~51-55)
2. Update all address components:
   - Street address
   - Locality (suburb)
   - Region (state)
   - Postal code
   - Coordinates (use Google Maps)

### Updating Business Hours

**Current:** Mon-Sun 12:00-19:00, Tue 12:00-17:00

**Files to update:**

1. `index.html` (line ~945)
2. Schema.org structured data (line ~66-78)
3. Format: 24-hour time (12:00, 19:00)

### Updating Social Media Links

**Current:**

- Instagram: `@berserk_tattoos`, `@amzkelso`, `@ben_whiteraven`, `@moniquemoore666`
- Facebook: `/BerserkTattoo/`, Monique's page
- TikTok: `@monique.moore666`
- Threads: Artist-specific accounts

**Files to update:**

1. `index.html` (line ~961-962)
2. `artists.html` (line ~648-650, ~754-755, ~858-861)
3. Format: Full URL including `https://`

---

## Backup & Version Control

### Before Making Changes

1. **Create backup:**

   - Copy entire project folder
   - Name it: `berserk-tattoos-backup-YYYY-MM-DD`
   - Store in safe location

2. **Test changes locally:**

   - Open HTML files in browser
   - Check all functionality works
   - Verify on multiple devices

3. **Deploy to production:**
   - Upload changed files only
   - Test immediately after deployment
   - Keep backup for 30 days

### Version Control (Recommended)

**Using Git:**

```bash
# Initialize repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub (optional)
git push origin main
```

---

## Deployment Checklist

### Before Every Deployment

- [ ] Test all pages locally in browser
- [ ] Verify images load correctly
- [ ] Test form submission
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit
- [ ] Validate HTML (validator.w3.org)
- [ ] Check for console errors
- [ ] Test all links work
- [ ] Verify contact information is correct
- [ ] Backup current production files

### After Deployment

- [ ] Visit live site immediately
- [ ] Test booking form
- [ ] Check Google Analytics tracking
- [ ] Verify images load on production
- [ ] Test on mobile device
- [ ] Check all artist pages
- [ ] Verify social media links
- [ ] Monitor for 24 hours

---

## Regular Maintenance Schedule

### Daily

- Monitor Google Analytics for anomalies
- Check for form submissions in email
- Respond to booking inquiries

### Weekly

- Review analytics dashboard
- Check for website errors
- Update portfolio with new work (if available)
- Respond to any feedback

### Monthly

- Review SEO performance in Search Console
- Update sitemap lastmod dates
- Run Lighthouse audit
- Check for broken links
- Review and update pricing if needed
- Backup website files

### Quarterly

- Review and update artist bios
- Refresh testimonials
- Audit all images for relevance
- Update FAQ section
- Review and optimize page load speeds

### Annually

- Review all content for accuracy
- Update copyright year in footer
- Major SEO audit
- Full redesign consideration (if needed)

---

## Getting Help

### Technical Support Resources

**HTML/CSS/JavaScript Help:**

- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)
- [Stack Overflow](https://stackoverflow.com/)

**Image Optimization:**

- [TinyPNG](https://tinypng.com/) - Compress images
- [Squoosh](https://squoosh.app/) - Convert to WebP
- [ImageOptim](https://imageoptim.com/) - Mac app

**SEO Tools:**

- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

**Validation Tools:**

- [HTML Validator](https://validator.w3.org/)
- [CSS Validator](https://jigsaw.w3.org/css-validator/)
- [Link Checker](https://validator.w3.org/checklink)

### Emergency Contacts

- **Hosting Support:** Netlify (or your hosting provider)
- **Domain Support:** Domain registrar
- **Developer:** Contact original developer if major issues

---

## Documentation Updates

**This guide should be updated when:**

- New features are added to the website
- Contact information changes
- New maintenance procedures are established
- Common issues are discovered and solved

**How to update:**

1. Open this file: `MAINTENANCE-GUIDE.md`
2. Make changes in clear, simple language
3. Save with updated date in "Last Updated" section below
4. Commit to version control if using Git

---

**Last Updated:** October 16, 2025  
**Version:** 1.0  
**Author:** Development Team  
**Next Review:** January 2026

---

_For emergency website issues, refer to TROUBLESHOOTING section above or contact your hosting provider's support team._
