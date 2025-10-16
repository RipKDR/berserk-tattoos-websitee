# Berserk Tattoos Website - Maintenance Guide

## 🎯 Overview

This guide provides comprehensive instructions for maintaining and updating the Berserk Tattoos website. The site is built with vanilla HTML, CSS, and JavaScript for maximum compatibility and ease of maintenance.

---

## 📁 File Structure

```
berserk-tattoos-website/
├── index.html              # Homepage
├── artists.html            # Artist portfolios
├── book.html              # Booking form
├── 404.html               # Error page
├── robots.txt             # SEO configuration
├── sitemap.xml            # Search engine sitemap
├── manifest.json          # PWA configuration
├── netlify.toml           # Deployment configuration
├── FAVICON-GUIDE.md       # Favicon creation guide
├── MAINTENANCE-GUIDE.md   # This file
└── images/
    └── portfolio/         # All portfolio images
        ├── amelia-*.jpg   # Amelia's portfolio (6 images)
        ├── ben-*.jpg      # Ben's portfolio (6 images)
        ├── monique-*.jpg  # Monique's portfolio (6 images)
        ├── amelia.jpg     # Amelia's portrait
        ├── ben.jpg        # Ben's portrait
        └── monique.jpg    # Monique's portrait
```

---

## 🔧 Regular Maintenance Tasks

### Weekly Tasks

- [ ] Check contact form submissions (via email)
- [ ] Review Google Analytics for any issues
- [ ] Test booking form functionality
- [ ] Verify all external links work

### Monthly Tasks

- [ ] Update portfolio images (add new work)
- [ ] Review and update artist bios if needed
- [ ] Check for broken links
- [ ] Update sitemap.xml if new pages added
- [ ] Review Google Search Console for issues

### Quarterly Tasks

- [ ] Update testimonials
- [ ] Review and update pricing in FAQ
- [ ] Check mobile responsiveness on new devices
- [ ] Update social media links if changed
- [ ] Review and update meta descriptions

---

## 📝 Content Updates

### Adding New Portfolio Images

1. **Prepare Images:**

   - Optimize to <200KB using TinyPNG.com
   - Resize to 800x1000px (portrait) or 1000x800px (landscape)
   - Save as JPG format

2. **Name Convention:**

   - Amelia: `amelia-7.jpg`, `amelia-8.jpg`, etc.
   - Ben: `ben-7.jpg`, `ben-8.jpg`, etc.
   - Monique: `monique-7.jpg`, `monique-8.jpg`, etc.

3. **Add to HTML:**

   ```html
   <!-- In artists.html, add to appropriate artist's portfolio grid -->
   <div
     class="portfolio-item"
     data-category="fineline"
     style="background: url('../images/portfolio/amelia-7.jpg') center/cover;"
   >
     <div class="portfolio-overlay">
       <div class="portfolio-info">
         <h4>New Piece Title</h4>
         <p>Style · Body part</p>
       </div>
     </div>
   </div>
   ```

4. **Update Homepage Gallery:**
   ```html
   <!-- In index.html, add to gallery grid -->
   <div
     class="gallery-item"
     style="background: url('../images/portfolio/amelia-7.jpg') center/cover;"
     data-artist="amelia"
   ></div>
   ```

### Updating Artist Bios

1. **Open `artists.html`**
2. **Find the artist's profile section:**
   ```html
   <div class="profile-bio">
     <p>Current bio content...</p>
   </div>
   ```
3. **Update with new information:**
   - Keep 150-200 words
   - Maintain professional tone
   - Include new achievements, specializations, or experience

### Updating Pricing Information

1. **Open `book.html`**
2. **Find the FAQ section (around line 775):**
   ```html
   <h3>How much will my tattoo cost?</h3>
   <p>Current pricing information...</p>
   ```
3. **Update pricing ranges as needed**

### Adding New Testimonials

1. **Open `index.html`**
2. **Find the testimonial section (around line 833):**
   ```html
   <div class="testimonial">
     <p class="testimonial-text">"Current testimonial..."</p>
     <p class="testimonial-author">— Client Name</p>
   </div>
   ```
3. **Replace with new testimonial:**
   - Keep authentic and specific
   - Include client name (first name + last initial)
   - Mention specific artist or service

---

## 🎨 Design Updates

### Changing Colors

The website uses CSS custom properties for easy color updates:

```css
:root {
  --color-dark: #111111; /* Main background */
  --color-light: #f2f2f2; /* Text color */
  --color-accent: #7b1113; /* Accent/CTA color */
}
```

**To change colors:**

1. Open any HTML file
2. Find the `:root` section in the `<style>` tag
3. Update the color values
4. Save and test

### Updating Typography

```css
:root {
  --font-display: "Cinzel", serif; /* Headings */
  --font-body: "Inter", sans-serif; /* Body text */
}
```

**To change fonts:**

1. Update the `--font-display` and `--font-body` variables
2. Add new font imports in the `<head>` section if needed
3. Test across all pages

---

## 🔍 SEO Maintenance

### Updating Meta Tags

Each page has its own meta tags in the `<head>` section:

```html
<title>Page Title | Berserk Tattoos</title>
<meta name="description" content="Page description (150-160 characters)" />
<meta property="og:title" content="Social media title" />
<meta property="og:description" content="Social media description" />
```

### Updating Sitemap

1. **Open `sitemap.xml`**
2. **Update `<lastmod>` dates when making changes:**
   ```xml
   <lastmod>2025-10-16</lastmod>
   ```
