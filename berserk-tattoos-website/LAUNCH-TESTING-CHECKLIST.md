# Launch Testing Checklist - Berserk Tattoos Website

## Pre-Launch Testing Status

### 🔴 CRITICAL - Must Complete Before Launch

#### 1. Missing Assets

- [ ] **og-image.jpg** - Create 1200x630px social sharing image
  - Use og-image-placeholder.html as visual guide
  - Dark background with BERSERK TATTOOS branding
  - Save in root directory, compress to <300KB
- [ ] **favicon.ico** - Create multi-size icon file
  - Use favicon.io generator with "B" letter design
  - Colors: #7B1113 on #111111 background
- [ ] **apple-touch-icon.png** - 180x180px for iOS
- [ ] **android-chrome-192x192.png** - For Android devices
- [ ] **android-chrome-512x512.png** - For high-res Android

#### 2. Form Backend

- [ ] **Create Formspree Account**
  - Sign up at formspree.io
  - Create new form for "Berserk Tattoos Bookings"
  - Copy form ID (looks like: xyzabcde)
- [ ] **Update book.html**
  - Replace `YOUR_FORM_ID` on line 633
  - Configure email forwarding to berserk.tattoos.au@gmail.com
  - Set up auto-reply message
- [ ] **Test Form Submission**
  - Fill out complete form
  - Submit and verify email received
  - Check all form data included
  - Test on mobile device

#### 3. Analytics Setup

- [ ] **Create Google Analytics 4 Property**
  - Go to analytics.google.com
  - Create new property: "Berserk Tattoos"
  - Get Measurement ID (format: G-XXXXXXXXXX)
- [ ] **Update All HTML Files**
  - index.html - Replace GA_MEASUREMENT_ID
  - artists.html - Replace GA_MEASUREMENT_ID
  - book.html - Replace GA_MEASUREMENT_ID
  - thank-you.html - Replace GA_MEASUREMENT_ID
  - payment-success.html - Replace GA_MEASUREMENT_ID
- [ ] **Verify Tracking**
  - Install Google Analytics Debugger extension
  - Visit site and check Real-Time reports
  - Test event tracking (Book Now clicks)

### 🟡 HIGH PRIORITY - Should Complete

#### 4. Cross-Browser Testing

- [ ] **Desktop Browsers**
  - [ ] Chrome (Windows/Mac)
  - [ ] Firefox (Windows/Mac)
  - [ ] Safari (Mac)
  - [ ] Edge (Windows)
- [ ] **Mobile Browsers**
  - [ ] Safari (iPhone)
  - [ ] Chrome (Android)
  - [ ] Samsung Internet

#### 5. Mobile Testing

- [ ] Navigation hamburger menu works
- [ ] Touch targets are 44px minimum
- [ ] Forms don't zoom on focus
- [ ] Gallery images load properly
- [ ] Phone/email links work
- [ ] Artist tabs function correctly

#### 6. Performance Testing

- [ ] Run Lighthouse audit (target 90+ score)
- [ ] Test on 3G throttled connection
- [ ] Verify all images load (<200KB each)
- [ ] Check lazy loading works
- [ ] No console errors

### 🟢 MEDIUM PRIORITY - Recommended

#### 7. SEO Verification

- [ ] Validate structured data at Google Rich Results Test
- [ ] Check meta tags on all pages
- [ ] Verify sitemap.xml accessible
- [ ] Test robots.txt allows crawling
- [ ] Check all internal links work

#### 8. Content Accuracy

- [ ] Phone number correct: 0478 128 212
- [ ] Email correct: berserk.tattoos.au@gmail.com
- [ ] Address: 33 Southern Road, Heidelberg Heights, VIC 3081
- [ ] Hours: Mon-Sun 12-7PM, Tue 12-5PM
- [ ] All social media links work

#### 9. Accessibility Testing

- [ ] Tab navigation works throughout site
- [ ] Skip link functional
- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA
- [ ] Forms have proper labels

### 📋 Test Results Log

| Test          | Browser/Device  | Status | Issues Found | Fixed |
| ------------- | --------------- | ------ | ------------ | ----- |
| Homepage Load | Chrome Desktop  | ⏳     | -            | -     |
| Mobile Menu   | iPhone Safari   | ⏳     | -            | -     |
| Booking Form  | Android Chrome  | ⏳     | -            | -     |
| Gallery Load  | Firefox Desktop | ⏳     | -            | -     |
| Analytics     | All             | ⏳     | -            | -     |

### 🚀 Deployment Steps

1. **Complete all CRITICAL items above**
2. **Create final backup of all files**
3. **Sign up for Netlify.com (free tier)**
4. **Drag and drop project folder to Netlify**
5. **Configure custom domain (if owned)**
6. **Test live site immediately**
7. **Submit sitemap to Google Search Console**

### 📊 Launch Day Metrics

Track these on launch day:

- [ ] Site loads successfully
- [ ] First visitor tracked in Analytics
- [ ] First booking form submission received
- [ ] Mobile traffic percentage
- [ ] Average page load time
- [ ] Zero critical errors

### 🔧 Quick Fixes Reference

**If images not loading:**

- Check file paths (case-sensitive)
- Verify images in correct folders
- Clear browser cache

**If form not working:**

- Verify Formspree ID is correct
- Check spam folder
- Test with different email client

**If mobile menu broken:**

- Check JavaScript console for errors
- Verify CSS loaded properly
- Test in different mobile browser

### 📞 Support Contacts

- **Formspree Support:** help.formspree.io
- **Netlify Support:** docs.netlify.com
- **Google Analytics:** analytics.google.com/analytics/academy

---

**Last Updated:** October 16, 2025
**Status:** Ready for final testing and deployment
**Time to Launch:** ~2-3 hours of focused work
