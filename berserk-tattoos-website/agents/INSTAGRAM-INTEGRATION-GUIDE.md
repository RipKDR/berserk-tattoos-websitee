# Instagram Integration Guide

## Adding Live Instagram Feeds to Artist Pages

### Option 1: Simple Embed (Free, 5 minutes)

1. **Get Instagram Post Embed Code**
   - Go to any Instagram post
   - Click ⋯ (three dots) → Embed → Copy embed code
   - Paste into artist section of HTML

Example placement in artists.html:

```html
<div class="portfolio-section">
  <h3>Latest Instagram Posts</h3>
  <div class="instagram-feed">
    <!-- Paste Instagram embed code here -->
  </div>
</div>
```

### Option 2: EmbedSocial Widget (Free tier available)

1. **Sign up at embedsocial.com**
2. **Connect Instagram Business Account**
3. **Customize widget appearance:**
   - Dark theme to match site
   - 3-column grid
   - Hide captions (optional)
4. **Copy embed code**
5. **Add to each artist profile section**

### Option 3: Custom API Integration (Advanced)

**Requirements:**

- Instagram Basic Display API access
- Server/backend for token handling
- JavaScript knowledge

**Not recommended for initial launch** - adds complexity without significant benefit over embed options.

### Where to Add Instagram Feeds

1. **Artist Profile Pages** (Recommended)

   - Add after portfolio grid
   - Show 6-9 latest posts
   - Updates automatically

2. **Homepage Gallery** (Optional)

   - Mix posts from all 3 artists
   - Requires aggregation tool

3. **Dedicated Gallery Page** (Future)
   - Full Instagram gallery
   - Filterable by artist

### Styling Instagram Embeds

Add to your CSS:

```css
.instagram-feed {
  margin: 3rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

/* Dark theme for Instagram embeds */
.instagram-media {
  background: #1a1a1a !important;
  border: 1px solid rgba(242, 242, 242, 0.1) !important;
}
```

### Performance Considerations

- Instagram embeds can slow page load
- Use lazy loading for embeds below fold
- Consider loading on user interaction
- Limit to 6-9 posts per page

### Privacy & Legal

- Ensure you have permission to display client tattoos
- Instagram's embed feature includes their tracking
- Consider GDPR compliance if serving EU visitors
- Add to privacy policy if implemented

### Quick Implementation (After Launch)

1. **Week 2-3:** Add simple embeds to test engagement
2. **Month 2:** Evaluate metrics, consider widget service
3. **Month 3:** Full integration if justified by data

---

**Current Status:** Not implemented (not required for launch)
**Priority:** Medium (nice-to-have enhancement)
**Time to Implement:** 30 minutes for basic embeds
**Impact:** Increases engagement, shows fresh content
