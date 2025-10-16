# BERSERK TATTOOS WEBSITE - IMPLEMENTATION CHECKLIST

**Complete this checklist to launch your website in 45 minutes.**

---

## 🎯 PRE-LAUNCH SETUP

### STEP 1: FILE PREPARATION (5 minutes)

- [ ] Create main project folder: `berserk-tattoos-website`
- [ ] Place all 3 HTML files in root folder:
  - [ ] index.html
  - [ ] artists.html  
  - [ ] book.html
- [ ] Create folder structure:
  ```
  berserk-tattoos-website/
  ├── images/
  │   ├── artists/
  │   └── portfolio/
  └── (HTML files here)
  ```

**Time Checkpoint**: 5 minutes elapsed

---

### STEP 2: IMAGE COLLECTION & OPTIMIZATION (20 minutes)

#### Artist Portraits (3 images)
- [ ] Go to [@amzkelso](https://www.instagram.com/amzkelso/)
  - [ ] Download profile photo or clear recent headshot
  - [ ] Resize to 500x500px square
  - [ ] Optimize at [TinyPNG.com](https://tinypng.com)
  - [ ] Save as: `images/artists/amelia.jpg`

- [ ] Go to [@ben_whiteraven](https://www.instagram.com/ben_whiteraven)
  - [ ] Download profile photo or clear recent headshot
  - [ ] Resize to 500x500px square
  - [ ] Optimize at TinyPNG
  - [ ] Save as: `images/artists/ben.jpg`

- [ ] Go to [@moniquemoore666](https://www.instagram.com/moniquemoore666/)
  - [ ] Download profile photo or clear recent headshot
  - [ ] Resize to 500x500px square
  - [ ] Optimize at TinyPNG
  - [ ] Save as: `images/artists/monique.jpg`

#### Portfolio Images (24 images - 8 per artist)
**Amelia Kelso Portfolio (Fine Line)**
- [ ] Download 8 best fine line tattoo photos from her Instagram
- [ ] Resize each to max 1200px width (maintain aspect ratio)
- [ ] Optimize all at TinyPNG (aim for <300KB each)
- [ ] Name as: `amelia-1.jpg` through `amelia-8.jpg`
- [ ] Save in: `images/portfolio/`

**Ben White Raven Portfolio (Realism)**
- [ ] Download 8 best realism tattoo photos from his Instagram
- [ ] Resize each to max 1200px width
- [ ] Optimize all at TinyPNG
- [ ] Name as: `ben-1.jpg` through `ben-8.jpg`
- [ ] Save in: `images/portfolio/`

**Monique Moore Portfolio (Blackwork)**
- [ ] Download 8 best blackwork tattoo photos from her Instagram
- [ ] Resize each to max 1200px width
- [ ] Optimize all at TinyPNG
- [ ] Name as: `monique-1.jpg` through `monique-8.jpg`
- [ ] Save in: `images/portfolio/`

**Time Checkpoint**: 25 minutes elapsed

---

### STEP 3: UPDATE HTML IMAGE REFERENCES (10 minutes)

#### In `index.html`:
Find the hero gallery section (around line 500) and update:
```html
<div class="hero-gallery-item"></div>
```
Replace with:
```html
<div class="hero-gallery-item">
    <img src="images/portfolio/amelia-1.jpg" alt="Fine line tattoo by Amelia Kelso" loading="lazy">
</div>
```
- [ ] Update all 4 hero gallery items with different portfolio images

Find the gallery section (around line 600) and update all 8 items:
- [ ] Replace `<div class="gallery-item"></div>` with actual images
- [ ] Use mix of all three artists' work
- [ ] Include descriptive alt text for each

#### In `artists.html`:
For each artist profile section, update portfolio grid items:
- [ ] **Amelia's section**: Add all 8 of her portfolio images
- [ ] **Ben's section**: Add all 8 of his portfolio images  
- [ ] **Monique's section**: Add all 8 of her portfolio images
- [ ] Update alt text for accessibility (e.g., "Fine line floral tattoo on forearm by Amelia Kelso")

Example replacement:
```html
<div class="portfolio-item" data-category="fineline">
    <img src="images/portfolio/amelia-1.jpg" alt="Fine line floral tattoo by Amelia" loading="lazy">
    <div class="portfolio-overlay">
        <div class="portfolio-info">
            <h4>Delicate Floral</h4>
            <p>Fine line · Forearm</p>
        </div>
    </div>
</div>
```

**Time Checkpoint**: 35 minutes elapsed

---

### STEP 4: CONFIGURE FORM BACKEND (5 minutes)

- [ ] Go to [Formspree.io](https://formspree.io)
- [ ] Create free account (no credit card required)
- [ ] Click "New Form"
- [ ] Name it: "Berserk Tattoos Booking"
- [ ] Copy your Form ID (looks like: `xrbzqxxx`)
- [ ] Open `book.html`
- [ ] Find line 341: `action="https://formspree.io/f/YOUR_FORM_ID"`
- [ ] Replace `YOUR_FORM_ID` with your actual ID
- [ ] **Configure Formspree Dashboard**:
  - [ ] Set notification email to: berserk.tattoos.au@gmail.com
  - [ ] Enable email notifications
  - [ ] Set up auto-response (optional)

**Test the form:**
- [ ] Open `book.html` in browser
- [ ] Fill out and submit test booking
- [ ] Check email for notification

**Time Checkpoint**: 40 minutes elapsed

---

### STEP 5: ADD GOOGLE ANALYTICS (5 minutes)

- [ ] Go to [analytics.google.com](https://analytics.google.com)
- [ ] Sign in with Google account
- [ ] Click "Start measuring"
- [ ] Create property: "Berserk Tattoos Website"
- [ ] Choose "Web" platform
- [ ] Enter website URL
- [ ] Copy your Measurement ID (format: `G-XXXXXXXXXX`)

**Update all HTML files:**
- [ ] Open `index.html`
  - Find line near bottom: `gtag('config', 'GA_MEASUREMENT_ID');`
  - Replace with your actual ID: `gtag('config', 'G-ABC123XYZ');`
- [ ] Repeat for `artists.html`
- [ ] Repeat for `book.html`

**Time Checkpoint**: 45 minutes elapsed

---

## 🚀 DEPLOYMENT

### OPTION A: Deploy to Netlify (Recommended - 5 minutes)

- [ ] Go to [netlify.com](https://www.netlify.com)
- [ ] Create free account
- [ ] Click "Add new site" > "Deploy manually"
- [ ] Drag and drop your entire `berserk-tattoos-website` folder
- [ ] Wait for deployment (usually 30-60 seconds)
- [ ] Netlify provides URL (e.g., `random-name-12345.netlify.app`)
- [ ] **OPTIONAL**: Configure custom domain
  - [ ] Go to Site Settings > Domain management
  - [ ] Add custom domain: `berserktattoos.com`
  - [ ] Follow DNS instructions from your domain registrar
  - [ ] Enable HTTPS (auto-configured by Netlify)

**Your site is now LIVE! 🎉**

---

### OPTION B: Deploy to GitHub Pages (Technical - 10 minutes)

- [ ] Create [GitHub](https://github.com) account if needed
- [ ] Create new repository: `berserk-tattoos`
- [ ] Upload all files to repository
- [ ] Go to Settings > Pages
- [ ] Source: Deploy from main branch
- [ ] Click Save
- [ ] Wait 2-3 minutes for deployment
- [ ] Site live at: `yourusername.github.io/berserk-tattoos`

---

### OPTION C: Traditional Hosting (cPanel/FTP - 10 minutes)

- [ ] Log into your hosting control panel (cPanel)
- [ ] Navigate to File Manager
- [ ] Go to `public_html` directory
- [ ] Upload all files (HTML + images folder)
- [ ] Ensure file structure is maintained
- [ ] Visit your domain to confirm site is live

---

## ✅ POST-LAUNCH CHECKLIST

### Immediate Testing (10 minutes)
- [ ] **Navigation**: Click every link, ensure they work
- [ ] **Mobile**: Open site on phone, test navigation and booking
- [ ] **Forms**: Submit test booking, verify you receive email
- [ ] **Images**: Confirm all images load (no broken icons)
- [ ] **Contact Links**: 
  - [ ] Click phone number (should open dialer)
  - [ ] Click email (should open mail app)
  - [ ] Test Instagram/Facebook links
- [ ] **Analytics**: Use Google Tag Assistant to verify tracking

### Within 24 Hours
- [ ] Submit site to Google Search Console
- [ ] Create Google My Business listing (if not done)
- [ ] Update social media bios with new website link
- [ ] Send test booking to each artist's email
- [ ] Take screenshots for portfolio/records

### Within First Week
- [ ] Monitor form submissions daily
- [ ] Respond to all booking requests within 24 hours
- [ ] Check Google Analytics for traffic insights
- [ ] Get feedback from friends/family
- [ ] Make minor adjustments based on feedback

---

## 🎨 OPTIONAL ENHANCEMENTS

### Quick Wins (Each ~30 minutes)
- [ ] Add favicon (use [favicon.io](https://favicon.io))
  - [ ] Generate favicon package
  - [ ] Download and add to root folder
  - [ ] Update HTML `<head>` sections
  
- [ ] Create custom 404 page
  - [ ] Copy structure from index.html
  - [ ] Add "Page not found" message
  - [ ] Save as `404.html` in root

- [ ] Add Instagram feed widget
  - [ ] Use [SnapWidget](https://snapwidget.com)
  - [ ] Generate embed code
  - [ ] Add to footer of index.html

### Advanced (Requires more time/skill)
- [ ] Set up email marketing (Mailchimp)
- [ ] Add live chat widget (Tawk.to)
- [ ] Implement A/B testing
- [ ] Add blog section for SEO

---

## 🐛 TROUBLESHOOTING GUIDE

### Issue: Images not showing
**Solution:**
1. Check file names match exactly (case-sensitive!)
2. Verify folder structure: `images/artists/` and `images/portfolio/`
3. Ensure images are .jpg format
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Form submissions not working
**Solution:**
1. Verify Formspree ID is correctly added to book.html
2. Check Formspree dashboard is active
3. Look for JavaScript errors in browser console (F12)
4. Ensure form fields have correct `name` attributes

### Issue: Mobile menu not opening
**Solution:**
1. Clear browser cache
2. Check JavaScript at bottom of HTML files is intact
3. Test in different browsers (Chrome, Safari, Firefox)
4. Verify no JavaScript errors in console (F12)

### Issue: Site not loading after deployment
**Solution:**
- **Netlify**: Check build logs for errors
- **GitHub**: Wait 5 minutes, check Actions tab for deployment status
- **cPanel**: Verify files are in correct directory (public_html)

---

## 📊 SUCCESS METRICS TO TRACK

### Week 1
- [ ] Total page views: Target 100+
- [ ] Booking form submissions: Target 3-5
- [ ] Average session duration: Target 2+ minutes
- [ ] Bounce rate: Target <50%

### Month 1
- [ ] Total conversions: Target 35-50 bookings
- [ ] Organic search traffic: Target 30%+ of traffic
- [ ] Return visitor rate: Target 15%+
- [ ] Mobile traffic: Should be 50%+ of total

---

## 📞 SUPPORT RESOURCES

**Need help?** Use these resources:
- Formspree Support: help.formspree.io
- Netlify Docs: docs.netlify.com
- Google Analytics: analytics.google.com/analytics/academy
- HTML Validator: validator.w3.org
- Image Optimization: tinypng.com

---

## 🎯 YOUR LAUNCH DAY TIMELINE

**9:00 AM** - Start with file preparation (Step 1)  
**9:05 AM** - Begin image collection (Step 2)  
**9:25 AM** - Update HTML with images (Step 3)  
**9:35 AM** - Configure Formspree (Step 4)  
**9:40 AM** - Add Google Analytics (Step 5)  
**9:45 AM** - Deploy to Netlify (Deployment)  
**9:50 AM** - Complete post-launch testing  
**10:00 AM** - **SITE IS LIVE!** 🚀

---

## ✨ FINAL CHECKLIST BEFORE GOING LIVE

- [ ] All HTML files present and functional
- [ ] 27 images added (3 artists + 24 portfolio)
- [ ] All images optimized (<300KB each)
- [ ] Formspree form ID configured
- [ ] Google Analytics on all pages
- [ ] Contact info verified (phone, email, address, hours)
- [ ] Social media links working
- [ ] Mobile responsive tested
- [ ] Form submission tested successfully
- [ ] Site deployed to hosting
- [ ] Custom domain connected (optional)
- [ ] SSL certificate active (HTTPS)

---

**🎉 CONGRATULATIONS! YOUR WEBSITE IS LIVE!**

**Next:** Share the link, update social media, and start accepting bookings.

**Remember:** The hard part is done. Now focus on:
1. Responding to booking requests promptly
2. Updating portfolio images monthly
3. Monitoring analytics for insights
4. Growing your online presence

**You've got this!** 💪