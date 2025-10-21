# 🚀 Berserk Tattoos Website - Launch Checklist

## ✅ Complete Pre-Launch Checklist

Use this checklist to ensure everything is ready for a successful website launch.

---

## 📋 TABLE OF CONTENTS

1. [Configuration & Setup](#configuration--setup)
2. [Content Review](#content-review)
3. [Technical Testing](#technical-testing)
4. [SEO & Analytics](#seo--analytics)
5. [Legal & Compliance](#legal--compliance)
6. [Payment & Booking System](#payment--booking-system)
7. [Performance & Optimization](#performance--optimization)
8. [Security](#security)
9. [Final Checks](#final-checks)
10. [Post-Launch](#post-launch)

---

## 🔧 CONFIGURATION & SETUP

### Environment Variables (Netlify):
- [ ] `STRIPE_SECRET_KEY` set (starts with `sk_live_` for production)
- [ ] `STRIPE_PUBLISHABLE_KEY` set (starts with `pk_live_`)
- [ ] `STRIPE_WEBHOOK_SECRET` set (from Stripe webhook dashboard)
- [ ] `URL` set to production domain (`https://berserktattoos.com`)
- [ ] Optional: `SENDGRID_API_KEY` or `MAILGUN_API_KEY` for emails

**Docs:** `SETUP-NETLIFY-ENV-VARS.md`

### Google Analytics:
- [ ] Created GA4 property
- [ ] Replaced `GA_MEASUREMENT_ID` in all 7 HTML files with actual ID (format: `G-XXXXXXXXXX`)
- [ ] Tested with GA Realtime report
- [ ] Conversion events set up (`booking_request_confirmed`, `deposit_paid`)

**Files to update:**
- `index.html` (lines 1432, 1439)
- `artists.html` (lines 1267, 1274, 1355, 1360)
- `book.html` (lines 436, 441)
- `book-new.html` (lines 707, 712)
- `aftercare.html` (lines 734, 741)
- `thank-you.html` (lines 444, 451)
- `payment-success.html` (lines 519, 526)

**Docs:** `SETUP-GOOGLE-ANALYTICS.md`

### Instagram Feed:
- [ ] Created SnapWidget account
- [ ] Created widget (3x3 grid, 9 posts, dark theme)
- [ ] Replaced placeholder in `index.html` with SnapWidget embed code (line ~1890)
- [ ] Tested feed loads correctly

**Docs:** `SETUP-INSTAGRAM-SNAPWIDGET.md`

### Domain & DNS:
- [ ] Custom domain connected to Netlify
- [ ] HTTPS/SSL certificate active (Netlify provides free)
- [ ] `www` redirects to non-www (or vice versa)
- [ ] DNS records propagated (check: https://dnschecker.org/)

---

## 📝 CONTENT REVIEW

### Contact Information:
- [ ] Address correct: **33 Southern Road, Heidelberg Heights, VIC 3081**
- [ ] Phone number correct: **0478 128 212**
- [ ] Email correct: **berserk.tattoos.au@gmail.com**
- [ ] Social links work:
  - [ ] Instagram: https://www.instagram.com/berserk_tattoos/
  - [ ] Facebook: https://www.facebook.com/BerserkTattoo/

### Artist Information:
- [ ] Amelia Kelso bio accurate
- [ ] Ben White Raven bio accurate
- [ ] Monique Moore bio accurate
- [ ] All artist portfolio images load (84 JPG + 84 WebP = 168 total) ✅
- [ ] Artist specialties correct

### Pricing:
- [ ] Hourly rates correct: Amelia $150/hr, Ben $160/hr, Monique $155/hr
- [ ] Deposit amount correct: **$100** (fully credited)
- [ ] Walk-in minimum correct: **$120**
- [ ] Package deals pricing accurate
- [ ] Consultation options: FREE phone, $100 in-person

### Legal Pages:
- [ ] Privacy Policy complete and accurate
- [ ] Terms of Service complete
- [ ] Cookie Policy complete
- [ ] All three accessible from footer

---

## 🧪 TECHNICAL TESTING

### Browser Testing:
- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & iOS)
- [ ] Edge (desktop)
- [ ] No console errors in any browser

### Mobile Responsiveness:
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] Samsung Galaxy (360px)
- [ ] iPad (768px)
- [ ] All sections stack correctly on mobile
- [ ] No horizontal scroll
- [ ] Touch targets minimum 44px

### Booking Flow:
- [ ] Step 1: Consultation type + artist selection works
- [ ] Step 2: Personal details form validates
- [ ] Step 3: Date/time picker works
- [ ] Step 4: Design brief form works
- [ ] Step 5: Summary displays correctly
- [ ] FREE phone consultation bypasses payment
- [ ] $100 in-person consultation redirects to Stripe
- [ ] Test Stripe payment with `4242 4242 4242 4242`
- [ ] Success page shows correct information
- [ ] Data persists in localStorage

**Docs:** `BOOKING-FLOW-TEST-CHECKLIST.md`

### Forms & Validation:
- [ ] All required fields marked with asterisks
- [ ] Email validation works
- [ ] Phone validation accepts various formats
- [ ] Error messages display correctly
- [ ] Success states work

### Images:
- [ ] All images load without 404 errors
- [ ] Lazy loading works
- [ ] WebP fallback to JPG for old browsers
- [ ] Responsive images serve correct sizes
- [ ] No broken image placeholders

### Links:
- [ ] All internal links work
- [ ] All external links open in new tab (`target="_blank"`)
- [ ] Social media links correct
- [ ] No broken links (run link checker)
- [ ] All CTAs (Call-to-Actions) work

---

## 🔍 SEO & ANALYTICS

### Meta Tags:
- [ ] All pages have unique `<title>` tags
- [ ] All pages have meta descriptions (150-160 chars)
- [ ] Open Graph images set (`og-image.jpg`)
- [ ] Twitter Card meta tags present
- [ ] Canonical URLs set

### Generated OG Image:
- [ ] Run `npm run generate-og-image` or open `generate-og-image.html`
- [ ] Download `og-image.jpg` 
- [ ] Place in root directory
- [ ] Test with https://www.opengraph.xyz/

### Structured Data:
- [ ] JSON-LD schema present in `index.html`
- [ ] Business schema includes correct info
- [ ] Test with https://search.google.com/test/rich-results

### Sitemap & Robots:
- [ ] `sitemap.xml` up to date
- [ ] `robots.txt` allows search engines
- [ ] Submit sitemap to Google Search Console

### Google Search Console:
- [ ] Property verified
- [ ] Sitemap submitted
- [ ] No indexing errors

---

## ⚖️ LEGAL & COMPLIANCE

### Privacy & Compliance:
- [ ] Privacy policy includes GA4 disclosure
- [ ] Privacy policy includes Stripe disclosure
- [ ] Cookie policy accurate
- [ ] Terms of service complete
- [ ] Age verification (18+) mentioned

### Cookie Consent (if required):
- [ ] Cookie banner implemented (if targeting EU)
- [ ] User can opt-out of analytics

### Accessibility:
- [ ] Alt text on all images
- [ ] Form labels present
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG 2.1 AA standards
- [ ] ARIA labels on interactive elements

---

## 💳 PAYMENT & BOOKING SYSTEM

### Stripe Configuration:
- [ ] Switched from test to live mode
- [ ] Live keys set in Netlify
- [ ] Webhook endpoint created for production URL
- [ ] Webhook events selected:
  - [ ] `checkout.session.completed`
  - [ ] `payment_intent.succeeded`
  - [ ] `payment_intent.payment_failed`
- [ ] Test live transaction with real card (then refund)
- [ ] Verify webhook receives live events

**Docs:** `STRIPE-SETUP-GUIDE.md`

### Booking Functions:
- [ ] `create-booking` function deployed
- [ ] `stripe-webhook` function deployed
- [ ] `get-availability` function deployed (if implemented)
- [ ] Function logs show no errors
- [ ] Test end-to-end booking flow

### Email Notifications (Optional):
- [ ] Email service configured (SendGrid/Mailgun)
- [ ] Sender email verified
- [ ] Test emails send successfully
- [ ] Email template branded correctly
- [ ] Both customer AND studio receive notifications

**Docs:** `SETUP-EMAIL-OPTIONAL.md`

---

## ⚡ PERFORMANCE & OPTIMIZATION

### Page Speed:
- [ ] Run Google PageSpeed Insights (aim for 90+ score)
- [ ] Run GTmetrix
- [ ] Lighthouse performance audit in Chrome DevTools
- [ ] Core Web Vitals pass:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1

### Optimization:
- [ ] Images optimized (WebP format where supported)
- [ ] CSS minified for production
- [ ] JavaScript minified
- [ ] No render-blocking resources
- [ ] Service worker registered for offline support

### Caching:
- [ ] Browser caching configured (Netlify headers)
- [ ] CDN enabled (Netlify CDN)
- [ ] Static assets have long cache times

---

## 🔒 SECURITY

### HTTPS:
- [ ] SSL certificate active
- [ ] All resources loaded over HTTPS (no mixed content)
- [ ] HTTP redirects to HTTPS

### Headers:
- [ ] Content Security Policy set (check `netlify.toml`)
- [ ] X-Frame-Options set
- [ ] X-Content-Type-Options set

### API Keys:
- [ ] No API keys in client-side JavaScript
- [ ] All secret keys in environment variables only
- [ ] `.env` file in `.gitignore`
- [ ] No sensitive data in git history

### Forms:
- [ ] Input sanitization prevents XSS
- [ ] CSRF protection (if applicable)
- [ ] No SQL injection vulnerabilities (using Stripe, not custom DB)

---

## 🎯 FINAL CHECKS

### Console Logs (Production):
- [ ] Review all JS files for `console.log`
- [ ] Remove or comment out development-only logs
- [ ] Keep essential error logging

**Files with console statements (142 total):**
- `/js/*.js` - Review frontend scripts
- `/netlify/functions/*.js` - Keep for function debugging
- Root scripts - Non-production files, OK to keep

### Code Quality:
- [ ] No linter errors
- [ ] No TypeScript errors (if using TS)
- [ ] Code formatted consistently
- [ ] Comments removed or minimal

### Backup:
- [ ] Git repository backed up
- [ ] Database backup (if applicable - N/A for this site)
- [ ] Environment variables documented in password manager

### Browser Compatibility:
- [ ] Polyfills loaded for older browsers
- [ ] Graceful degradation for IE11 (basic functionality)
- [ ] CSS fallbacks for unsupported properties

### Error Handling:
- [ ] Custom 404 page exists (`404.html`)
- [ ] Network errors handled gracefully
- [ ] User-friendly error messages
- [ ] Fallback content if JavaScript disabled

---

## 🚀 DEPLOYMENT

### Pre-Deploy:
- [ ] All changes committed to git
- [ ] Git repository pushed to remote
- [ ] Branch protected (if using GitHub/GitLab)
- [ ] Reviewed all merge requests/PRs

### Netlify Deploy:
- [ ] Site deployed successfully
- [ ] No build errors
- [ ] Functions deployed
- [ ] Preview deploy tested first
- [ ] Production deploy triggered

### DNS Verification:
- [ ] Site accessible at primary domain
- [ ] Site accessible at www subdomain (if configured)
- [ ] No DNS propagation delays
- [ ] SSL certificate valid

---

## 🧪 POST-LAUNCH

### Immediate (First 24 Hours):

#### Smoke Tests:
- [ ] Homepage loads
- [ ] All pages accessible
- [ ] Booking form works
- [ ] Payment processes successfully
- [ ] Emails send (if configured)

#### Monitoring:
- [ ] Check Netlify Deploy logs
- [ ] Check Netlify Function logs
- [ ] Check Stripe Dashboard for test transactions
- [ ] Check Google Analytics for traffic
- [ ] Check Search Console for crawl errors

#### User Testing:
- [ ] Ask friend/colleague to book consultation
- [ ] Monitor their experience
- [ ] Fix any issues immediately

### Week 1:

- [ ] Monitor Google Analytics daily
- [ ] Check Stripe Dashboard for bookings
- [ ] Respond to customer inquiries quickly
- [ ] Fix any bugs reported
- [ ] Monitor performance metrics

### Ongoing:

- [ ] Weekly Analytics review
- [ ] Monthly performance audit
- [ ] Update portfolio images regularly
- [ ] Refresh testimonials
- [ ] Update Instagram feed (automatic with SnapWidget)
- [ ] Renew SSL certificate (Netlify auto-renews)
- [ ] Check for broken links monthly

---

## 📞 EMERGENCY CONTACTS

### Service Support:

- **Netlify:** https://www.netlify.com/support/
- **Stripe:** https://support.stripe.com/
- **SendGrid:** https://support.sendgrid.com/
- **Domain Registrar:** [Your registrar support]

### Rollback Plan:

If critical issues arise:
1. Netlify Dashboard → Deploys → Click previous working deploy
2. Click "Publish deploy"
3. Site reverts to previous version
4. Fix issues offline, then redeploy

---

## ✅ FINAL SIGN-OFF

**Checklist completed by:** _________________  
**Date:** _________________  
**Deployment Date:** _________________  
**Production URL:** https://berserktattoos.com

**All items checked:** [ ] YES / [ ] NO  
**Ready for launch:** [ ] YES / [ ] NO

**Notes:**
________________________________________________________________
________________________________________________________________
________________________________________________________________

---

## 🎉 CONGRATULATIONS!

**Your Berserk Tattoos website is now LIVE!**

### What You've Built:

✅ Professional tattoo studio website  
✅ 5-step booking wizard with Stripe integration  
✅ FREE phone + $100 in-person consultation options  
✅ Interactive pricing calculator  
✅ 168 optimized portfolio images (JPG + WebP)  
✅ Safety & hygiene information  
✅ First-timer welcome section  
✅ Walk-in hours information  
✅ Instagram feed integration (SnapWidget ready)  
✅ 3 authentic testimonials  
✅ Mobile-responsive design  
✅ Google Analytics tracking  
✅ Legal compliance (privacy, terms, cookies)  
✅ Performance optimized (service worker, lazy loading)  

---

**Last Updated:** October 2025  
**Version:** 1.0.0  
**Project:** Berserk Tattoos Website Launch

