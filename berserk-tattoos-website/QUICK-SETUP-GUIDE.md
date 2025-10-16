# Quick Setup Guide - 30 Minutes to Launch

## What You Need to Do Right Now

### Step 1: Create Favicons (5 minutes)

1. Go to: https://favicon.io/favicon-generator/
2. Settings:
   - Text: **B**
   - Background Color: **#111111**
   - Font Color: **#7B1113**
   - Font Family: **Cinzel** (or similar serif)
   - Font Size: **110**
3. Click "Download"
4. Extract ZIP and copy these files to your project root:
   - favicon.ico
   - apple-touch-icon.png
   - android-chrome-192x192.png
   - android-chrome-512x512.png

### Step 2: Create OG Image (10 minutes)

1. Go to: https://www.canva.com
2. Create new design: **1200 x 630 px** (search "Facebook Post")
3. Design with:
   - Background: **#111111** (black)
   - Main text: **BERSERK TATTOOS** (large, centered)
   - Font: **Cinzel or similar bold serif**
   - Color: **#F2F2F2** (light) or **#7B1113** (red accent)
   - Add subtitle: "Melbourne's Premier Tattoo Studio"
4. Download as JPG
5. Compress at: https://tinypng.com (target <300KB)
6. Save as **og-image.jpg** in project root

### Step 3: Set Up Formspree (5 minutes)

1. Go to: https://formspree.io
2. Sign up for free account
3. Click "New Form"
4. Name it: "Berserk Tattoos Bookings"
5. Copy your form ID (looks like: **xyzabcde**)
6. Open **book.html** in a text editor
7. Find line 633: `action="https://formspree.io/f/YOUR_FORM_ID"`
8. Replace **YOUR_FORM_ID** with your actual ID
9. Save the file

### Step 4: Set Up Google Analytics (5 minutes)

1. Go to: https://analytics.google.com
2. Create new account/property: "Berserk Tattoos"
3. Get your Measurement ID (looks like: **G-XXXXXXXXXX**)
4. In each HTML file, find and replace **GA_MEASUREMENT_ID** with your ID:
   - index.html
   - artists.html
   - book.html
   - thank-you.html
   - payment-success.html
5. Save all files

### Step 5: Deploy to Netlify (5 minutes)

1. Go to: https://www.netlify.com
2. Sign up for free account
3. Click "Add new site" → "Deploy manually"
4. Drag your entire **berserk-tattoos-website** folder into the browser
5. Wait for deployment (30 seconds)
6. Your site is live! 🎉

### Step 6: Test Your Live Site

1. Click the Netlify URL (looks like: amazing-curie-123456.netlify.app)
2. Quick tests:
   - [ ] Homepage loads
   - [ ] Click "Book Now" button
   - [ ] Fill out booking form and submit
   - [ ] Check email for form submission
   - [ ] Test on your phone
3. If everything works, you're done!

### Optional: Custom Domain

If you own berserktattoos.com:

1. In Netlify: Site settings → Domain management → Add custom domain
2. Follow DNS configuration instructions
3. SSL certificate auto-configures

## That's It! 🚀

Your website is now live and accepting bookings. Share the URL with the studio team and start promoting!

### Need Help?

- **Images too large?** Use TinyPNG.com
- **Form not working?** Double-check the Formspree ID
- **Analytics not tracking?** Wait 24 hours for data to appear
- **Mobile issues?** Clear browser cache and reload

---

**Total Time: 30 minutes**
**Result: Fully functional, professional tattoo studio website**
