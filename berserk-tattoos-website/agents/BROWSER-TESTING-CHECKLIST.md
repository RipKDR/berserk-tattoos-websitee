# Browser Testing Checklist - Berserk Tattoos

**Use this checklist for manual browser testing to ensure consistency across all platforms.**

---

## Pre-Testing Setup

- [ ] Clear browser cache
- [ ] Disable browser extensions
- [ ] Test in incognito/private mode
- [ ] Check console for errors before starting
- [ ] Note browser version and OS

---

## 🏠 Homepage Testing

### Visual Elements

- [ ] Hero section displays correctly
- [ ] Background gradients render properly
- [ ] Navigation bar is visible and styled
- [ ] Logo displays correctly
- [ ] All images load
- [ ] Fonts load correctly (Cinzel & Inter)
- [ ] Colors match design (#7B1113, #111111, #F2F2F2)

### Layout

- [ ] CSS Grid layouts working (or flexbox fallback)
- [ ] Artists cards aligned properly
- [ ] Gallery grid displays correctly
- [ ] Contact cards layout properly
- [ ] No horizontal scrolling
- [ ] Responsive breakpoints working

### Navigation

- [ ] All navigation links work
- [ ] Smooth scrolling to sections
- [ ] Mobile menu toggle works
- [ ] Navigation hides on scroll down
- [ ] Navigation shows on scroll up
- [ ] Active states display correctly

### Interactions

- [ ] Hover states on buttons
- [ ] Hover states on links
- [ ] Focus states visible (keyboard navigation)
- [ ] Gallery items have hover effect
- [ ] Artist cards are clickable

### Performance

- [ ] Page loads in < 3 seconds
- [ ] No layout shifts during load
- [ ] Images don't block rendering
- [ ] Animations run smoothly

---

## 👥 Artists Page Testing

### Tab Navigation

- [ ] All artist tabs clickable
- [ ] Active tab highlighted
- [ ] Content switches correctly
- [ ] URL updates with hash
- [ ] Direct URL access works (e.g., /artists.html#ben)

### Artist Profiles

- [ ] Profile images load
- [ ] Statistics display correctly
- [ ] Social links work
- [ ] Book button links to correct artist

### Portfolio Grid

- [ ] All portfolio images load
- [ ] Filter buttons work
- [ ] Filtered items hide/show correctly
- [ ] Grid maintains layout when filtering
- [ ] Hover effects on portfolio items

### Sticky Elements

- [ ] Artist navigation stays sticky
- [ ] Proper offset from fixed header
- [ ] No jumping or flickering

---

## 📝 Booking Form Testing

### Form Display

- [ ] All form fields render correctly
- [ ] Labels aligned properly
- [ ] Placeholder text visible
- [ ] Select dropdowns styled

### Artist Selection

- [ ] Artist cards clickable
- [ ] Selected state shows checkmark
- [ ] Only one artist selectable
- [ ] Pre-selection from URL works

### Form Validation

- [ ] Required fields show validation
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Error states display correctly
- [ ] Valid states show green

### Form Functionality

- [ ] All inputs accept text
- [ ] Dropdowns open and close
- [ ] Textarea resizable
- [ ] Tab order logical
- [ ] Form submission works (mailto)

### Dynamic Features

- [ ] Price estimate updates
- [ ] Summary sidebar updates
- [ ] Progress indicators show
- [ ] Success modal displays
- [ ] Modal can be closed

---

## 📱 Mobile-Specific Testing

### Touch Interactions

- [ ] All tap targets >= 44x44px
- [ ] No accidental taps
- [ ] Swipe gestures don't interfere
- [ ] Touch feedback visible

### Mobile Navigation

- [ ] Hamburger menu visible
- [ ] Menu opens/closes smoothly
- [ ] Menu items tappable
- [ ] Menu closes on item tap
- [ ] Body scroll locked when menu open

### Form Inputs

- [ ] No zoom on input focus (iOS)
- [ ] Correct keyboard types show
- [ ] Next/Previous navigation works
- [ ] Done button closes keyboard

### Viewport

- [ ] No horizontal scrolling
- [ ] Content fits viewport
- [ ] Images scale properly
- [ ] Text remains readable

### Orientation

- [ ] Portrait mode works
- [ ] Landscape mode works
- [ ] Smooth transition between
- [ ] Layout adapts correctly

---

## 🎨 CSS Feature Testing

### Modern CSS Features

- [ ] CSS Grid (check fallback if not supported)
- [ ] CSS Variables (check static fallback)
- [ ] Backdrop filter (check solid fallback)
- [ ] Clamp() sizing (check media query fallback)
- [ ] Object-fit (check positioning fallback)

### Animations

- [ ] Fade in animations work
- [ ] Smooth transitions
- [ ] No janky animations
- [ ] Reduced motion respected

### Visual Effects

- [ ] Box shadows render
- [ ] Border radius displays
- [ ] Gradients show correctly
- [ ] Opacity/transparency works

---

## ⚡ Performance Testing

### Load Times

- [ ] Initial page load < 3s
- [ ] Subsequent navigation < 1s
- [ ] Images load progressively
- [ ] No blocking resources

### Network

- [ ] Test on 3G connection
- [ ] Test on 4G connection
- [ ] Test offline behavior
- [ ] Check caching works

### Resource Loading

- [ ] Fonts load and cache
- [ ] Images optimize for device
- [ ] CSS loads without blocking
- [ ] JavaScript doesn't block

---

## ♿ Accessibility Testing

### Keyboard Navigation

- [ ] Tab through all elements
- [ ] Focus indicators visible
- [ ] Skip links work
- [ ] No keyboard traps
- [ ] Modal can be closed with ESC

### Screen Reader

- [ ] Proper heading hierarchy
- [ ] Images have alt text
- [ ] ARIA labels present
- [ ] Form labels associated
- [ ] Error messages announced

### Visual

- [ ] Sufficient color contrast
- [ ] Text remains readable when zoomed
- [ ] Works without color
- [ ] No information by color alone

---

## 🐛 Console & Errors

### JavaScript

- [ ] No console errors
- [ ] No console warnings
- [ ] Polyfills load only when needed
- [ ] Feature detection works

### Network

- [ ] No 404 errors
- [ ] No failed resource loads
- [ ] No CORS errors
- [ ] No mixed content warnings

### Performance

- [ ] No memory leaks
- [ ] No excessive repaints
- [ ] No layout thrashing
- [ ] Smooth 60fps animations

---

## 🌐 Browser-Specific Issues

### Chrome

- [ ] All features working
- [ ] DevTools show no issues
- [ ] Lighthouse score > 90

### Safari

- [ ] Webkit prefixes working
- [ ] iOS specific fixes applied
- [ ] No vendor-specific bugs

### Firefox

- [ ] Backdrop filter fallback active
- [ ] Form styling consistent
- [ ] No Gecko-specific issues

### Edge

- [ ] Windows integration works
- [ ] No Chromium conflicts
- [ ] Performance optimal

### Internet Explorer 11

- [ ] Page loads and displays
- [ ] Basic functionality works
- [ ] Fallbacks active
- [ ] Performance warning shows

---

## ✅ Final Verification

### Cross-Browser Consistency

- [ ] Visual appearance similar across browsers
- [ ] Functionality identical
- [ ] Performance acceptable
- [ ] No breaking bugs

### Documentation

- [ ] Screenshots taken
- [ ] Issues documented
- [ ] Performance metrics recorded
- [ ] Test results logged

### Sign-off

- [ ] Desktop browsers tested
- [ ] Mobile browsers tested
- [ ] Accessibility verified
- [ ] Performance acceptable
- [ ] Ready for production

---

## Testing Tools Reference

### Online Tools

- **BrowserStack**: Cross-browser testing
- **LambdaTest**: Browser testing grid
- **Sauce Labs**: Automated testing
- **Can I Use**: Feature support check

### Browser DevTools

- **Chrome**: F12 → Elements, Network, Performance, Lighthouse
- **Firefox**: F12 → Inspector, Network, Performance
- **Safari**: Develop → Show Web Inspector
- **Edge**: F12 → Similar to Chrome

### Performance Tools

- **GTmetrix**: Page speed analysis
- **WebPageTest**: Detailed performance metrics
- **PageSpeed Insights**: Google's performance tool

### Accessibility Tools

- **axe DevTools**: Accessibility testing
- **WAVE**: Web accessibility evaluation
- **NVDA**: Screen reader (Windows)
- **VoiceOver**: Screen reader (Mac/iOS)

---

**Last Updated:** October 16, 2025  
**Next Review:** Monthly or before major updates
