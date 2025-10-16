# ASSET GENERATION GUIDE

**These files need to be created by you. Here's exactly how to do it.**

---

## 🎨 **REQUIRED ASSETS TO CREATE**

### ✅ **Already Have (From Previous Files):**
- index.html
- artists.html
- book.html
- README.md
- IMPLEMENTATION-CHECKLIST.md
- .gitignore
- robots.txt
- sitemap.xml
- 404.html
- manifest.json
- netlify.toml

### ❌ **Need to Create (This Guide):**
1. favicon.ico + icon set
2. og-image.jpg (social media preview)
3. 27 portfolio/artist images

---

## 📦 **1. FAVICON & ICONS (5 minutes)**

### **What You Need:**
- A square logo or "B" letter in brand colors (#7B1113 on #111111)
- Minimum 512x512px

### **Step-by-Step:**

#### **Option A: Use Favicon Generator (Easiest)**
1. Go to: **https://favicon.io/favicon-generator/**
2. Settings:
   - **Text:** B
   - **Background:** #111111 (dark)
   - **Font Color:** #7B1113 (red)
   - **Font Family:** Cinzel or similar serif
   - **Font Size:** 110
   - **Shape:** Square or Circle
3. Click "Download"
4. Extract the ZIP file
5. You'll get these files:
   ```
   ✅ favicon.ico
   ✅ favicon-16x16.png
   ✅ favicon-32x32.png
   ✅ apple-touch-icon.png (180x180)
   ✅ android-chrome-192x192.png → rename to icon-192.png
   ✅ android-chrome-512x512.png → rename to icon-512.png
   ```
6. Place all in your root folder

#### **Option B: Use Canva (More Custom)**
1. Go to: **https://www.canva.com**
2. Create design: 512x512px
3. Design your logo/icon:
   - Background: #111111
   - Text/Icon: #7B1113 or #F2F2F2
   - Keep it simple (looks good when small)
4. Download as PNG
5. Go to: **https://realfavicongenerator.net**
6. Upload your 512x512 PNG
7. Generate all sizes
8. Download and extract to root folder

### **Required Files Checklist:**
```
/
├── favicon.ico ✅
├── apple-touch-icon.png ✅ (180x180)
├── icon-192.png ✅ (192x192)
└── icon-512.png ✅ (512x512)
```

### **Add to HTML (Already Done):**
The HTML files already have this in the `<head>`:
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
```

---

## 🖼️ **2. OG-IMAGE.JPG (Social Media Preview) (10 minutes)**

### **What It Is:**
The image that shows when you share your site on Facebook, Instagram, Twitter, LinkedIn, etc.

### **Required Specs:**
- **Size:** 1200x630px (exact)
- **Format:** JPG
- **File size:** <300KB
- **Content:** Must look good as thumbnail

### **Step-by-Step:**

#### **Option A: Canva Template (Easiest)**
1. Go to: **https://www.canva.com**
2. Search templates: "Facebook Post" or "OG Image"
3. Filter by size: 1200x630px
4. Choose a dark template or start blank
5. Design your image:
   ```
   Background: Dark (#111111 or dramatic photo)
   
   Main Text: "BERSERK TATTOOS"
   - Font: Cinzel Bold
   - Color: #F2F2F2 or #7B1113
   - Size: Large (80-100pt)
   
   Subtitle: "Melbourne's Premier Tattoo Artists"
   - Font: Inter
   - Color: #F2F2F2
   - Size: Medium (30-40pt)
   
   Optional: Add artist photos or best tattoo work
   
   Logo/Branding: Corner placement
   ```
6. Download as JPG
7. Compress at: **https://tinypng.com** (get under 300KB)
8. Save as: `og-image.jpg`
9. Place in root folder

#### **Option B: Photoshop/Figma (Advanced)**
1. Create 1200x630px canvas
2. Use brand colors and fonts
3. Include:
   - Studio name prominently
   - Tagline
   - Best visual work
   - High contrast for mobile visibility
4. Export as JPG, 80% quality
5. Compress at TinyPNG

### **Preview Your OG Image:**
Test how it looks: **https://www.opengraph.xyz/**

### **File Checklist:**
```
/
└── og-image.jpg ✅ (1200x630px, <300KB)
```

### **Already Added to HTML:**
```html
<meta property="og:image" content="https://berserktattoos.com/og-image.jpg">
```

---

## 📸 **3. PORTFOLIO & ARTIST IMAGES (20 minutes)**

### **Required Images: 27 Total**

#### **Artist Portraits (3 images)**
```
/images/artists/
├── amelia.jpg ✅ (500x500px)
├── ben.jpg ✅ (500x500px)
└── monique.jpg ✅ (500x500px)
```

**Where to Get:**
1. Visit each artist's Instagram:
   - [@amzkelso](https://www.instagram.com/amzkelso/)
   - [@ben_whiteraven](https://www.instagram.com/ben_whiteraven)
   - [@moniquemoore666](https://www.instagram.com/moniquemoore666/)
2. Download their profile photo or a clear recent portrait
3. Crop to square: 500x500px
4. Compress at TinyPNG
5. Save with naming above

#### **Portfolio Images (24 images - 8 per artist)**
```
/images/portfolio/
├── amelia-1.jpg through amelia-8.jpg ✅
├── ben-1.jpg through ben-8.jpg ✅
└── monique-1.jpg through monique-8.jpg ✅
```

**Selection Criteria:**
- High quality, well-lit photos
- Variety of placements (arm, leg, back, etc.)
- Different sizes (small, medium, large)
- Showcase artist's best work
- Clear, sharp images

**Optimization:**
1. Download 8 best photos per artist from Instagram
2. Resize to max width: 1200px (maintain aspect ratio)
3. Compress at TinyPNG (aim for <300KB each)
4. Name sequentially: `amelia-1.jpg`, `amelia-2.jpg`, etc.
5. Place in `/images/portfolio/` folder

---

## 🔧 **ASSET OPTIMIZATION TOOLS**

### **Image Compression:**
- **TinyPNG:** https://tinypng.com (Best for photos)
- **Squoosh:** https://squoosh.app (More control)
- **ImageOptim:** https://imageoptim.com/mac (Mac app)

### **Favicon Generation:**
- **Favicon.io:** https://favicon.io
- **RealFaviconGenerator:** https://realfavicongenerator.net

### **Design Tools:**
- **Canva:** https://www.canva.com (Free)
- **Figma:** https://www.figma.com (Free for individuals)
- **Photopea:** https://www.photopea.com (Free Photoshop alternative)

### **Image Resizing:**
- **Bulk Resize Photos:** https://bulkresizephotos.com
- **iLoveIMG:** https://www.iloveimg.com/resize-image

---

## ✅ **FINAL ASSET CHECKLIST**

Before deploying, verify you have:

### **Root Folder:**
- [ ] favicon.ico
- [ ] apple-touch-icon.png (180x180)
- [ ] icon-192.png (192x192)
- [ ] icon-512.png (512x512)
- [ ] og-image.jpg (1200x630, <300KB)

### **Artist Images (3):**
- [ ] images/artists/amelia.jpg (500x500)
- [ ] images/artists/ben.jpg (500x500)
- [ ] images/artists/monique.jpg (500x500)

### **Portfolio Images (24):**
- [ ] images/portfolio/amelia-1.jpg through amelia-8.jpg (8 images)
- [ ] images/portfolio/ben-1.jpg through ben-8.jpg (8 images)
- [ ] images/portfolio/monique-1.jpg through monique-8.jpg (8 images)

### **Total Files Created:**
- **Icons:** 4 files
- **OG Image:** 1 file
- **Photos:** 27 files
- **TOTAL:** 32 new asset files

---

## 🚨 **COMMON MISTAKES TO AVOID**

1. **❌ Wrong image sizes** → Use exact dimensions specified
2. **❌ Large file sizes** → Compress everything at TinyPNG
3. **❌ Wrong file names** → Must match exactly (case-sensitive!)
4. **❌ Wrong folder locations** → Follow structure precisely
5. **❌ Low quality images** → Use high-res originals, then compress
6. **❌ Inconsistent aspect ratios** → Artist portraits must be square

---

## ⏱️ **TIME ESTIMATES**

- **Favicon/Icons:** 5 minutes (using generator)
- **OG Image:** 10 minutes (using Canva template)
- **Portfolio Images:** 20 minutes (download + optimize)
- **TOTAL:** 35 minutes

---

## 📞 **NEED HELP?**

### **For Favicon Issues:**
- Test at: https://realfavicongenerator.net/favicon_checker

### **For OG Image Preview:**
- Test at: https://www.opengraph.xyz/
- Facebook debugger: https://developers.facebook.com/tools/debug/

### **For Image Optimization:**
- All images should be <300KB each
- Use TinyPNG for batch compression
- Maintain quality while reducing size

---

## 🎯 **QUICK WORKFLOW**

1. **Generate Favicon** (favicon.io) → 5 mins
2. **Create OG Image** (Canva) → 10 mins
3. **Download Artist Photos** (Instagram) → 5 mins
4. **Download Portfolio Photos** (Instagram) → 10 mins
5. **Optimize All Images** (TinyPNG) → 5 mins
6. **Organize into Folders** → 2 mins

**Total: 37 minutes**

---

**Once you have all these assets, you're 100% ready to deploy!**