# ✅ Post-Deployment Verification Checklist

## Quick Reference
Use this checklist immediately after deploying to verify everything works.

---

## 🌐 Website Accessibility

- [ ] Site loads at: `https://www.berserk-tattoos.com`
- [ ] Non-www redirects to www: `https://berserk-tattoos.com` → `https://www.berserk-tattoos.com`
- [ ] HTTP redirects to HTTPS
- [ ] SSL certificate active (🔒 padlock visible)
- [ ] No SSL warnings or errors

---

## 📄 All Pages Load

- [ ] **Home page** (/)
- [ ] **Artists page** (/artists.html)
- [ ] **Portfolio page** (/portfolio/)
- [ ] **Pricing page** (/pricing.html)
- [ ] **Booking page** (/book.html)
- [ ] **Aftercare page** (/aftercare.html)
- [ ] **Privacy Policy** (/privacy-policy.html)
- [ ] **Terms of Service** (/terms-of-service.html)
- [ ] **Cookie Policy** (/cookie-policy.html)
- [ ] **404 Error page** (test with /nonexistent-page)

---

## 🖼️ Images & Assets

- [ ] All images load (no broken images)
- [ ] Favicon displays correctly
- [ ] Open Graph image (og-image.jpg) loads
- [ ] Portfolio images display
- [ ] Artist profile images load
- [ ] Images are optimized (check load times)

---

## 📝 Forms

### Contact Form
- [ ] Form displays correctly
- [ ] All fields present
- [ ] Form validation works
- [ ] Submit test message
- [ ] Confirmation message shows
- [ ] Check Formspree dashboard for submission

### Booking Form
- [ ] Form displays correctly
- [ ] Artist selection works
- [ ] Date picker works
- [ ] Service type selection works
- [ ] All fields validate properly

---

## 💳 Stripe Payment (Test Mode)

- [ ] Payment button appears on booking page
- [ ] Click payment button
- [ ] Stripe checkout opens
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Expiry: 12/25, CVC: 123, ZIP: 12345
- [ ] Payment processes successfully
- [ ] Redirects to thank you page
- [ ] Check Stripe Dashboard → Payments (test payment appears)
- [ ] Check Netlify Functions logs (webhook triggered)

---

## 📊 Google Analytics

- [ ] Visit website
- [ ] Navigate to 3-4 different pages
- [ ] Wait 5-10 minutes
- [ ] Open Google Analytics Real-time report
- [ ] Verify your visit is tracked
- [ ] Check page views are recorded

---

## 📱 Mobile Testing

- [ ] Open site on mobile phone
- [ ] Navigation menu works
- [ ] All pages display correctly
- [ ] Images load and scale properly
- [ ] Forms work on mobile
- [ ] No horizontal scrolling
- [ ] Buttons are tappable

---

## 🖥️ Browser Testing

- [ ] Chrome: Site works correctly
- [ ] Firefox: Site works correctly
- [ ] Safari: Site works correctly
- [ ] Edge: Site works correctly
- [ ] No console errors in any browser

---

## ⚡ Performance Check

- [ ] Page loads in under 3 seconds
- [ ] No layout shifts while loading
- [ ] Images load progressively
- [ ] Run Lighthouse audit:
  - [ ] Performance score > 85
  - [ ] Accessibility score > 90
  - [ ] Best Practices score > 90
  - [ ] SEO score > 90

---

## 🔒 Security Headers

Test at: https://securityheaders.com

- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] Strict-Transport-Security present
- [ ] Content-Security-Policy configured
- [ ] Overall security grade: A or B

---

## 🔍 SEO Basics

- [ ] Page titles are unique
- [ ] Meta descriptions present
- [ ] Sitemap.xml accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Open Graph tags present (check page source)
- [ ] Alt text on images

---

## ⚙️ Environment Variables Verification

In Netlify Dashboard → Site settings → Environment variables:

- [ ] `STRIPE_PUBLISHABLE_KEY` is set
- [ ] `STRIPE_SECRET_KEY` is set
- [ ] `STRIPE_WEBHOOK_SECRET` is set
- [ ] `GOOGLE_ANALYTICS_ID` is set
- [ ] `FORMSPREE_FORM_ID` is set
- [ ] `URL` = `https://www.berserk-tattoos.com`
- [ ] `NODE_ENV` = `production`

---

## 🔔 Monitoring Setup

- [ ] Netlify deploy notifications enabled
- [ ] Email notifications for form submissions
- [ ] Stripe payment notifications enabled
- [ ] Google Analytics dashboard accessible
- [ ] All API keys documented safely

---

## 📋 Documentation

- [ ] All deployment steps documented
- [ ] DNS settings recorded
- [ ] Environment variables backed up (securely)
- [ ] Access credentials saved in password manager
- [ ] Team members have access (if applicable)

---

## 🎯 Final Checks

- [ ] No JavaScript errors in console
- [ ] No 404 errors in Network tab
- [ ] All links work (navigation, footer, etc.)
- [ ] Social media links work
- [ ] Email links work (mailto:)
- [ ] Phone number links work (tel:)
- [ ] Website looks professional
- [ ] All content is current and accurate

---

## ✅ Deployment Status

**Date Deployed:** _______________
**Deployed By:** _______________
**Netlify Site URL:** _______________
**Production URL:** https://www.berserk-tattoos.com
**All Checks Passed:** ⬜ Yes ✅

---

## 🐛 If Issues Found

### Site not loading:
1. Check Netlify deploy status
2. Check DNS settings in Hostinger
3. Wait for DNS propagation (30 min - 24 hours)
4. Clear browser cache

### SSL not working:
1. Wait 10-15 minutes
2. Netlify → Domain settings → HTTPS → Verify DNS
3. Click "Renew certificate"

### Forms not working:
1. Check environment variables
2. Check browser console for errors
3. Verify Formspree account is active

### Payments not working:
1. Check all Stripe variables are set
2. Verify webhook URL is correct
3. Check Netlify Functions logs
4. Ensure using correct Stripe mode (test/live)

---

**After completing all checks above, your website is ready for production!** 🎉

*Keep this checklist for future deployments and updates.*
