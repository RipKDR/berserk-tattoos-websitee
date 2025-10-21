# Instagram Feed Setup Guide (SnapWidget)

## 📸 Overview

This guide explains how to integrate your Instagram feed into the Berserk Tattoos website using SnapWidget's free tier.

---

## 🎯 Step 1: Create SnapWidget Account

1. Go to **https://snapwidget.com/**
2. Click **"Sign Up" / "Get Started"**
3. Create a free account (no credit card required)
4. Verify your email address

---

## 🔧 Step 2: Create Instagram Widget

### A. Start New Widget

1. Log in to SnapWidget dashboard
2. Click **"+ Create New Widget"**
3. Select **"Grid"** layout (displays posts in a grid)

### B. Connect Instagram

1. **Source**: Select "Instagram"
2. **Connect Account**: 
   - Click "Connect Instagram Account"
   - Log in to your `@berserk_tattoos` Instagram account
   - Authorize SnapWidget to access your feed
3. **Username**: Verify it shows `@berserk_tattoos`

### C. Configure Widget Settings

#### **Layout Tab:**
- **Columns**: `3`
- **Rows**: `3`
- **Total Posts**: 9 posts (3x3 grid)
- **Spacing**: `10px`
- **Border Radius**: `8px` (optional, for rounded corners)

#### **Style Tab:**
- **Theme**: `Dark` (matches Berserk Tattoos brand)
- **Background**: `#0a0a0a` or `Transparent`
- **Hover Effect**: `Zoom` or `Fade`
- **Show Captions**: `On Hover` (optional)

#### **Responsive Tab:**
- **Width**: `Responsive` or `100%`
- **Mobile Columns**: `2` (for mobile devices)
- **Responsive Breakpoint**: `768px`

#### **Advanced Tab:**
- **Load More Button**: `Off` (we want exactly 9 posts)
- **Open Links In**: `New Tab`
- **Show Instagram Logo**: `Yes` (recommended for attribution)

### D. Preview & Customize

