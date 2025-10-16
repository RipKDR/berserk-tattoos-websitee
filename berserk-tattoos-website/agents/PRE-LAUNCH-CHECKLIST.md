# Pre-Launch Checklist - Berserk Tattoos Website

## Overview
Complete this checklist before deploying to production. Each item is categorized by priority and includes verification steps.

---

## Critical (Must Complete Before Launch)

### 1. Favicon & Brand Assets
- [ ] **Favicon.ico created** (32x32, 16x16 multi-size)
  - [ ] Black/red color scheme (#111111, #7B1113)
  - [ ] Tested in multiple browsers
  - [ ] File size <50KB
  
- [ ] **Apple Touch Icon** (apple-touch-icon.png - 180x180)
  - [ ] Optimized for iOS home screen
  - [ ] PNG format, transparent background
  
- [ ] **Android Chrome Icons**
  - [ ] android-chrome-192x192.png created
  - [ ] android-chrome-512x512.png created
  - [ ] Both optimized (<100KB each)
  
- [ ] **OG Image** (og-image.jpg - 1200x630)
  - [ ] Created for social media sharing
  - [ ] Includes studio branding
  - [ ] Optimized to <300KB
  - [ ] Updated in all HTML meta tags

**How to verify:**
```bash
# Check files exist
ls -la *.ico *.png og-image.jpg

# Check file sizes
du -h favicon.ico apple-touch-icon.png og-image.jpg
```

### 2. Contact Information Verification
- [ ] **Email address** tested and receiving
  - [ ] berserk.tattoos.au@gmail.com accessible
  - [ ] Mailto: links work in all browsers
  - [ ] Auto-reply set up (optional)
  
- [ ] **Phone number** correct
  - [ ] Tel links work on mobile (+61478128212)
  - [ ] Number answers during business hours
  - [ ] Voicemail set up
  
- [ ] **Physical address** accurate
  - [ ] 33 Southern Road, Heidelberg Heights, VIC 3081
  - [ ] Google Maps link works
  - [ ] Coordinates accurate (lat/long)
  
- [ ] **Business hours** updated
  - [ ] Schema.org structured data matches reality
  - [ ] Footer information current

**How to verify:**
- Click every tel: and mailto: link
- Test Google Maps direction link
- Call phone number from different number
- Send test email to booking address

### 3. Image Optimization
- [ ] **All 21 portfolio images optimized**
  - [ ] Each <200KB target
  - [ ] Compressed with TinyJPG or similar
  - [ ] Load tested on 3G connection
  
- [ ] **WebP versions created** (optional but recommended)
  - [ ] All 21 images have .webp versions
  - [ ] Fallback to .jpg working
  - [ ] Browser support tested
  
- [ ] **Artist portraits optimized**
  - [ ] amelia.jpg, ben.jpg, monique.jpg <150KB each
  - [ ] High quality maintained
  - [ ] Properly cropped and aligned

**How to verify:**
```bash
# Check image sizes
cd images/portfolio
du -h *.jpg | sort -h

# Should all be under 200KB
# If any larger, re-optimize
```

### 4. Form Functionality
- [ ] **Booking form tested**
  - [ ] All required fields validation working
  - [ ] Artist selection working
  - [ ] Email format validation working
  - [ ] Phone format validation working
  - [ ] Success modal displays
  - [ ] Form resets after submission
  
- [ ] **Mailto: backend working**
  - [ ] Email opens in default client
  - [ ] All form data included in email body
  - [ ] Subject line formatted correctly
  - [ ] Timestamp included
  
- [ ] **Form tested on multiple devices**
  - [ ] Desktop (Windows/Mac)
  - [ ] Mobile (iOS/Android)
  - [ ] Tablet (iPad/Android)
  - [ ] Different email clients

**Test procedure:**
1. Fill out form completely
2. Submit and verify email opens
3. Check all data is in email body
4. Test on at least 3 different devices

---

## High Priority (Should Complete)

### 5. SEO Configuration
- [ ] **Meta tags verified on all pages**
  - [ ] Title tags unique and descriptive
  - [ ] Meta descriptions 150-160 characters
  - [ ] Open Graph tags complete
  - [ ] Twitter Card tags complete
  - [ ] Canonical URLs correct
  
- [ ] **Sitemap.xml updated**
  - [ ] All pages included
  - [ ] Last modified dates current
  - [ ] Priority values appropriate
  - [ ] No broken URLs
  
- [ ] **Robots.txt configured**
  - [ ] Allows all search engines
  - [ ] Sitemap location correct
  - [ ] No unnecessary restrictions
  
- [ ] **Structured data implemented**
  - [ ] Schema.org LocalBusiness markup
  - [ ] Contact information complete
  - [ ] Business hours accurate
  - [ ] Aggregate rating (if applicable)

**How to verify:**
- Test in [Google Rich Results Test](https://search.google.com/test/rich-results)
- Validate sitemap at [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- Check robots.txt at: `https://yourdomain.com/robots.txt`

### 6. Performance Optimization
- [ ] **CSS minified** (optional but recommended)
  - [ ] Inline styles optimized
  - [ ] Comments removed (keep documentation separate)
  - [ ] 30-40% size reduction achieved
  
- [ ] **JavaScript minified** (optional but recommended)
  - [ ] Code compressed
  - [ ] Comments preserved for setup instructions
  - [ ] No console.log() statements left
  
- [ ] **Resource hints added**
  - [ ] Preconnect for Google Fonts
  - [ ] DNS prefetch for Google Analytics
  - [ ] Preload for critical images
  
- [ ] **Lazy loading implemented**
  - [ ] IntersectionObserver active
  - [ ] Gallery images lazy load
  - [ ] Below-fold content deferred

**Performance targets:**
- Lighthouse Performance: 90+
- First Contentful Paint: <2s
- Largest Contentful Paint: <2.5s
- Total page weight: <2MB

**How to verify:**
- Run Lighthouse audit in Chrome DevTools
- Test on [PageSpeed Insights](https://pagespeed.web.dev/)
- Test on 3G throttled connection

### 7. Cross-Browser Testing
- [ ] **Desktop browsers tested**
  - [ ] Chrome (latest version)
  - [ ] Firefox (latest version)
  - [ ] Safari (latest version)
  - [ ] Edge (latest version)
  
- [ ] **Mobile browsers tested**
  - [ ] iOS Safari (iPhone)
  - [ ] Chrome Mobile (Android)
  - [ ] Samsung Internet (Android)
  
- [ ] **Specific features tested**
  - [ ] Mobile navigation (hamburger menu)
  - [ ] Gallery modal
  - [ ] Form submission
  - [ ] Smooth scrolling
  - [ ] Artist tab switching
  - [ ] Portfolio filtering

**Test checklist per browser:**
1. Homepage loads correctly
2. All images display
3. Navigation works
4. Gallery opens/closes
5. Booking form submits
6. Mobile menu functions
7. No console errors

### 8. Accessibility (WCAG 2.1 AA)
- [ ] **Keyboard navigation working**
  - [ ] Tab through all interactive elements
  - [ ] Enter key activates buttons/links
  - [ ] ESC closes modals
  - [ ] Skip link functional (press Tab on load)
  
- [ ] **Screen reader tested**
  - [ ] ARIA labels present where needed
  - [ ] Alt text for all images (role="img")
  - [ ] Proper heading hierarchy (H1→H2→H3)
  - [ ] Form labels associated correctly
  
- [ ] **Color contrast verified**
  - [ ] All text meets 4.5:1 minimum
  - [ ] Large text meets 3:1 minimum
  - [ ] Links distinguishable from text
  
- [ ] **Focus indicators visible**
  - [ ] All interactive elements have visible focus
  - [ ] Focus styles not removed
  - [ ] Clear visual feedback

**How to verify:**
- Use [WAVE accessibility tool](https://wave.webaim.org/)
- Test with screen reader (NVDA/JAWS/VoiceOver)
- Run [axe DevTools](https://www.deque.com/axe/devtools/)
- Check contrast with [Color Contrast Analyzer](https://webaim.org/resources/contrastchecker/)

---

## Medium Priority (Recommended)

### 9. Analytics Setup
- [ ] **Google Analytics 4 configured**
  - [ ] GA4 property created
  - [ ] Measurement ID added to all HTML files
  - [ ] Tracking code verified working
  - [ ] Real-time reports showing data
  
- [ ] **Event tracking implemented**
  - [ ] Book Now CTA clicks tracked
  - [ ] Artist portfolio views tracked
  - [ ] Gallery interactions tracked
  - [ ] Form submissions tracked (conversion)
  - [ ] Phone/email clicks tracked
  
- [ ] **Core Web Vitals monitoring**
  - [ ] LCP tracking enabled
  - [ ] FID tracking enabled
  - [ ] CLS tracking enabled
  
- [ ] **Conversion goals set**
  - [ ] Booking request submission as key conversion
  - [ ] Phone clicks as micro-conversion
  - [ ] Artist portfolio views as engagement

**How to verify:**
- Visit site with GA debugger extension
- Check Real-Time reports in GA4
- Submit test booking and verify event fires
- Wait 24 hours and check dashboard

### 10. Content Accuracy
- [ ] **All text proofread**
  - [ ] No typos or grammatical errors
  - [ ] Artist names spelled correctly
  - [ ] Specialty descriptions accurate
  - [ ] Pricing information current
  
- [ ] **Links tested**
  - [ ] All internal links work
  - [ ] All external links open in new tab
  - [ ] Social media links correct
  - [ ] Instagram usernames accurate
  - [ ] No 404 errors
  
- [ ] **Contact information consistent**
  - [ ] Same info on all pages
  - [ ] Schema.org matches footer
  - [ ] Social links match actual accounts

**Link testing checklist:**
- Homepage: 15+ links
- Artists page: 25+ links
- Booking page: 10+ links
- All navigation links
- All CTA buttons

### 11. Security & Privacy
- [ ] **HTTPS enabled**
  - [ ] SSL certificate installed
  - [ ] All resources load over HTTPS
  - [ ] No mixed content warnings
  
- [ ] **Privacy considerations**
  - [ ] Google Analytics anonymizes IP
  - [ ] No unnecessary cookies
  - [ ] Form data sent securely (mailto: or HTTPS)
  
- [ ] **Security headers** (if applicable)
  - [ ] X-Frame-Options set
  - [ ] X-Content-Type-Options set
  - [ ] Content-Security-Policy configured

**How to verify:**
- Check for padlock icon in browser
- Test at [SSL Labs](https://www.ssllabs.com/ssltest/)
- Run security scan at [Mozilla Observatory](https://observatory.mozilla.org/)

---

## Nice to Have (Optional)

### 12. Social Media Integration
- [ ] **Open Graph tags tested**
  - [ ] Share on Facebook and preview looks good
  - [ ] Image displays correctly (og-image.jpg)
  - [ ] Title and description appropriate
  
- [ ] **Twitter Card tags tested**
  - [ ] Share on Twitter and preview looks good
  - [ ] Large image card displays
  
- [ ] **Social media accounts linked**
  - [ ] Instagram accounts verified
  - [ ] Facebook page linked
  - [ ] TikTok account linked (Monique)
  - [ ] All links open in new tab

**How to verify:**
- Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- Share URL on each platform and verify appearance

### 13. Additional Testing
- [ ] **Speed tested from different locations**
  - [ ] Test from Australia
  - [ ] Test from different ISPs
  - [ ] Test on different connection speeds
  
- [ ] **Print styles** (if needed)
  - [ ] Pages print properly
  - [ ] No broken layouts when printed
  
- [ ] **Email client testing**
  - [ ] Test mailto: on Gmail
  - [ ] Test mailto: on Outlook
  - [ ] Test mailto: on Apple Mail
  - [ ] Test mailto: on mobile mail apps

### 14. Backup & Documentation
- [ ] **Backup created**
  - [ ] Full project folder backed up
  - [ ] Backup stored securely
  - [ ] Backup date documented
  
- [ ] **Documentation complete**
  - [ ] MAINTENANCE-GUIDE.md available
  - [ ] IMAGE-OPTIMIZATION-GUIDE.md available
  - [ ] PERFORMANCE-OPTIMIZATION-GUIDE.md available
  - [ ] README.md updated
  
- [ ] **Version control** (if using)
  - [ ] Git repository initialized
  - [ ] All files committed
  - [ ] Pushed to remote (GitHub/GitLab)

---

## Deployment Checklist

### Pre-Deployment
- [ ] All critical items completed
- [ ] All high priority items completed
- [ ] Local testing complete
- [ ] Backup created
- [ ] Deployment plan documented

### Deployment
- [ ] Files uploaded to hosting
- [ ] DNS configured correctly
- [ ] SSL certificate active
- [ ] Test immediately after deployment
- [ ] Monitor for errors

### Post-Deployment (First 24 Hours)
- [ ] Visit all pages on production URL
- [ ] Test booking form on live site
- [ ] Check Google Analytics receiving data
- [ ] Monitor for JavaScript errors
- [ ] Check all images loading
- [ ] Test on mobile device
- [ ] Verify sitemap accessible
- [ ] Submit sitemap to Google Search Console

### Post-Deployment (First Week)
- [ ] Monitor analytics daily
- [ ] Check for booking submissions
- [ ] Review Search Console for issues
- [ ] Gather initial performance data
- [ ] Fix any reported issues
- [ ] Collect user feedback

---

## Testing Matrix

### Device Testing
| Device | Browser | Resolution | Status |
|--------|---------|------------|--------|
| Desktop Windows | Chrome | 1920x1080 | [ ] |
| Desktop Windows | Firefox | 1920x1080 | [ ] |
| Desktop Windows | Edge | 1920x1080 | [ ] |
| Desktop Mac | Chrome | 1920x1080 | [ ] |
| Desktop Mac | Safari | 1920x1080 | [ ] |
| iPhone 13 | Safari | 390x844 | [ ] |
| iPhone 13 | Chrome | 390x844 | [ ] |
| Samsung Galaxy S21 | Chrome | 360x800 | [ ] |
| iPad Pro | Safari | 1024x1366 | [ ] |
| Android Tablet | Chrome | 800x1280 | [ ] |

### Page Testing
| Page | Load | Navigation | Forms | Images | Mobile | Status |
|------|------|------------|-------|--------|--------|--------|
| index.html | [ ] | [ ] | N/A | [ ] | [ ] | [ ] |
| artists.html | [ ] | [ ] | N/A | [ ] | [ ] | [ ] |
| book.html | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| 404.html | [ ] | [ ] | N/A | N/A | [ ] | [ ] |

---

## Verification Scripts

### Check File Sizes
```bash
# Run in project root directory
echo "=== HTML Files ==="
du -h *.html

echo "=== Image Files ==="
du -h images/portfolio/*.jpg | sort -h

echo "=== Icon Files ==="
du -h *.png *.ico og-image.jpg

echo "=== Total Project Size ==="
du -sh .
```

### Check for Common Issues
```bash
# Check for TODO comments
grep -r "TODO" *.html

# Check for placeholder text
grep -r "GA_MEASUREMENT_ID" *.html

# Check for broken image references
grep -r "images/" *.html | grep -v "\/images\/portfolio\/"

# Check for console.log statements
grep -r "console.log" *.html
```

### Validate HTML
```bash
# Use online validator or local tool
# https://validator.w3.org/

# Or use command line validator
html5validator --root . --also-check-css
```

---

## Launch Day Checklist

### Morning of Launch
- [ ] Final backup created
- [ ] All team members notified
- [ ] Social media posts scheduled (optional)
- [ ] Email notifications prepared (optional)

### During Deployment
- [ ] Monitor deployment process
- [ ] Keep backup readily accessible
- [ ] Test each page immediately after going live
- [ ] Document any issues

### Post-Launch (First Hour)
- [ ] Visit all pages on live URL
- [ ] Test booking form
- [ ] Check analytics tracking
- [ ] Verify SSL certificate
- [ ] Test on mobile device
- [ ] Share with team for testing

### Post-Launch (First Day)
- [ ] Monitor analytics dashboard
- [ ] Check for booking submissions
- [ ] Respond to any inquiries
- [ ] Fix any critical issues
- [ ] Document lessons learned

---

## Issue Tracking

### Critical Issues (Fix Immediately)
- Site completely down
- Booking form not working
- Images not loading
- SSL certificate error
- Mobile site broken

### High Priority Issues (Fix Within 24 Hours)
- Navigation not working
- Links broken
- Analytics not tracking
- Form validation errors
- SEO issues

### Medium Priority Issues (Fix Within Week)
- Minor styling issues
- Non-critical links broken
- Performance optimization needed
- Accessibility improvements
- Content typos

### Low Priority Issues (Fix When Possible)
- Enhancement requests
- Optional features
- Design tweaks
- Non-essential optimizations

---

## Sign-Off Sheet

### Development Team
- [ ] Developer sign-off
- [ ] QA testing complete
- [ ] Documentation complete

### Business Team
- [ ] Content approved
- [ ] Contact information verified
- [ ] Pricing approved
- [ ] Images approved

### Final Approval
- [ ] All critical items completed
- [ ] All high priority items completed
- [ ] Testing complete
- [ ] Ready for launch

**Approved by:** ___________________  
**Date:** ___________________  
**Launch Date:** ___________________

---

## Post-Launch Monitoring

### Week 1
- [ ] Daily analytics review
- [ ] Monitor for errors
- [ ] Track booking submissions
- [ ] Gather user feedback
- [ ] Address any issues

### Week 2-4
- [ ] Weekly analytics review
- [ ] SEO performance check
- [ ] User behavior analysis
- [ ] Conversion rate tracking
- [ ] Make minor optimizations

### Month 2-3
- [ ] Monthly analytics review
- [ ] Comprehensive SEO audit
- [ ] Performance optimization
- [ ] Content updates based on data
- [ ] Plan next features

---

**Document Version:** 1.0  
**Last Updated:** October 16, 2025  
**Next Review:** At launch completion  

---

*Complete all critical and high priority items before launching. Medium and low priority items can be completed post-launch.*


