# Quick Start Guide - Berserk Tattoos Website

**Last Updated:** October 16, 2025  
**Status:** Production Ready ✅

---

## 🚀 Deploy in 3 Steps

### 1. Create Favicons (20 minutes)

```
1. Visit https://realfavicongenerator.net/
2. Upload your 512x512 logo
3. Download generated files
4. Replace in project root:
   - favicon.ico
   - apple-touch-icon.png
   - android-chrome-192x192.png
   - android-chrome-512x512.png
```

### 2. Optimize Images (1 hour)

```
1. Visit https://tinyjpg.com/
2. Upload all files from images/portfolio/
3. Download compressed versions
4. Replace original files
Target: <200KB per image
```

### 3. Deploy to Hosting

```
1. Sign up at Netlify.com (free)
2. Drag & drop project folder
3. Configure custom domain
4. Done! Your site is live 🎉
```

---

## 📞 Quick Contact Info Update

**Need to change phone/email/address?**

Search and replace in these files:

- `index.html`
- `book.html`
- `sitemap.xml`

**Phone:** Search for `0478 128 212` and `+61478128212`  
**Email:** Search for `berserk.tattoos.au@gmail.com`  
**Address:** Search for `33 Southern Road`

---

## 🖼️ Add New Portfolio Image

1. **Optimize image** → <https://tinyjpg.com/> (<200KB)
2. **Name file:** `artist-7.jpg` (e.g., amelia-7.jpg)
3. **Upload to:** `images/portfolio/` folder
4. **Add to HTML:**

```html
<!-- In index.html, gallery section: -->
<div class="gallery-item" 
     style="background: url('/images/portfolio/amelia-7.jpg') center/cover;"
     data-artist="amelia"></div>
```

```html
<!-- In artists.html, portfolio grid: -->
<div class="portfolio-item" 
     data-category="fineline"
     style="background: url('../images/portfolio/amelia-7.jpg') center/cover;">
    <div class="portfolio-overlay">
        <div class="portfolio-info">
            <h4>Design Name</h4>
            <p>Fine line · Placement</p>
        </div>
    </div>
</div>
```

---

## 📝 Update Text Content

### Change Hero Tagline (Homepage)

**File:** `index.html`  
**Line:** ~833  
**Find:** `<p class="hero-tagline">`  
**Edit:** Text between `<p>` and `</p>`

### Change Artist Bio

**File:** `index.html` (short) or `artists.html` (full)  
**Find:** Artist name in HTML  
**Edit:** `<p class="artist-bio">` content  
**Keep:** 60-80 words (short) or 150-200 words (full)

### Update Pricing

**File:** `book.html`  
**Line:** ~796  
**Find:** "How much will my tattoo cost?"  
**Edit:** Pricing ranges in the answer

---

## 📊 Set Up Google Analytics (Optional)

1. **Create GA4 property** → <https://analytics.google.com/>
2. **Copy Measurement ID** (format: G-XXXXXXXXXX)
3. **Find & Replace in all HTML files:**
   - Find: `GA_MEASUREMENT_ID`
   - Replace: Your actual ID
4. **Deploy and test** → Check Real-Time reports

---

## 🧪 Test Before Launch

### Desktop Browser Test (5 minutes)

- [ ] Open in Chrome
- [ ] All images load?
- [ ] Click "Book Now" → Form opens?
- [ ] Fill form → Email opens?
- [ ] No console errors? (F12 → Console)

### Mobile Device Test (5 minutes)

- [ ] Open on phone
- [ ] Tap menu icon → Opens?
- [ ] Tap gallery image → Modal opens?
- [ ] Fill booking form → Works?
- [ ] All text readable?

---

## 🆘 Common Issues & Fixes

### Images not loading

✅ **Check:** File path is `/images/portfolio/filename.jpg`  
✅ **Check:** File name matches exactly (case-sensitive)  
✅ **Clear:** Browser cache (Ctrl+F5)

### Form not submitting

✅ **Check:** Email client installed on device  
✅ **Try:** Different browser  
✅ **Verify:** Email address is correct

### Mobile menu not working

✅ **Check:** JavaScript console for errors (F12)  
✅ **Clear:** Browser cache  
✅ **Test:** Different mobile browser

### Site looks broken

✅ **Check:** All HTML tags closed properly  
✅ **Check:** CSS `<style>` tag not deleted  
✅ **Clear:** Browser cache (Ctrl+F5)  
✅ **Try:** Incognito mode

---

## 📚 Full Documentation

Need more details? Check these guides:

| Guide | Use For |
|-------|---------|
| **PRODUCTION-READY-SUMMARY.md** | Complete overview & status |
| **MAINTENANCE-GUIDE.md** | Day-to-day updates & changes |
| **IMAGE-OPTIMIZATION-GUIDE.md** | Image compression & WebP |
| **PERFORMANCE-OPTIMIZATION-GUIDE.md** | Speed & optimization |
| **BROWSER-COMPATIBILITY-GUIDE.md** | Cross-browser testing |
| **PRE-LAUNCH-CHECKLIST.md** | Deployment verification |

---

## 🎯 Performance Targets

✅ **Page Load:** <2 seconds on 4G  
✅ **Lighthouse Score:** 90+ performance  
✅ **Image Sizes:** <200KB each  
✅ **Mobile-Friendly:** Yes  
✅ **Accessibility:** WCAG 2.1 AA  

---

## 📱 Quick Links

**Optimization Tools:**

- Image compression: <https://tinyjpg.com/>
- Favicon generator: <https://realfavicongenerator.net/>
- Speed test: <https://pagespeed.web.dev/>

**Testing Tools:**

- HTML validator: <https://validator.w3.org/>
- Accessibility test: <https://wave.webaim.org/>
- SEO check: <https://search.google.com/search-console>

**Hosting (Free):**

- Netlify: <https://www.netlify.com/>
- Vercel: <https://vercel.com/>
- GitHub Pages: <https://pages.github.com/>

---

## ⚡ Emergency Contacts

**Website Issues:** Check MAINTENANCE-GUIDE.md troubleshooting section  
**Hosting Support:** Contact your hosting provider  
**Domain Issues:** Contact your domain registrar

---

## ✅ Pre-Launch Checklist (Minimal)

Quick 10-minute check before going live:

- [ ] Create favicons (or use placeholders)
- [ ] Test booking form on desktop
- [ ] Test booking form on mobile
- [ ] Verify contact info is correct
- [ ] Check all images load
- [ ] Test on Chrome + Safari
- [ ] No console errors (F12)
- [ ] Backup project folder

**Ready?** Deploy! 🚀

---

## 🎉 Post-Launch (Week 1)

- [ ] Day 1: Monitor for errors, test live site
- [ ] Day 2: Submit sitemap to Google Search Console
- [ ] Day 3: Check analytics (if set up)
- [ ] Day 7: Review first week's performance
- [ ] Ongoing: Respond to booking inquiries promptly

---

## 💡 Pro Tips

1. **Always backup** before making changes
2. **Test locally first** before deploying
3. **Keep images under 200KB** for fast loading
4. **Update portfolio regularly** with new work
5. **Monitor analytics weekly** to track growth

---

## 🏁 You're All Set

**This website is production-ready.**  
Follow the 3-step deployment above and you're live in under 2 hours.

Questions? Check the full documentation guides.

**Good luck with your launch! 🚀**

---

**Quick Start v1.0** | October 16, 2025
