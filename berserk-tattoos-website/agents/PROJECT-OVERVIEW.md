# Berserk Tattoos - Project Overview

## Executive Summary

**Project Type:** Tattoo Studio Website  
**Primary Goal:** Convert visitors → booked consultations  
**Target Audience:** 25-40, alt culture, values craftsmanship  
**Brand Position:** Rebellious yet refined, cinematic, high-end  
**Development Status:** 70% complete (all code done, assets needed)

---

## Business Objectives

### Primary Metrics
1. **Booking conversion rate** - Goal: 8-12% of visitors
2. **Artist portfolio engagement** - Goal: 3+ minutes per session
3. **Mobile conversion** - Goal: Match or exceed desktop
4. **Form completion rate** - Goal: 65%+

### Secondary Metrics
- Time on site
- Portfolio image views
- Artist page navigation patterns
- Contact form submissions
- Social media clicks

---

## Brand Identity

### Core Attributes
- **Rebellious** - Bold, unapologetic, pushes boundaries
- **Refined** - High-end, meticulous craft, attention to detail
- **Cinematic** - Film noir aesthetics, dramatic lighting, storytelling
- **Authentic** - Real work, real artists, no stock imagery

### Design Philosophy
"Where film noir meets fine art tattoo craft"

**Visual Language:**
- Dark, moody backgrounds (#111111)
- High contrast lighting
- Film grain textures
- Dramatic shadows
- Clean, bold typography
- Cinematic photography

**UX Philosophy:**
- Mobile-first (60% traffic)
- Storytelling through scroll
- Artist personality showcased
- Frictionless booking
- Trust through transparency

---

## Site Architecture

```
Berserk Tattoos
├── Home (/)
│   ├── Hero - Studio introduction
│   ├── Artist Preview - Quick intro to all 3
│   ├── Featured Work - Gallery grid
│   └── Booking CTA - Direct conversion path
│
├── Artists (/artists)
│   ├── Navigation Tabs - Amelia | Ben | Monique
│   ├── Artist Profile Sections
│   │   ├── Hero Image
│   │   ├── Bio & Specialty
│   │   ├── Portfolio Gallery (filterable)
│   │   └── Booking CTA
│   └── Footer
│
├── Booking (/booking)
│   ├── Progress Steps (1-4)
│   ├── Artist Selection Cards
│   ├── Form Fields
│   │   ├── Personal Details
│   │   ├── Design Brief
│   │   ├── Reference Upload
│   │   └── Placement/Size
│   ├── Live Summary Sidebar
│   └── Submit Confirmation
│
├── About (/about)
│   ├── Studio Story
│   ├── Philosophy
│   ├── Process Overview
│   └── Team Photo
│
└── Contact (/contact)
    ├── Contact Form
    ├── Studio Location
    ├── Hours & Parking
    └── Social Links
```

---

## The Three Artists

### Amelia Kelso - Fine Line Specialist
**Brand:** Delicate precision, botanical elegance  
**Style:** Fine line, minimal, botanical, geometric  
**Personality:** Meticulous, patient, detail-obsessed  
**Portfolio Focus:** Wrist pieces, ankle work, delicate florals  
**Booking Appeal:** "Perfect for first-timers"

**Target Client:**
- Age: 25-35
- Style: Minimalist, natural aesthetic
- Pain tolerance: Lower (smaller pieces)
- Design preference: Simple, elegant, meaningful

### Ben White Raven - Realism Master
**Brand:** Hyperrealism, photographic precision  
**Style:** Portrait realism, wildlife, photo realism  
**Personality:** Technical perfectionist, 15+ years experience  
**Portfolio Focus:** Full sleeves, large-scale portraits, wildlife  
**Booking Appeal:** "Living photographs on skin"

**Target Client:**
- Age: 30-45
- Style: Classic, timeless work
- Pain tolerance: High (large pieces, long sessions)
- Design preference: Detailed, personal, memorial

### Monique Moore - Bold Blackwork
**Brand:** Dark aesthetic, graphic power  
**Style:** Blackwork, tribal fusion, dotwork, illustrative  
**Personality:** Bold, fearless, avant-garde  
**Portfolio Focus:** Full coverage, bold statements, dark themes  
**Booking Appeal:** "For those who go all in"

**Target Client:**
- Age: 25-40
- Style: Alternative, bold self-expression
- Pain tolerance: High (solid black, large coverage)
- Design preference: Graphic, statement pieces

---

## User Journeys

### Journey 1: First-Time Researcher
**Entry:** Google search "fine line tattoo Melbourne"  
**Path:** Home → Artists (Amelia) → Portfolio scroll → Booking  
**Goal:** Build confidence, see artist skill, understand process  
**Critical Moments:**
- Portfolio quality drives trust
- Bio builds connection
- Clear pricing/timeline reduces anxiety
- Simple booking form = conversion

**Optimization Priorities:**
1. High-quality portfolio images (load fast, look stunning)
2. Clear artist specialties upfront
3. Testimonials/social proof
4. Mobile-optimized booking form

### Journey 2: Returning Client
**Entry:** Direct URL or bookmark  
**Path:** Artists → New work check → Booking (pre-filled)  
**Goal:** Book follow-up session quickly  
**Critical Moments:**
- Fast access to specific artist
- See new portfolio work
- Streamlined rebooking

**Optimization Priorities:**
1. Artist-direct URLs (e.g., /artists#ben)
2. "Recent Work" section
3. Form autofill for returning visitors
4. Session history tracking (future feature)

### Journey 3: Style Explorer
**Entry:** Instagram → Artists page  
**Path:** Artists → Compare all 3 → Portfolio filtering → Booking  
**Goal:** Find right artist for their style preference  
**Critical Moments:**
- Easy artist comparison
- Portfolio filtering by style
- Clear differentiation between artists

**Optimization Priorities:**
1. Side-by-side artist comparison
2. Style tag system (fine line, realism, blackwork)
3. Cross-artist portfolio browsing
4. Style quiz (future feature)

---

## Technical Foundation

**Stack:** Static HTML/CSS/JavaScript  
**Why:** Fast, simple, no backend needed, easy to maintain  
**Hosting:** Netlify (recommended) - free tier, instant deploys  
**Forms:** Formspree - handles submissions, sends to studio email  
**Analytics:** Google Analytics 4 (to be implemented)  
**CMS:** None (direct file editing) - future: Netlify CMS consideration

**Performance Targets:**
- <3s initial load time
- <1s subsequent navigation
- 90+ Lighthouse performance score
- Mobile optimized (60% of traffic)

**Browser Support:**
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

---

## Content Strategy

### Photography Requirements
**Quantity:** 32 images minimum  
**Quality:** Professional, high-res (min 1920px width)  
**Style:** Cinematic, dramatic lighting, film grain effect  
**Subject:** Real work only, no stock images

**Image Categories:**
1. **Hero Images** (3) - One per artist, moody studio shots
2. **Portfolio Work** (24) - 8 per artist, actual tattoos
3. **Artist Portraits** (3) - Professional headshots
4. **Studio Shots** (2) - Space, ambiance, equipment

**Image Guidelines:**
- Format: WebP (with JPG fallback)
- Resolution: 1920x1080 for hero, 800x800 for portfolio
- Optimization: <200KB per image after compression
- Alt text: Descriptive (e.g., "Fine line botanical forearm tattoo by Amelia")
- Naming: Consistent (artist-style-placement-001.webp)

### Copy Tone
**Voice:** Confident, authentic, slightly edgy  
**Tone Spectrum:**
- Homepage: Bold, inviting
- Artist Bios: Personal, credible
- Booking: Clear, reassuring
- About: Storytelling, philosophical

**Writing Rules:**
- Short sentences
- Active voice
- No corporate speak
- Real talk (e.g., "This will hurt" not "mild discomfort")
- Specific details beat vague claims
- Show expertise through knowledge, not boasting

---

## Competitive Positioning

### Direct Competitors (Melbourne)
1. **Hunter & Fox** - Premium, established, traditional
2. **Black Mark** - Bold, street culture focus
3. **Silk Road** - Diverse styles, large team

### Our Differentiation
1. **Artist Specialization** - Each artist = distinct brand
2. **Cinematic Aesthetic** - Unique visual identity in market
3. **Streamlined Booking** - Easiest booking experience
4. **Storytelling Focus** - More than just portfolio
5. **Mobile Experience** - Best mobile UX in Melbourne

### Market Position
**Price Tier:** Premium ($200-300/hour range)  
**Quality Level:** Top 10% in Melbourne  
**Brand Perception:** Rebellious luxury  
**Target Share:** Alternative/creative professionals willing to invest

---

## Future Roadmap

### Phase 1: MVP (Current)
- [x] Core pages built (Home, Artists, Booking, About, Contact)
- [x] Responsive design implemented
- [x] Booking form functional
- [ ] Professional photography added
- [ ] Formspree integration configured
- [ ] Deploy to Netlify

### Phase 2: Optimization (Weeks 2-4)
- [ ] Analytics integration
- [ ] A/B test booking form variations
- [ ] Add artist availability calendar
- [ ] Implement lazy loading
- [ ] Add microinteractions
- [ ] SEO optimization
- [ ] Social media integration

### Phase 3: Enhancement (Months 2-3)
- [ ] Client testimonials section
- [ ] FAQ page
- [ ] Aftercare guide
- [ ] Blog/news section
- [ ] Email newsletter signup
- [ ] Instagram feed integration

### Phase 4: Advanced Features (Months 4-6)
- [ ] Online deposit payments
- [ ] Appointment scheduling system
- [ ] Client portal (view appointments, aftercare, etc.)
- [ ] Artist individual booking systems
- [ ] CMS for easier content updates
- [ ] Advanced analytics dashboard

---

## Success Criteria

### Launch Ready Checklist
- [ ] All 32 images sourced and optimized
- [ ] Formspree configured and tested
- [ ] All links working (internal + social)
- [ ] Mobile responsive on iPhone + Android
- [ ] Contact form submitting correctly
- [ ] Artist bios finalized and approved
- [ ] Legal pages (Privacy, Terms) added
- [ ] Analytics tracking code installed
- [ ] Sitemap.xml submitted to Google
- [ ] 404 page created
- [ ] Favicon and social share images set

### Month 1 Goals
- 500+ unique visitors
- 40+ booking inquiries
- 8-12% conversion rate
- <5s average load time
- 0 critical bugs reported

### Quarter 1 Goals
- 2,000+ unique visitors/month
- 150+ booking inquiries
- 10-15% conversion rate
- Top 3 Google ranking for "tattoo Melbourne [style]"
- 5+ positive reviews collected

---

## Risk Mitigation

### Technical Risks
**Risk:** Image load times impact conversion  
**Mitigation:** WebP format, lazy loading, CDN, <200KB per image

**Risk:** Form spam submissions  
**Mitigation:** Formspree honeypot, reCAPTCHA integration

**Risk:** Mobile performance issues  
**Mitigation:** Mobile-first design, performance testing on real devices

### Business Risks
**Risk:** Artists don't update portfolios regularly  
**Mitigation:** Quarterly content calendar, simple upload process

**Risk:** Booking form abandonment  
**Mitigation:** Progress indicator, save draft functionality (future)

**Risk:** Poor artist differentiation  
**Mitigation:** Distinct visual branding per artist, clear style examples

---

## Key Files Reference

**Source Conversation:** "Berserk tattoos website redesign" (Oct 8, 2025)  
**GitHub Repository:** [To be created]  
**Deployment URL:** [To be configured]  
**Analytics Dashboard:** [To be set up]  
**Asset Library:** [To be organized]

---

## Project Contacts

**Client:** Berserk Tattoos Studio  
**Project Manager:** [Your name]  
**Developer:** Cursor AI Agent  
**Designer:** [Based on wireframes from conversation]  
**Content:** [Studio team to provide]

---

## Notes for Cursor Agent

1. **This is a real business** - Code quality and conversion rate directly impact revenue
2. **Mobile is primary** - 60% of traffic, optimize mobile experience first
3. **Artists are the brand** - Each artist needs distinct personality in design
4. **Booking is critical** - Every UX decision should facilitate conversion
5. **Performance = trust** - Slow site = lost bookings
6. **No placeholders** - Every element should be production-ready

**When in doubt:** Prioritize conversion over creativity, mobile over desktop, speed over features.

---

**Last Updated:** October 16, 2025  
**Version:** 1.0  
**Status:** Active Development