# 📸 Social Sharing Images Guide
**Required Images for Launch**

---

## 🎯 Missing Images

The website references 4 image files that don't currently exist:

1. **og-image.jpg** (Required for social sharing)
2. **logo.jpg** (Required for Schema.org structured data)
3. **icon-192.png** (Required for PWA/mobile app icon)
4. **icon-512.png** (Required for PWA/mobile app icon)

---

## 1. OG-IMAGE.JPG

### Purpose
Used when someone shares your website on Facebook, LinkedIn, Twitter, or other social media platforms.

### Specifications
- **Size:** 1200px × 630px (required by Facebook)
- **Format:** JPG or PNG
- **File Size:** Keep under 1MB
- **Location:** `/og-image.jpg` (root directory)

### Design Recommendations
```
┌─────────────────────────────────────────────┐
│                                             │
│            BERSERK TATTOOS                  │
│     Melbourne's Premier Tattoo Studio      │
│                                             │
│   [Optional: Include 2-3 portfolio         │
│    images in a collage format]             │
│                                             │
│                                             │
│        Three Master Artists                 │
│        Fine Line • Realism • Blackwork      │
│        33 Southern Road, Heidelberg Heights │
│                                             │
└─────────────────────────────────────────────┘
```

**Design Tips:**
- Use dark background (#111111) to match brand
- Include studio name prominently
- Add tagline or key USP
- Optionally include artist photos or best portfolio pieces
- Ensure text is readable at small sizes

**Tools to Create:**
- Canva (free templates for OG images)
- Photoshop/GIMP
- Figma
- Online OG image generators

### Quick Fix (No Design Skills)
If you don't want to create a custom image right now:

**Option A:** Use an existing portfolio image
```html
<!-- In all HTML files, change: -->
<meta property="og:image" content="https://berserktattoos.com/og-image.jpg">

<!-- To: -->
<meta property="og:image" content="https://berserktattoos.com/images/portfolio/amelia-1.jpg">
```

**Option B:** Use a text-based generator
1. Go to https://www.opengraph.xyz/ or https://ogimage.gallery/
2. Enter your text
3. Download the image
4. Save as `og-image.jpg` in root directory

---

## 2. LOGO.JPG

### Purpose
Referenced in Schema.org structured data for search engines.

### Specifications
- **Size:** Square format (e.g., 512px × 512px or 1000px × 1000px)
- **Format:** JPG
- **File Size:** Keep under 500KB
- **Location:** `/logo.jpg` (root directory)

### Design Recommendations
- Simple logo on transparent or dark background
- Should be recognizable at small sizes
- Square format (1:1 ratio)

### Quick Fix
Use your existing best artist portrait or create a simple text logo:
- Just the word "BERSERK" in Cinzel font on dark background
- Or use one of the existing portfolio images cropped to square

---

## 3 & 4. ICON-192.PNG & ICON-512.PNG

### Purpose
Used as app icons when users add your website to their home screen (Progressive Web App functionality).

### Specifications

**icon-192.png:**
- **Size:** 192px × 192px
- **Format:** PNG with transparency
- **Location:** `/icon-192.png` (root directory)

**icon-512.png:**
- **Size:** 512px × 512px  
- **Format:** PNG with transparency
- **Location:** `/icon-512.png` (root directory)

### Design Recommendations
- Square icon design
- Should work well at small sizes
- Can be simplified version of logo
- Consider maskable design (works with rounded corners on different devices)

### Quick Fix
1. Create a simple icon with "B" letter or skull symbol
2. Use your logo resized to 192px and 512px
3. Or temporarily use: https://realfavicongenerator.net/

---

## 🚀 IMPLEMENTATION STEPS

### Step 1: Create the Images
Create all 4 images using the specifications above.

### Step 2: Place Files
Place the files in the root directory:
```
berserk-tattoos-website/
├── og-image.jpg          ← Social sharing image
├── logo.jpg              ← Square logo
├── icon-192.png          ← Small PWA icon
├── icon-512.png          ← Large PWA icon
├── index.html
├── artists.html
└── book.html
```

### Step 3: Verify References
The files are already referenced correctly in:
- `index.html` (lines 18, 25, 44)
- `artists.html` (line 13)
- `book.html` (line 18, 25)
- `manifest.json` (lines 24, 30)

No code changes needed - just add the files!

---

## 🎨 DESIGN SERVICES (if needed)

### Free Tools:
- **Canva** - Free templates for OG images and icons
- **GIMP** - Free Photoshop alternative
- **Figma** - Free design tool
- **RealFaviconGenerator** - Auto-generates all icon sizes

### Quick Services:
- **Fiverr** - $5-20 for social image designs
- **99designs** - Professional logo/icon design
- **Upwork** - Freelance designers

### DIY Approach:
1. Take screenshot of your best portfolio piece
2. Add text overlay with studio name
3. Resize to specs
4. Done!

---

## ✅ CURRENT STATUS

| File | Status | Required | Blocking Launch? |
|------|--------|----------|------------------|
| og-image.jpg | ❌ Missing | ✅ Yes | ⚠️ Partial (social sharing broken) |
| logo.jpg | ❌ Missing | ✅ Yes | ⚠️ Partial (SEO impact) |
| icon-192.png | ❌ Missing | ✅ Yes | ⚠️ Partial (PWA won't install) |
| icon-512.png | ❌ Missing | ✅ Yes | ⚠️ Partial (PWA won't install) |

---

## 🎯 PRIORITY RECOMMENDATION

**Priority 1 (Critical for Social Sharing):**
- og-image.jpg

**Priority 2 (Important for SEO):**
- logo.jpg

**Priority 3 (Optional, for PWA functionality):**
- icon-192.png
- icon-512.png

---

## 💡 TEMPORARY WORKAROUND

If you want to launch IMMEDIATELY without creating images:

### Edit the HTML files to use existing images:

**index.html (lines 18, 25):**
```html
<!-- Change: -->
<meta property="og:image" content="https://berserktattoos.com/og-image.jpg">

<!-- To: -->
<meta property="og:image" content="https://berserktattoos.com/images/portfolio/amelia-1.jpg">
```

**index.html (line 44):**
```html
<!-- Change: -->
"image": "https://berserktattoos.com/logo.jpg",

<!-- To: -->
"image": "https://berserktattoos.com/images/portfolio/amelia.jpg",
```

**manifest.json (lines 24, 30):**
```html
<!-- Change: -->
"src": "/icon-192.png",
"src": "/icon-512.png",

<!-- To: -->
"src": "/android-chrome-192x192.png",
"src": "/android-chrome-512x512.png",
```

---

## 📝 NOTES

- All existing portfolio images are properly sized and professional quality
- Using portfolio images as temporary OG images is perfectly acceptable
- PWA functionality will still work with existing favicon files
- You can always update these images later without breaking anything

---

**Last Updated:** October 16, 2025

