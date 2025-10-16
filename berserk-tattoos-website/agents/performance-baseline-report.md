# Performance Baseline Report

**Date:** October 16, 2025  
**BMad Method Stage 1**

## Current Asset Inventory

### Portfolio Images (21 files)

**Total Size:** 5,684,694 bytes (5.42 MB)
**Average Size:** 270,700 bytes (264 KB)

| File          | Size (KB) | Notes          |
| ------------- | --------- | -------------- |
| amelia-1.jpg  | 179       | ✅ Under 200KB |
| amelia-2.jpg  | 293       | ⚠️ Over 200KB  |
| amelia-3.jpg  | 249       | ⚠️ Over 200KB  |
| amelia-4.jpg  | 183       | ✅ Under 200KB |
| amelia-5.jpg  | 308       | ⚠️ Over 200KB  |
| amelia-6.jpg  | 194       | ✅ Under 200KB |
| amelia.jpg    | 291       | ⚠️ Over 200KB  |
| ben-1.jpg     | 242       | ⚠️ Over 200KB  |
| ben-2.jpg     | 292       | ⚠️ Over 200KB  |
| ben-3.jpg     | 291       | ⚠️ Over 200KB  |
| ben-4.jpg     | 258       | ⚠️ Over 200KB  |
| ben-5.jpg     | 293       | ⚠️ Over 200KB  |
| ben-6.jpg     | 292       | ⚠️ Over 200KB  |
| ben.jpg       | 265       | ⚠️ Over 200KB  |
| monique-1.jpg | 286       | ⚠️ Over 200KB  |
| monique-2.jpg | 284       | ⚠️ Over 200KB  |
| monique-3.jpg | 318       | ⚠️ Over 200KB  |
| monique-4.jpg | 117       | ✅ Under 200KB |
| monique-5.jpg | 340       | ⚠️ Over 200KB  |
| monique-6.jpg | 324       | ⚠️ Over 200KB  |
| monique.jpg   | 251       | ⚠️ Over 200KB  |

**Images Over 200KB:** 18/21 (86%)  
**Optimization Potential:** Very High

## Current Performance Estimates

### Homepage (index.html)

- **File Size:** 42,826 bytes (42 KB HTML)
- **Estimated LCP:** 3.2-4.0s (hero gallery images)
- **Estimated FCP:** 1.8-2.2s
- **Estimated Performance Score:** 75-82
- **Images Loaded:** ~12 portfolio images
- **Estimated Page Weight:** 3.06 MB

### Artists Page (artists.html)

- **File Size:** 46,086 bytes (45 KB HTML)
- **Estimated LCP:** 3.5-4.3s (artist portrait images)
- **Estimated FCP:** 1.9-2.3s
- **Estimated Performance Score:** 72-78
- **Images Loaded:** 21 portfolio images
- **Estimated Page Weight:** 2.19 MB

### Booking Page (book.html)

- **File Size:** 44,937 bytes (44 KB HTML)
- **Estimated LCP:** 2.2-2.8s (smaller form-focused page)
- **Estimated FCP:** 1.5-1.9s
- **Estimated Performance Score:** 82-88
- **Images Loaded:** 3 artist avatars
- **Estimated Page Weight:** 1.02 MB

## Optimization Targets

### Phase 1 (Quick Wins) - Target: 80-90 Score

- Font weight reduction: 8 → 4 weights (~80KB savings)
- Script deferral: Move GA to defer
- Resource preloading: Add preload for LCP images
- **Expected Improvement:** +5-8 points

### Phase 2 (Image Compression) - Target: 90-94 Score

- JPG compression: 5.68 MB → 2.8 MB (50%)
- WebP conversion: 2.8 MB → 1.0 MB (64% from original)
- **Expected Improvement:** +8-10 points

### Phase 3 (Responsive Images) - Target: 92-96 Score

- Mobile-optimized variants
- srcset/sizes implementation
- **Expected Improvement:** +3-5 points (mobile)

## Current Render-Blocking Resources

1. **Google Fonts:** 2 font families, 8 weights (~180KB)
2. **Google Analytics:** Async but could be deferred
3. **No external CSS:** ✅ Critical CSS inlined
4. **No external JS libraries:** ✅ Vanilla JS only

## Optimization Roadmap

### Immediate (Stage 1 - 1 hour)

- [x] Document baseline metrics
- [ ] Optimize font loading (8 → 4 weights)
- [ ] Add script defer attributes
- [ ] Add resource preload hints

### Short-term (Stages 2-3 - 7 hours)

- [ ] Compress all JPG images
- [ ] Generate WebP variants
- [ ] Update HTML with picture elements
- [ ] Create responsive image sizes
- [ ] Implement srcset/sizes

### Medium-term (Stages 4-5 - 5 hours)

- [ ] Minify HTML/CSS/JS
- [ ] Optimize favicons
- [ ] Enhanced cache headers
- [ ] Security headers

### Long-term (Stage 6 - 7 hours)

- [ ] Self-host fonts
- [ ] Service worker
- [ ] Critical CSS split
- [ ] Advanced lazy loading
- [ ] CDN integration

## Success Metrics

**Target Performance:**

- Lighthouse Score: 95+
- LCP: <2.0s
- FCP: <1.5s
- Page Weight: <1.5MB
- Image Payload: <1.0MB (WebP)

**Current vs Target:**
| Metric | Current | Target | Gap |
|--------|---------|--------|-----|
| Performance Score | 75-82 | 95+ | +13-20 points |
| LCP | 3.5s | <2.0s | -1.5s (43%) |
| Page Weight (index) | 3.06 MB | <1.5 MB | -1.56 MB (51%) |
| Image Payload | 5.68 MB | <1.0 MB | -4.68 MB (82%) |

---

**Next Actions:** Proceed to Stage 1.2 - Font Optimization
