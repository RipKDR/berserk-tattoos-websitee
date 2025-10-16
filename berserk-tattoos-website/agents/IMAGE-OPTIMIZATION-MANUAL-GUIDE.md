# Manual Image Optimization Guide

**BMad Method Stage 2: Image Compression**  
**For users without Node.js/Python installed**

## Overview

This guide will walk you through optimizing all 21 portfolio images using free online tools. The process will:

- Reduce total image size from 5.68 MB to ~1.0 MB (82% reduction)
- Generate WebP versions for modern browsers
- Maintain visual quality
- Take approximately 45-60 minutes

---

## Tools Needed (All Free, No Installation Required)

1. **TinyPNG** - https://tinypng.com/

   - Best for: Batch JPG compression
   - Limit: 20 images at once, max 5MB each
   - Quality: Excellent results

2. **Squoosh** - https://squoosh.app/

   - Best for: WebP conversion and comparison
   - Limit: One image at a time
   - Quality: Maximum control

3. **CloudConvert** - https://cloudconvert.com/
   - Best for: Batch WebP conversion
   - Limit: 25 conversions/day (free tier)
   - Quality: Good, automated

---

## Step-by-Step Process

### Step 1: Backup Original Images (5 minutes)

1. Navigate to: `C:\Users\H\Downloads\berserk-tattoos-website\berserk-tattoos-website\portfolio`
2. Select all 21 JPG files
3. Copy them
4. Create new folder: `portfolio-backup`
5. Paste all files into `portfolio-backup`

✅ **Verification:** You should have 21 files in both `portfolio/` and `portfolio-backup/`

---

### Step 2: Batch Compress JPG Images (15 minutes)

#### Option A: Using TinyPNG (Recommended)

1. Go to https://tinypng.com/
2. Drag and drop all 21 JPG files from your `portfolio/` folder
3. Wait for compression to complete (~2-3 minutes)
4. Click "Download All" button
5. Extract the downloaded ZIP file
6. Copy all compressed JPGs back to your `portfolio/` folder, replacing the originals

**Expected Results:**

- Original: 5.68 MB
- After compression: ~2.8 MB (50% reduction)
- Files remain as JPG

#### Option B: Using ImageOptim (Mac only)

If you're on Mac:

1. Download ImageOptim: https://imageoptim.com/mac
2. Drag your `portfolio/` folder onto ImageOptim
3. Wait for optimization to complete
4. Done! Files are automatically optimized in place

---

### Step 3: Generate WebP Versions (25-30 minutes)

#### Option A: CloudConvert Batch Conversion (Faster - 10 minutes)

1. Go to https://cloudconvert.com/jpg-to-webp
2. Click "Select Files" and choose all 21 compressed JPGs
3. Click the wrench icon ⚙️ next to "Convert"
4. Set quality to 80%
5. Click "Convert"
6. Wait for conversion (~3-5 minutes)
7. Click "Download All"
8. Extract ZIP and copy all `.webp` files to your `portfolio/` folder

**Expected Results:**

- 21 new WebP files alongside your JPGs
- WebP files: ~1.0 MB total (64% smaller than compressed JPGs)

#### Option B: Squoosh Manual Conversion (Slower but more control - 30 minutes)

For each of the 21 images:

1. Go to https://squoosh.app/
2. Drag image onto the page
3. On the right panel, select "WebP" from the dropdown
4. Set quality to 80
5. Set effort to 4 (good balance of size/speed)
6. Click the download button
7. Save as `[original-name].webp` in your `portfolio/` folder

Repeat for all 21 images.

---

### Step 4: Verify Optimization (5 minutes)

Check that you have these files in `portfolio/`:

```
✓ amelia-1.jpg (compressed)
✓ amelia-1.webp (new)
✓ amelia-2.jpg (compressed)
✓ amelia-2.webp (new)
... (repeat for all 21 images)
```

**Total files in portfolio/:** 42 files (21 JPG + 21 WebP)

---

### Step 5: Update HTML Files (15 minutes)

Now we need to update the HTML to use WebP with JPG fallback.

#### Manual Method (No Node.js required)

For each HTML file (`index.html`, `artists.html`, `book.html`):

**Find this pattern:**

```html
<img src="/portfolio/amelia-1.jpg" alt="..." loading="lazy" />
```

**Replace with:**

```html
<picture>
  <source srcset="/portfolio/amelia-1.webp" type="image/webp" />
  <img src="/portfolio/amelia-1.jpg" alt="..." loading="lazy" />
</picture>
```

**OR use Find & Replace:**

1. Open each HTML file in a text editor
2. Find: `<img src="/portfolio/([^"]+)\.jpg"`
3. This is a regex pattern - you'll need a regex-capable editor like VS Code

