# Instagram Feed Integration Implementation Guide

## Overview

This guide provides step-by-step instructions for implementing live Instagram feeds on the Berserk Tattoos website to showcase recent work and increase engagement.

## Implementation Options

### Option 1: Simple Instagram Embeds (Free, 5 minutes)

**Best for:** Quick implementation, individual posts
**Cost:** Free
**Setup Time:** 5 minutes per post

#### Steps:

1. Go to any Instagram post
2. Click ⋯ (three dots) → Embed → Copy embed code
3. Paste into HTML where you want the post to appear

#### Example Implementation:

```html
<!-- Add to artists.html after portfolio section -->
<div class="instagram-section">
  <h3>Latest Instagram Posts</h3>
  <div class="instagram-embeds">
    <!-- Paste Instagram embed code here -->
    <blockquote
      class="instagram-media"
      data-instgrm-permalink="https://www.instagram.com/p/ABC123/"
      data-instgrm-version="14"
    >
      <!-- Instagram embed content -->
    </blockquote>
  </div>
</div>
```

### Option 2: EmbedSocial Widget (Recommended)

**Best for:** Automated feed, multiple posts
**Cost:** Free tier available, $9/month for premium
**Setup Time:** 15 minutes

#### Steps:

1. Sign up at [embedsocial.com](https://embedsocial.com)
2. Connect Instagram Business Account
3. Customize widget appearance:
   - Dark theme to match site
   - 3-column grid layout
   - Hide captions (optional)
   - Show 6-9 latest posts
4. Copy embed code
5. Add to each artist profile section

#### Customization Settings:

```javascript
// EmbedSocial widget configuration
{
    "theme": "dark",
    "columns": 3,
    "posts": 9,
    "hideCaptions": true,
    "showLikes": false,
    "autoUpdate": true
}
```

### Option 3: Custom API Integration (Advanced)

**Best for:** Full control, custom design
**Cost:** Free (with limitations)
**Setup Time:** 2-3 hours

#### Requirements:

- Instagram Basic Display API access
- Server/backend for token handling
- JavaScript knowledge

#### Implementation Steps:

1. **Get Instagram App Credentials**

   - Go to [developers.facebook.com](https://developers.facebook.com)
   - Create new app
   - Add Instagram Basic Display product
   - Get App ID and App Secret

2. **Create Backend Endpoint**

   ```javascript
   // Example Node.js endpoint
   app.get("/api/instagram-feed", async (req, res) => {
     try {
       const response = await fetch(
         `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${ACCESS_TOKEN}`
       );
       const data = await response.json();
       res.json(data);
     } catch (error) {
       res.status(500).json({ error: "Failed to fetch Instagram data" });
     }
   });
   ```

3. **Frontend Implementation**
   ```javascript
   // Fetch and display Instagram posts
   async function loadInstagramFeed() {
     try {
       const response = await fetch("/api/instagram-feed");
       const posts = await response.json();

       const feedContainer = document.getElementById("instagram-feed");
       feedContainer.innerHTML = posts.data
         .map(
           (post) => `
               <div class="instagram-post">
                   <a href="${post.permalink}" target="_blank">
                       <img src="${post.media_url}" alt="${
             post.caption || "Instagram post"
           }">
                   </a>
               </div>
           `
         )
         .join("");
     } catch (error) {
       console.error("Failed to load Instagram feed:", error);
     }
   }
   ```

## Where to Add Instagram Feeds

### 1. Artist Profile Pages (Recommended)

**Location:** After portfolio grid on artists.html
**Content:** Show 6-9 latest posts from each artist
**Benefits:** Shows fresh work, builds trust, encourages follows

```html
<!-- Add to each artist section -->
<div class="artist-instagram">
  <h4>Recent Work on Instagram</h4>
  <div class="instagram-feed" data-artist="amelia">
    <!-- Instagram posts will be loaded here -->
  </div>
  <a href="https://instagram.com/amzkelso" target="_blank" class="follow-btn">
    Follow @amzkelso
  </a>
</div>
```

### 2. Homepage Gallery (Optional)

**Location:** After featured work section
**Content:** Mix posts from all 3 artists
**Benefits:** Dynamic content, shows studio activity

### 3. Dedicated Gallery Page (Future)

**Location:** New page or section
**Content:** Full Instagram gallery with filtering
**Benefits:** Comprehensive showcase, SEO benefits

## Styling Instagram Feeds

### CSS for Instagram Embeds

```css
.instagram-section {
  margin: 3rem 0;
  text-align: center;
}

.instagram-section h3 {
  font-family: "Cinzel", serif;
  font-size: 1.5rem;
  color: var(--light-text);
  margin-bottom: 2rem;
}

.instagram-embeds {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

/* Dark theme for Instagram embeds */
.instagram-media {
  background: #1a1a1a !important;
  border: 1px solid rgba(242, 242, 242, 0.1) !important;
  border-radius: 8px !important;
}

.follow-btn {
  display: inline-block;
  background: var(--primary-red);
  color: var(--light-text);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.follow-btn:hover {
  background: #9b1515;
  transform: translateY(-2px);
}
```

## Performance Considerations

### Optimization Tips:

1. **Lazy Loading:** Load Instagram feeds only when visible
2. **Limit Posts:** Show maximum 9 posts per feed
3. **Image Optimization:** Use Instagram's CDN (automatic)
4. **Caching:** Cache API responses for 1 hour
5. **Error Handling:** Show fallback content if feed fails

### Lazy Loading Implementation:

```javascript
// Intersection Observer for lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadInstagramFeed(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".instagram-feed").forEach((feed) => {
  observer.observe(feed);
});
```

## Privacy & Legal Considerations

### Important Notes:

- Ensure you have permission to display client tattoos
- Instagram's embed feature includes their tracking
- Consider GDPR compliance if serving EU visitors
- Add to privacy policy if implemented
- Respect Instagram's Terms of Service

### Privacy Policy Addition:

```text
Instagram Integration: We may display your tattoo photos on our website if you've tagged us or given permission. You can request removal at any time by contacting us.
```

## Implementation Timeline

### Phase 1: Quick Start (Week 1)

- [ ] Add 3-5 Instagram embeds to each artist page
- [ ] Style embeds to match website theme
- [ ] Test on mobile devices
- [ ] Add follow buttons

### Phase 2: Automation (Week 2-3)

- [ ] Set up EmbedSocial widget
- [ ] Configure automatic updates
- [ ] Add to homepage
- [ ] Monitor performance

### Phase 3: Advanced (Month 2)

- [ ] Consider custom API integration
- [ ] Add filtering by artist
- [ ] Implement lazy loading
- [ ] Add analytics tracking

## Troubleshooting

### Common Issues:

1. **Posts not loading:** Check Instagram account is public
2. **Styling conflicts:** Use !important for Instagram CSS overrides
3. **Mobile issues:** Test on actual devices, not just browser dev tools
4. **Performance:** Limit number of posts, implement lazy loading

### Support Resources:

- [Instagram Embed Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- [EmbedSocial Support](https://embedsocial.com/support)
- [Instagram Terms of Service](https://help.instagram.com/581066165581870)

## Success Metrics

### Track These KPIs:

- **Engagement:** Click-through rate on Instagram posts
- **Followers:** Increase in Instagram followers
- **Bookings:** Conversion rate from Instagram traffic
- **Performance:** Page load time impact

### Google Analytics Events:

```javascript
// Track Instagram interactions
gtag("event", "instagram_post_click", {
  event_category: "social_media",
  event_label: "Artist Feed",
});

gtag("event", "instagram_follow_click", {
  event_category: "social_media",
  event_label: "Follow Button",
});
```

## Conclusion

Instagram feed integration is a powerful way to:

- Showcase recent work
- Build trust with potential clients
- Increase social media following
- Improve SEO with fresh content
- Reduce bounce rate

Start with simple embeds for quick wins, then consider automated solutions as your needs grow.

---

**Next Steps:**

1. Choose implementation method
2. Set up Instagram Business accounts
3. Add feeds to artist pages
4. Monitor performance and engagement
5. Iterate based on results