3. **Add new pages if created**

### Google Search Console

- Submit updated sitemap after changes
- Monitor for crawl errors
- Check Core Web Vitals scores

---

## 📊 Analytics & Tracking

### Google Analytics Setup

1. **Create GA4 Property:**

   - Go to https://analytics.google.com
   - Create new property for the website
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Update All HTML Files:**
   - Replace `GA_MEASUREMENT_ID` with your actual ID
   - Test that events are firing correctly

### Key Events Being Tracked

- **Homepage:**

  - Artist card clicks
  - Gallery image views
  - Booking CTA clicks

- **Artists Page:**

  - Artist tab switches
  - Portfolio filter usage
  - Portfolio image views
  - Booking CTA clicks

- **Booking Page:**
  - Artist selection
  - Form field completions
  - Form submissions

---

## 🚀 Deployment

### Netlify Deployment

1. **Connect Repository:**

   - Link your GitHub repository to Netlify
   - Set build command: (leave empty - static site)
   - Set publish directory: `berserk-tattoos-website`

2. **Custom Domain:**

   - Add your domain in Netlify dashboard
   - Update DNS records as instructed
   - Enable HTTPS (automatic)

3. **Environment Variables:**
   - No environment variables needed (static site)

### Manual Deployment

1. **Upload Files:**

   - Upload all files to your web hosting
   - Ensure directory structure is maintained

2. **Test:**
   - Check all pages load correctly
   - Test contact form
   - Verify mobile responsiveness

---

## 🐛 Troubleshooting

### Common Issues

**Images Not Loading:**

- Check file paths (should be `../images/portfolio/filename.jpg`)
- Verify image files exist in correct directory
- Check file permissions

**Form Not Working:**

- Verify mailto: links are properly formatted
- Check that email client is configured
- Test on different browsers/devices

**Mobile Issues:**

- Test on actual devices, not just browser dev tools
- Check viewport meta tag is present
- Verify touch targets are large enough (44px minimum)

**Analytics Not Working:**

- Verify GA4 Measurement ID is correct
- Check browser console for errors
- Ensure gtag script is loading

### Performance Issues

**Slow Loading:**

- Optimize images (use TinyPNG.com)
- Check for large files
- Test with PageSpeed Insights

**Layout Issues:**

- Check CSS custom properties are defined
- Verify responsive breakpoints
- Test on different screen sizes

---

## 📞 Contact Information Updates

### Update Contact Details

Search and replace across all HTML files:

**Email:** `berserk.tattoos.au@gmail.com`
**Phone:** `0478 128 212` or `+61478128212`
**Address:** `33 Southern Road, Heidelberg Heights, VIC 3081`

### Social Media Links

**Instagram:** `https://www.instagram.com/berserk_tattoos/`
**Facebook:** `https://www.facebook.com/BerserkTattoo/`

**Artist Social Links:**

- Amelia: `https://www.instagram.com/amzkelso/`
- Ben: `https://www.instagram.com/ben_whiteraven`
- Monique: `https://www.instagram.com/moniquemoore666/`

---

## 🔒 Security

### Best Practices

- Keep all files updated
- Use HTTPS (automatic with Netlify)
- Regular backups of content
- Monitor for broken links
- Keep contact information current

### Backup Strategy

1. **Code Backup:**

   - Use Git for version control
   - Regular commits with descriptive messages
   - Keep repository private

2. **Content Backup:**
   - Export portfolio images regularly
   - Keep copies of all text content
   - Document any custom changes

---

## 📈 Performance Monitoring

### Key Metrics to Track

- **Page Load Speed:** <3 seconds
- **Mobile Performance:** 95+ Lighthouse score
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint): <2.5s
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1

### Tools for Monitoring

- Google PageSpeed Insights
- Google Search Console
- Google Analytics
- Netlify Analytics (if using Netlify)

---

## 🎯 Future Enhancements

### Potential Additions

1. **Blog Section:**

   - Add blog.html page
   - Update navigation
   - Add to sitemap

2. **Online Booking System:**

   - Replace mailto: with proper booking system
   - Add calendar integration
   - Payment processing

3. **Client Portal:**

   - Login system
   - Appointment history
   - Aftercare instructions

4. **E-commerce:**
   - Merchandise sales
   - Gift certificates
   - Aftercare products

### Technical Improvements

1. **Image Optimization:**

   - Convert to WebP format
   - Implement lazy loading
   - Add responsive images

2. **Performance:**

   - Minify CSS/JS
   - Implement service worker
   - Add caching headers

3. **Accessibility:**
   - Add more ARIA labels
   - Improve keyboard navigation
   - Add screen reader support

---

## 📋 Maintenance Checklist

### Daily

- [ ] Check for form submissions
- [ ] Monitor site uptime

### Weekly

- [ ] Test all functionality
- [ ] Check analytics
- [ ] Review contact form

### Monthly

- [ ] Update portfolio
- [ ] Check for broken links
- [ ] Review SEO performance
- [ ] Update testimonials

### Quarterly

- [ ] Full site audit
- [ ] Update pricing
- [ ] Review and update content
- [ ] Check mobile compatibility
- [ ] Performance optimization

---

## 🆘 Emergency Contacts

**Technical Issues:**

- Web developer contact information
- Hosting provider support
- Domain registrar support

**Content Issues:**

- Studio manager contact
- Artist contact information
- Social media manager

---

_This maintenance guide should be updated whenever significant changes are made to the website structure or functionality._

**Last Updated:** October 16, 2025
**Version:** 1.0
