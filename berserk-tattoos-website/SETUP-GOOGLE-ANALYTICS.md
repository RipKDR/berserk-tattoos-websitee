# Google Analytics 4 Setup Guide

## 📊 Overview

This guide explains how to set up Google Analytics 4 (GA4) for Berserk Tattoos website. The site is already instrumented with GA4 tracking code—you just need to replace the placeholder with your actual Measurement ID.

---

## 🎯 Step 1: Create Your Google Analytics 4 Property

1. **Go to Google Analytics**: https://analytics.google.com/
2. **Sign in** with your Google account (or create one)
3. **Create a new GA4 property**:
   - Click **Admin** (gear icon, bottom left)
   - Under **Account**, click **Create Account** (if you don't have one)
   - Name: `Berserk Tattoos`
   - Under **Property**, click **Create Property**
   - Property name: `Berserk Tattoos Website`
   - Reporting time zone: **Australia/Melbourne**
   - Currency: **Australian Dollar (AUD)**
4. **Click "Next"** and fill in business details:
   - Industry: `Beauty & Fitness`
   - Business size: `Small` (1-10 employees)
5. **Select business objectives**: `Get baseline reports` and `Examine user behavior`
6. **Click "Create"** and accept Terms of Service

---

## 🔑 Step 2: Get Your Measurement ID

1. After creating the property, you'll see **"Choose a platform"**
2. Click **Web**
3. Enter your website details:
   - Website URL: `https://berserktattoos.com` (or your actual domain)
   - Stream name: `Berserk Tattoos Website`
4. Click **"Create stream"**
5. **Copy your Measurement ID** - it looks like: `G-XXXXXXXXXX`
   - Example: `G-ABC123DEF4`
   - This is your unique tracking ID

---

## 🔧 Step 3: Replace GA_MEASUREMENT_ID in Your Website

The website has Google Analytics already integrated. You just need to replace the placeholder `GA_MEASUREMENT_ID` with your actual Measurement ID in **7 HTML files**:

### Files to Update:

#### 1. **index.html** (Homepage)
   - **Line 1432**: `<script defer src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`
   - **Line 1439**: `gtag('config', 'GA_MEASUREMENT_ID', {`

#### 2. **artists.html** (Artists Page)
   - **Line 1267**: `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`
   - **Line 1274**: `gtag('config', 'GA_MEASUREMENT_ID', {`
   - **Line 1355**: `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`
   - **Line 1360**: `gtag('config', 'GA_MEASUREMENT_ID', {`

#### 3. **book.html** (Booking Page)
   - **Line 436**: `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`
   - **Line 441**: `gtag('config', 'GA_MEASUREMENT_ID');`

#### 4. **book-new.html** (Alternative Booking Page)
   - **Line 707**: `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`
   - **Line 712**: `gtag('config', 'GA_MEASUREMENT_ID');`

#### 5. **aftercare.html** (Aftercare Guide)
   - **Line 734**: `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`
   - **Line 741**: `gtag('config', 'GA_MEASUREMENT_ID', {`

#### 6. **thank-you.html** (Booking Confirmation)
   - **Line 444**: `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`
   - **Line 451**: `gtag('config', 'GA_MEASUREMENT_ID', {`

#### 7. **payment-success.html** (Payment Success)
   - **Line 519**: `<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>`
   - **Line 526**: `gtag('config', 'GA_MEASUREMENT_ID', {`

---

## 🚀 Quick Find & Replace Method

**Option A: Using VS Code / Cursor (Recommended)**

1. Open the project in your code editor
2. Press `Ctrl+Shift+F` (Windows) or `Cmd+Shift+F` (Mac)
3. In "Search" field, type: `GA_MEASUREMENT_ID`
4. In "Replace" field, type your actual ID (e.g., `G-ABC123DEF4`)
5. Click **"Replace All"** (or review each replacement)
6. Save all files (`Ctrl+K S` or `Cmd+K S`)

**Option B: Using PowerShell (Command Line)**

```powershell
cd berserk-tattoos-website

# Replace GA_MEASUREMENT_ID with your actual ID
$files = @("index.html", "artists.html", "book.html", "book-new.html", "aftercare.html", "thank-you.html", "payment-success.html")

foreach ($file in $files) {
    (Get-Content $file) -replace 'GA_MEASUREMENT_ID', 'G-YOUR_ACTUAL_ID' | Set-Content $file
}
```

Replace `G-YOUR_ACTUAL_ID` with your real Measurement ID.

---

## ✅ Step 4: Verify Installation

### Test Locally:

1. Open your website in a browser
2. Open **Developer Tools** (F12)
3. Go to **Network** tab
4. Reload the page
5. Filter by "gtag" or "google-analytics"
6. You should see requests to `www.google-analytics.com`

### Test in Google Analytics:

1. Go back to Google Analytics
2. Click **"Realtime"** in the left sidebar
3. Open your website in another tab/browser
4. You should see **1 active user** in the Realtime report within 30 seconds

---

## 📈 What's Already Tracked

The website is pre-configured with custom event tracking:

### Homepage Events:
- ✅ `click_book_now` - When users click "Book Now" buttons
- ✅ `view_artist` - When users view artist profiles
- ✅ `view_gallery_image` - When users click portfolio images

### Booking Events:
- ✅ `booking_step_1` through `booking_step_5` - Wizard progress tracking
- ✅ `booking_request_confirmed` - Successful booking submission

### Artists Page Events:
- ✅ `view_artist_profile` - Artist profile views
- ✅ `filter_portfolio` - Portfolio filtering
- ✅ `artist_tab_switch` - Artist tab changes

### Payment Events:
- ✅ `purchase` - Successful payments (ecommerce tracking)
- ✅ `deposit_paid` - $100 deposit tracking with transaction details

### Performance Events:
- ✅ `performance` - Core Web Vitals (LCP, FID, CLS)
- ✅ `slow_page_load` - Pages loading over 3 seconds

---

## 🎯 Recommended Next Steps (After Setup)

### 1. **Set Up Conversions (Goals)**

In GA4, go to **Admin → Events → Mark as conversion**:
- `booking_request_confirmed` - Primary conversion
- `deposit_paid` - Ecommerce conversion
- `click_book_now` - Micro-conversion

### 2. **Enable Enhanced Measurement**

GA4 automatically tracks these if enabled (should be on by default):
- Page views
- Scrolls
- Outbound clicks
- Site search
- File downloads

Check: **Admin → Data Streams → [Your Stream] → Enhanced measurement**

### 3. **Link to Google Search Console**

Enables search query data:
1. **Admin → Property → Product Links**
2. Click **Search Console**
3. Click **Link** and follow prompts

### 4. **Create Custom Reports**

Useful reports for tattoo studio:
- **Artist Performance**: Which artist gets most interest
- **Booking Funnel**: Where users drop off in booking process
- **Portfolio Engagement**: Most viewed portfolio images
- **Mobile vs Desktop**: Device breakdown

---

## 🔒 Privacy & Compliance

The website is already configured for privacy compliance:

✅ **Cookie consent** implemented (cookie-policy.html)
✅ **Privacy policy** with GA4 disclosure (privacy-policy.html)
✅ **IP anonymization** enabled in gtag config
✅ **Google Analytics opt-out** link provided

**GA4 Configuration in Code:**
```javascript
gtag('config', 'GA_MEASUREMENT_ID', {
  'anonymize_ip': true,           // IP anonymization
  'cookie_flags': 'SameSite=None;Secure',  // Cookie security
  'allow_google_signals': false   // Disable remarketing
});
```

---

## 🛠️ Troubleshooting

### Issue: "Not seeing data in Google Analytics"

**Solutions:**
1. Wait 24-48 hours for data to populate (Realtime should work immediately)
2. Check that you replaced ALL instances of `GA_MEASUREMENT_ID`
3. Verify your Measurement ID format is `G-XXXXXXXXXX`
4. Ensure you're looking at the correct property in GA4
5. Check browser console for JavaScript errors
6. Disable ad blockers (they block GA tracking)

### Issue: "Events not showing up"

**Solutions:**
1. Events appear in **Realtime → Events** within seconds
2. Custom events appear in **Reports → Engagement → Events** after 24-48 hours
3. Ensure JavaScript is enabled in browser
4. Check Network tab in DevTools for gtag requests

### Issue: "Multiple tracking codes installed"

**Check:**
- Only ONE gtag script per page
- No duplicate GA_MEASUREMENT_ID replacements
- No conflicting analytics scripts

---

## 📞 Support

**Google Analytics Help:**
- Help Center: https://support.google.com/analytics
- Community: https://www.en.advertisercommunity.com/t5/Google-Analytics-4/ct-p/google-analytics-4

**Website Implementation:**
- All GA4 code is in the HTML files (near closing `</body>` tags)
- Additional tracking in: `js/booking-enhancements.js`, `js/booking-wizard.js`, `js/performance-monitor.js`

---

## ✅ Checklist

- [ ] Created Google Analytics 4 property
- [ ] Obtained Measurement ID (format: G-XXXXXXXXXX)
- [ ] Replaced GA_MEASUREMENT_ID in all 7 HTML files
- [ ] Tested Realtime tracking (saw active user)
- [ ] Set up conversion events in GA4
- [ ] Enabled Enhanced Measurement
- [ ] (Optional) Linked Google Search Console

---

**🎉 Once complete, you'll have full analytics tracking across your entire Berserk Tattoos website!**

**Last Updated:** October 2025  
**Website Version:** 1.0.0

