# Image Optimization Guide - Berserk Tattoos

## Current Status
✅ 21 portfolio images integrated
⏳ Images need optimization for web performance

## Optimization Checklist

### Step 1: Convert to WebP Format
**Why:** WebP provides 25-35% smaller file sizes than JPEG with same quality

**Tools:**
- Online: [Squoosh.app](https://squoosh.app/) (Google's free tool)
- Bulk: [XnConvert](https://www.xnview.com/en/xnconvert/) (free, batch processing)
- CLI: `cwebp input.jpg -q 85 -o output.webp`

**Settings:**
- Quality: 85 (optimal balance)
- Target: <150KB per image
- Keep original JPEGs as fallback

**Process for each image:**
```bash
# For portfolio images
cd images/portfolio
cwebp amelia-1.jpg -q 85 -o amelia-1.webp
cwebp amelia-2.jpg -q 85 -o amelia-2.webp
# ... repeat for all 21 images
```

### Step 2: Create Responsive Sizes
**Create 3 sizes for each image:**
- Small: 640w (mobile)
- Medium: 1024w (tablet)
- Large: 1920w (desktop)

**Tools:**
- Online: [Squoosh.app](https://squoosh.app/)
- Bulk: [ImageMagick](https://imagemagick.org/)

**CLI Example:**
```bash
# Create responsive sizes
convert amelia-1.jpg -resize 640x amelia-1-sm.jpg
convert amelia-1.jpg -resize 1024x amelia-1-md.jpg
convert amelia-1.jpg -resize 1920x amelia-1-lg.jpg

# Then convert to WebP
cwebp amelia-1-sm.jpg -q 85 -o amelia-1-sm.webp
cwebp amelia-1-md.jpg -q 85 -o amelia-1-md.webp
cwebp amelia-1-lg.jpg -q 85 -o amelia-1-lg.webp
```

### Step 3: Optimize Existing JPEGs
**For fallback support:**
- Use [TinyJPG](https://tinyjpg.com/) or [Squoosh](https://squoosh.app/)
- Target: <200KB per file
- Quality: 80-85

### Step 4: Create OG Image
**Social media preview image:**
- Size: 1200x630px
- Format: JPG or PNG
- File: `og-image.jpg`
- Content ideas:
  - Studio logo + "Melbourne's Premier Tattoo Studio"
  - Collage of best portfolio pieces
  - Dark background (#111111) with brand aesthetic

**Template structure:**
```
[Background: Dark (#111111)]
[Top: "BERSERK TATTOOS" in Cinzel font]
[Center: 3-4 portfolio image thumbnails]
[Bottom: "Melbourne's Master Artists"]
```

### Step 5: Create Favicon Set
**Required files:**
- `favicon.ico` (32x32, 16x16 multi-size)
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png` (192x192)
- `android-chrome-512x512.png` (512x512)
- `favicon-16x16.png` (16x16)
- `favicon-32x32.png` (32x32)

**Quick Method:**
1. Create master logo: 512x512px PNG
2. Use [RealFaviconGenerator](https://realfavicongenerator.net/)
3. Upload master logo
4. Download generated package
5. Replace existing placeholder files

**Design Ideas:**
- Minimalist "B" monogram
- Ink drop icon
- Tattoo machine silhouette
- Keep colors: Black (#111111) + Deep Red (#7B1113)

---

## HTML Implementation (After Optimization)

### Current Implementation (Background Images)
```html
<!-- Current -->
<div class="gallery-item" style="background: url('/images/portfolio/amelia-1.jpg') center/cover;"></div>
```

### Optimized Implementation (With WebP + Responsive)
```html
<!-- Optimized with WebP fallback -->
<picture>
  <source 
    type="image/webp"
    srcset="/images/portfolio/amelia-1-sm.webp 640w,
            /images/portfolio/amelia-1-md.webp 1024w,
            /images/portfolio/amelia-1-lg.webp 1920w"
    sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px">
  <source 
    type="image/jpeg"
    srcset="/images/portfolio/amelia-1-sm.jpg 640w,
            /images/portfolio/amelia-1-md.jpg 1024w,
            /images/portfolio/amelia-1-lg.jpg 1920w"
    sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px">
  <img 
    src="/images/portfolio/amelia-1.jpg" 
    alt="Fine line tattoo work by Amelia Kelso"
    loading="lazy"
    class="gallery-img">
</picture>
```

### Hybrid Approach (Keep Background Style, Add WebP Support)
Since site uses `background-image` for design consistency, use this pattern:

```javascript
// In JavaScript - detect WebP support and update all backgrounds
function supportsWebP() {
  const canvas = document.createElement('canvas');
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

if (supportsWebP()) {
  // Replace .jpg with .webp in all background-image URLs
  document.querySelectorAll('[style*="background"]').forEach(el => {
    const style = el.getAttribute('style');
    if (style.includes('.jpg')) {
      el.setAttribute('style', style.replace(/\.jpg/g, '.webp'));
    }
  });
}
```

---

## Performance Targets

### Current Estimates (Without Optimization)
- Portfolio images: ~300-500KB each × 21 = **6-10MB total**
- Homepage initial load: ~3-4MB
- Artists page: ~2-3MB
- Load time: 5-8s on 3G

### After Optimization Targets
- Portfolio images: ~100-150KB each × 21 = **2-3MB total**
- Homepage initial load: ~800KB-1.2MB
- Artists page: ~600KB-1MB
- Load time: 2-3s on 3G
- **60-70% reduction in data transfer**

### Lighthouse Score Targets
- Performance: 90-95+ (up from ~75)
- Best Practices: 95+ (up from ~85)
- SEO: 100 (maintain)
- Accessibility: 95+ (maintain)

---

## Quick Start Guide

### Option 1: Online Tools (No Installation)
1. Go to [Squoosh.app](https://squoosh.app/)
2. Drag and drop each image
3. Select "WebP" as format
4. Set quality to 85
5. Compare file sizes (should see 30-40% reduction)
6. Download optimized images
7. Replace in `/images/portfolio/` folder

### Option 2: Batch Processing (Faster for 21 images)
1. Download [XnConvert](https://www.xnview.com/en/xnconvert/)
2. Add all 21 images from `/images/portfolio/`
3. Actions tab → Add Action → "Convert Format"
4. Choose WebP, Quality 85
5. Output: Same folder, append ".webp" to filename
6. Click "Convert"
7. Done in 2 minutes!

### Option 3: Command Line (For Developers)
```bash
# Install cwebp (Google's WebP encoder)
# macOS: brew install webp
# Ubuntu: sudo apt-get install webp
# Windows: Download from Google WebP site

# Navigate to images folder
cd berserk-tattoos-website/images/portfolio

# Batch convert all JPGs to WebP
for file in *.jpg; do
  cwebp "$file" -q 85 -o "${file%.jpg}.webp"
done

# Check file sizes
ls -lh *.webp
```

---

## Testing After Optimization

### 1. Visual Quality Check
- Open each WebP in browser
- Compare side-by-side with original
- Ensure no visible degradation
- Check details/fine lines in tattoo work

### 2. File Size Verification
```bash
# Check original sizes
du -h images/portfolio/*.jpg

# Check WebP sizes
du -h images/portfolio/*.webp

# Should see ~30-40% reduction
```

### 3. Browser Testing
- Chrome/Edge: Native WebP support ✓
- Firefox: Native WebP support ✓
- Safari 14+: Native WebP support ✓
- Older browsers: Falls back to JPEG ✓

### 4. Performance Testing
- Run Lighthouse before optimization (baseline)
- Implement WebP + lazy loading
- Run Lighthouse after optimization
- Compare scores

---

## Expected Results

### Before Optimization
- Total image payload: 6-10MB
- First Contentful Paint: 3-4s
- Largest Contentful Paint: 5-6s
- Performance Score: 70-80

### After Optimization
- Total image payload: 2-3MB (**60-70% reduction**)
- First Contentful Paint: 1-2s (**50% faster**)
- Largest Contentful Paint: 2-3s (**40% faster**)
- Performance Score: 90-95 (**15-20 points higher**)

### User Experience Impact
- Mobile users save **4-7MB** data per visit
- Page loads **2-3 seconds faster**
- Reduced bounce rate
- Better SEO rankings
- Lower hosting bandwidth costs

---

## Priority Ranking

### Critical (Do First)
1. ⭐ **Optimize existing 21 JPEGs** → Use TinyJPG
   - Time: 10 minutes
   - Impact: Immediate 30-40% size reduction
   - Difficulty: Easy

2. ⭐ **Create favicon set** → Use RealFaviconGenerator
   - Time: 15 minutes
   - Impact: Professional appearance, no console errors
   - Difficulty: Easy

### High Priority (Do Next)
3. **Convert to WebP** → Use Squoosh or XnConvert
   - Time: 20-30 minutes
   - Impact: Additional 20-30% size reduction
   - Difficulty: Easy

4. **Create OG image** → Use Canva or Photoshop
   - Time: 30 minutes
   - Impact: Better social media sharing
   - Difficulty: Medium

### Nice to Have (Optional)
5. **Responsive sizes** → Use ImageMagick
   - Time: 1 hour
   - Impact: Perfect image sizing per device
   - Difficulty: Medium

6. **Lazy loading enhancement** → Update JavaScript
   - Time: 30 minutes
   - Impact: Faster initial load
   - Difficulty: Medium

---

## File Naming Convention

### Current
```
images/portfolio/
  ├── amelia-1.jpg
  ├── amelia-2.jpg
  └── ... (21 files)
```

### After Optimization (Recommended)
```
images/portfolio/
  ├── amelia-1.jpg          (original/fallback)
  ├── amelia-1.webp         (optimized WebP)
  ├── amelia-1-sm.jpg       (640w mobile)
  ├── amelia-1-sm.webp
  ├── amelia-1-md.jpg       (1024w tablet)
  ├── amelia-1-md.webp
  ├── amelia-1-lg.jpg       (1920w desktop)
  ├── amelia-1-lg.webp
  └── ... (168 files total if doing all sizes)
```

### Minimal Optimization (Recommended for Quick Win)
```
images/portfolio/
  ├── amelia-1.jpg          (optimized with TinyJPG)
  ├── amelia-1.webp         (WebP version)
  └── ... (42 files total)
```

---

## Next Steps

1. **Immediate** (Today):
   - Run all 21 JPEGs through TinyJPG
   - Create favicon using RealFaviconGenerator
   - Replace placeholder favicon files

2. **This Week**:
   - Convert all images to WebP
   - Implement WebP detection JavaScript
   - Create OG image for social sharing

3. **Optional** (Future Enhancement):
   - Create responsive sizes
   - Implement srcset attributes
   - Set up automated image pipeline

---

**Status:** Ready for implementation
**Estimated Time:** 45 minutes for critical tasks
**Expected Performance Gain:** 60-70% faster image loading
**Difficulty:** Easy (mostly using online tools)