1. Click **"Preview"** to see how it looks
2. Adjust colors/spacing as needed
3. Ensure it matches the dark theme (#111111 background, #7B1113 accent)

---

## 📋 Step 3: Get Embed Code

1. Click **"Get Widget"** or **"Embed Code"**
2. Copy the provided embed code
   - It will look like this:
   ```html
   <script src="https://snapwidget.com/js/snapwidget.js"></script>
   <iframe src="https://snapwidget.com/embed/XXXXXX" class="snapwidget-widget" 
           style="border:none; overflow:hidden; width:100%;" 
           scrolling="no"></iframe>
   ```
3. **Save the widget** (give it a name like "Berserk Tattoos Homepage")

---

## 🚀 Step 4: Add to Website

### A. Open `index.html`

Navigate to `berserk-tattoos-website/index.html`

### B. Find Instagram Section

Search for: **"Instagram Feed Section"** (around line 1855-1900)

You'll see a comment block that says:
```html
<!-- 📸 INSTAGRAM FEED SETUP REQUIRED -->
```

### C. Replace Placeholder

1. **Remove** this entire block:
```html
<!-- Temporary Placeholder (Remove after adding SnapWidget) -->
<div class="instagram-placeholder">
    ...entire placeholder div...
</div>
```

2. **Paste** your SnapWidget embed code in its place:
```html
<!-- SnapWidget Instagram Feed -->
<script src="https://snapwidget.com/js/snapwidget.js"></script>
<iframe src="https://snapwidget.com/embed/XXXXXX" class="snapwidget-widget" 
        style="border:none; overflow:hidden; width:100%; height:auto;" 
        scrolling="no"></iframe>
```

### D. Optional: Wrap in Container

For better styling, wrap the SnapWidget code:
```html
<div class="instagram-grid-wrapper">
    <script src="https://snapwidget.com/js/snapwidget.js"></script>
    <iframe src="https://snapwidget.com/embed/XXXXXX" class="snapwidget-widget" 
            style="border:none; overflow:hidden; width:100%;" 
            scrolling="no"></iframe>
</div>
```

---

## ✅ Step 5: Test & Verify

### A. Test Locally

1. Save `index.html`
2. Open the file in a browser (or use local server)
3. Scroll to Instagram section
4. Verify:
   - ✅ 9 Instagram posts display in a 3x3 grid
   - ✅ Posts load correctly (not showing errors)
   - ✅ Theme matches website (dark background)
   - ✅ Mobile responsive (2 columns on small screens)
   - ✅ Links open Instagram in new tab

### B. Test on Mobile

1. Open on phone or use browser dev tools
2. Check that grid switches to 2 columns
3. Verify touch interactions work

---

## 🎨 Customization Tips

### Match Brand Colors

If SnapWidget colors don't match, add custom CSS:

```css
/* Optional: Override SnapWidget styles */
.instagram-widget-wrapper iframe {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.snapwidget-widget {
    margin: 0 auto;
    max-width: 100%;
}
```

### Hide Certain Posts

SnapWidget allows filtering by hashtags:
- In widget settings, add **"Filter by Hashtag"**
- Use `#berserkportfolio` for curated posts
- Only posts with that hashtag will show

---

## 🔄 Updating the Feed

### Automatic Updates

- SnapWidget refreshes automatically every **30-60 minutes**
- New Instagram posts appear without manual updates
- No need to edit code after initial setup

### Manual Refresh

If posts aren't updating:
1. Go to SnapWidget dashboard
2. Click on your widget
3. Click **"Refresh Feed"**

---

## 🐛 Troubleshooting

### Issue: "Widget not loading"

**Solution:**
- Check Instagram account is still connected in SnapWidget dashboard
- Verify embed code is correctly pasted (no missing characters)
- Check browser console for JavaScript errors
- Ensure you're not blocking third-party scripts (ad blockers)

### Issue: "Shows wrong posts"

**Solution:**
- SnapWidget pulls from public Instagram feed
- Ensure `@berserk_tattoos` account is public
- Check widget settings for any hashtag filters
- Wait 30 minutes for cache to refresh

### Issue: "Layout looks broken on mobile"

**Solution:**
- Set "Mobile Columns" to `2` in SnapWidget settings
- Ensure responsive breakpoint is `768px`
- Check that iframe has `width:100%` style

### Issue: "SnapWidget Free Tier Limits"

SnapWidget Free Tier includes:
- ✅ Unlimited page views
- ✅ Single Instagram source
- ✅ Basic layouts (Grid, Slideshow)
- ❌ No hashtag mixing
- ❌ No custom CSS injection

If you need advanced features, upgrade to Pro ($5/month).

---

## 📱 Alternative: Manual Instagram Embed

If you don't want to use SnapWidget, manually embed Instagram posts:

```html
<!-- Individual Instagram Post Embed -->
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/POST_ID/" 
            data-instgrm-version="14">
</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

Repeat this for 9 different posts. Less automated, but no third-party service required.

---

## 🎯 Best Practices

1. **Curate Your Feed**: Only show your best work using hashtag filters
2. **Update Regularly**: Post new work weekly to keep feed fresh
3. **High-Quality Images**: Instagram posts should be high-resolution (1080x1080 minimum)
4. **Consistent Theme**: Maintain dark, moody aesthetic matching website
5. **Engage on Instagram**: Direct users to follow for more content

---

## 📞 Support

**SnapWidget Help:**
- Docs: https://snapwidget.com/help
- Email: support@snapwidget.com

**Instagram Issues:**
- Ensure account is public (not private)
- Verify you have at least 9 posts on your profile
- Check Instagram Business/Creator account settings

---

## ✅ Checklist

- [ ] Created SnapWidget account (free)
- [ ] Connected @berserk_tattoos Instagram
- [ ] Configured widget (3x3 grid, dark theme, 9 posts)
- [ ] Copied embed code
- [ ] Replaced placeholder in `index.html`
- [ ] Tested on desktop (3 columns)
- [ ] Tested on mobile (2 columns)
- [ ] Verified links open in new tab
- [ ] Confirmed automatic feed updates work

---

**🎉 Once complete, your Instagram feed will automatically display your latest 9 posts on the homepage!**

**Last Updated:** October 2025  
**Website Version:** 1.0.0

