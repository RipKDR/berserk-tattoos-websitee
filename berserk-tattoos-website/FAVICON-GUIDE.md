# Favicon Generation Guide

## Required Files (5 files total)

### 1. favicon.ico

- **Size:** 32x32px (standard) or multi-resolution
- **Format:** .ico file
- **Design:** Letter "B" in #7B1113 (red) on #111111 (dark) background
- **Font:** Cinzel Bold or similar serif

### 2. apple-touch-icon.png

- **Size:** 180x180px
- **Format:** PNG
- **Design:** Same as favicon but larger
- **Usage:** iOS/Safari bookmarks and home screen

### 3. android-chrome-192x192.png

- **Size:** 192x192px
- **Format:** PNG
- **Design:** Same design
- **Usage:** Android devices

### 4. android-chrome-512x512.png

- **Size:** 512x512px
- **Format:** PNG
- **Design:** Same design
- **Usage:** High-resolution Android devices, PWA

### 5. og-image.jpg

- **Size:** 1200x630px (exact)
- **Format:** JPG
- **Design:** Social media preview image
- **Content:** Studio name "BERSERK TATTOOS", tagline, dark aesthetic
- **File size:** <300KB

## Quick Generation Methods

### Method 1: Use Favicon.io (Recommended - 5 minutes)

1. Go to https://favicon.io/favicon-generator/
2. Settings:
   - Text: B
   - Background: #111111 (dark)
   - Font Color: #7B1113 (red)
   - Font Family: Cinzel or similar serif
   - Font Size: 110
   - Shape: Square
3. Click "Download" - gets you files 1-4
4. Rename `android-chrome-192x192.png` and `android-chrome-512x512.png` appropriately
5. Place all files in the root directory

### Method 2: Use Canva for Custom Design (10-15 minutes)

1. Go to https://www.canva.com
2. Create 512x512px design
3. Design your "B" logo with brand colors
4. Download as PNG
5. Go to https://realfavicongenerator.net
6. Upload your PNG
7. Generate all sizes
8. Download and extract to root

### OG Image Creation

1. Go to Canva
2. Search "Facebook Post" or create 1200x630px
3. Design with:
   - Background: Dark (#111111) or dramatic tattoo photo
   - Main text: "BERSERK TATTOOS" (Cinzel Bold, #F2F2F2 or #7B1113)
   - Subtitle: "Melbourne's Premier Tattoo Artists" (Inter, #F2F2F2)
   - Optional: Artist photos or best work
4. Download as JPG
5. Compress at https://tinypng.com (target <300KB)
6. Save as `og-image.jpg` in root

## File Placement

Place all files in the ROOT directory:

```
berserk-tattoos-website/
├── favicon.ico ✓
├── apple-touch-icon.png ✓
├── android-chrome-192x192.png ✓
├── android-chrome-512x512.png ✓
├── og-image.jpg ✓
├── index.html
├── artists.html
├── book.html
└── ...
```

## Testing After Creation

1. **Favicon Test:** Open your site in browser, check tab icon
2. **iOS Test:** Add to home screen on iPhone, check icon
3. **Android Test:** Add to home screen on Android, check icon
4. **OG Image Test:** Share link on Facebook/Twitter, check preview at https://www.opengraph.xyz/

## Estimated Time: 15-20 minutes total

This is the ONLY remaining asset requirement for full production launch!