**Images to update:**

**index.html** (12 images):

- Lines 910-925: Hero gallery (4 images)
- Lines 992-1046: Main gallery (8 images)

**artists.html** (21 images):

- All portfolio grid images

**book.html** (3 images):

- Artist avatar images

---

## Alternative: Automated Method (If Node.js Available)

If you can install Node.js:

1. Download Node.js: https://nodejs.org/ (LTS version)
2. Open Command Prompt in project folder
3. Run: `npm install sharp --save-dev`
4. Run: `node optimize-images.js`
5. Run: `node update-html-images.js`

This will automatically:

- Compress all JPGs
- Generate WebP versions
- Create responsive sizes (480w, 768w, 1200w)
- Update all HTML files

---

## Verification Checklist

After optimization, verify:

- [ ] All 21 JPG images are compressed (check file sizes)
- [ ] All 21 WebP images exist in `portfolio/` folder
- [ ] Total portfolio folder size is ~3.8 MB (2.8 MB JPG + 1.0 MB WebP)
- [ ] HTML files use `<picture>` elements
- [ ] Website still loads correctly (test in browser)
- [ ] Images look good (no visible quality loss)

---

## File Size Expectations

### Before Optimization

| File         | Original Size | Status           |
| ------------ | ------------- | ---------------- |
| amelia-1.jpg | 179 KB        | ✅ OK            |
| amelia-2.jpg | 293 KB        | ⚠️ Large         |
| amelia-3.jpg | 249 KB        | ⚠️ Large         |
| ...          | ...           | ...              |
| **TOTAL**    | **5.68 MB**   | **❌ Too large** |

### After JPG Compression

| File         | Compressed Size | Savings    |
| ------------ | --------------- | ---------- |
| amelia-1.jpg | ~90 KB          | 50%        |
| amelia-2.jpg | ~150 KB         | 49%        |
| amelia-3.jpg | ~125 KB         | 50%        |
| ...          | ...             | ...        |
| **TOTAL**    | **~2.8 MB**     | **50%** ✅ |

### After WebP Generation

| File          | WebP Size   | Savings from JPG |
| ------------- | ----------- | ---------------- |
| amelia-1.webp | ~45 KB      | 50%              |
| amelia-2.webp | ~75 KB      | 50%              |
| amelia-3.webp | ~60 KB      | 52%              |
| ...           | ...         | ...              |
| **TOTAL**     | **~1.0 MB** | **64%** ✅       |

---

## Performance Impact

### Before Optimization

- Homepage load: 3.06 MB
- Artists page load: 2.19 MB
- Lighthouse Performance: 75-82

### After Optimization (WebP-capable browsers)

- Homepage load: ~1.2 MB (61% reduction)
- Artists page load: ~1.0 MB (54% reduction)
- Lighthouse Performance: 88-94 (estimated)

---

## Troubleshooting

### Images Don't Load After Update

**Problem:** Broken image links  
**Solution:** Check that WebP files exist and paths are correct

### WebP Images Don't Show

**Problem:** Browser doesn't support WebP (very old browsers)  
**Solution:** That's OK! The JPG fallback will load automatically

### Images Look Blurry

**Problem:** Quality setting too low  
**Solution:** Re-compress with quality 85 (JPG) or 80 (WebP)

### File Sizes Still Large

**Problem:** Images weren't actually compressed  
**Solution:** Verify you replaced the original files with compressed versions

---

## Next Steps

After completing image optimization:

1. ✅ Mark Stage 2 complete
2. ➡️ Proceed to Stage 3: Responsive Images (optional but recommended)
3. 🧪 Run Lighthouse audit to measure improvement
4. 📊 Compare before/after performance scores

---

## Quick Reference: Command Locations

**Portfolio folder:**

```
C:\Users\H\Downloads\berserk-tattoos-website\berserk-tattoos-website\portfolio\
```

**HTML files:**

```
C:\Users\H\Downloads\berserk-tattoos-website\berserk-tattoos-website\index.html
C:\Users\H\Downloads\berserk-tattoos-website\berserk-tattoos-website\artists.html
C:\Users\H\Downloads\berserk-tattoos-website\berserk-tattoos-website\book.html
```

---

## Time Estimate

- Step 1 (Backup): 5 min
- Step 2 (JPG Compression): 15 min
- Step 3 (WebP Generation): 10-30 min
- Step 4 (Verification): 5 min
- Step 5 (HTML Updates): 15-30 min

**Total: 50-85 minutes** (depending on manual vs automated method)

---

**Ready to optimize?** Start with Step 1: Backup!
