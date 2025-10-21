# Booking Flow End-to-End Test Checklist

## 📋 Overview

This comprehensive checklist ensures the 5-step booking wizard works flawlessly from start to finish.

---

## 🧪 Testing Environment

### Before You Start:

- [ ] **Browser**: Test in Chrome, Firefox, Safari, Edge
- [ ] **Device**: Test on desktop, tablet, mobile
- [ ] **Clear Cache**: Clear browser cache and localStorage
- [ ] **Check Console**: Open Developer Tools (F12) → Console tab
- [ ] **Network Tab**: Monitor for errors

---

## 📝 Step 1: Consultation Type & Artist Selection

### Consultation Type Selection:

- [ ] Page loads at `/book.html`
- [ ] Both consultation options display correctly
- [ ] **FREE Phone Consultation** card shows:
  - [ ] Green "FREE" badge
  - [ ] Phone icon 📞
  - [ ] $0 price
  - [ ] 4 feature bullets with checkmarks
- [ ] **$100 In-Person Consultation** card shows:
  - [ ] "MOST POPULAR" badge
  - [ ] Art icon 🎨
  - [ ] $100 price
  - [ ] "Fully Credited Toward Your Tattoo" messaging (prominent)
  - [ ] 5 feature bullets including credit line

### Consultation Selection Behavior:

- [ ] Click phone consultation → card highlights with `.selected` class
- [ ] Click in-person → phone deselects, in-person highlights
- [ ] Artist selection section appears below after consultation selected
- [ ] Page smoothly scrolls to artist section

### Artist Selection:

- [ ] 3 artist cards display: Amelia Kelso, Ben White Raven, Monique Moore
- [ ] Each shows: photo, name, specialty, bio
- [ ] Hover effect works (lift + glow)
- [ ] Click artist → card highlights
- [ ] Only one artist can be selected at a time
- [ ] "Next" button enables when both consultation type + artist selected

### Validation:

- [ ] Click "Next" without selecting consultation → error: "Please select a consultation type"
- [ ] Select consultation but not artist → error: "Please select an artist"
- [ ] Select both → proceeds to Step 2

---

## 📝 Step 2: Personal Details

### Form Fields Display:

- [ ] Step title: "Your Details"
- [ ] Progress bar shows 20% (Step 1 → 2)
- [ ] Progress circle 2 is active/highlighted
- [ ] Form has 4 fields in 2x2 grid:
  - [ ] First Name (required)
  - [ ] Last Name (required)
  - [ ] Email (required)
  - [ ] Phone (required)

### Form Behavior:

- [ ] Tab order works correctly (First → Last → Email → Phone)
- [ ] Required field indicators show (asterisks/labels)
- [ ] Email field accepts valid email format
- [ ] Phone field accepts various formats:
  - [ ] `0478 128 212`
  - [ ] `+61 478 128 212`
  - [ ] `(03) 9458 1234`

### Validation:

- [ ] Click "Next" with empty fields → errors display below each field
- [ ] Type in field → error clears
- [ ] Invalid email (missing @) → error: "Please enter a valid email"
- [ ] Fill all fields correctly → "Next" proceeds to Step 3

### Data Persistence:

- [ ] Fill form partially
- [ ] Click "Back" to Step 1
- [ ] Click "Next" to return to Step 2
- [ ] Data is still filled in (localStorage working)

---

## 📝 Step 3: Date & Time Selection

### Calendar Display:

- [ ] Step title: "Choose Date & Time"
- [ ] Progress bar shows 40%
- [ ] Calendar widget displays current month
- [ ] Today's date is highlighted
- [ ] Past dates are disabled/greyed out
- [ ] Future dates (30 days out) are clickable

### Date Selection:

- [ ] Click available date → highlights
- [ ] Time slots appear below calendar
- [ ] Time slots show (example):
  - [ ] 10:00 AM
  - [ ] 11:00 AM
  - [ ] 1:00 PM
  - [ ] 2:00 PM
  - [ ] 3:00 PM
  - [ ] 4:00 PM

### Time Selection:

- [ ] Click time slot → highlights
- [ ] Only one time can be selected
- [ ] Selected date + time display in summary sidebar

### Validation:

- [ ] Click "Next" without selecting date → error: "Please select a date"
- [ ] Select date but not time → error: "Please select a time"
- [ ] Select both → proceeds to Step 4

---

## 📝 Step 4: Design Brief

### Form Display:

- [ ] Step title: "Design Brief"
- [ ] Progress bar shows 60%
- [ ] Form fields:
  - [ ] Tattoo Placement (dropdown)
  - [ ] Size (dropdown)
  - [ ] Budget (dropdown)
  - [ ] Design Description (textarea, optional)

### Field Options:

**Placement dropdown:**
- [ ] Arm
- [ ] Leg
- [ ] Back
- [ ] Chest
- [ ] Shoulder
- [ ] Other

**Size dropdown:**
- [ ] Small (< 5cm)
- [ ] Medium (5-10cm)
- [ ] Large (10-20cm)
- [ ] Extra Large (20cm+)

**Budget dropdown:**
- [ ] $500 - $1,000
- [ ] $1,000 - $2,500
- [ ] $2,500 - $5,000
- [ ] $5,000+

### Form Behavior:

- [ ] Dropdowns open correctly
- [ ] Textarea allows multi-line text
- [ ] Character count shows (if applicable)
- [ ] Description is optional (can proceed without it)

### Validation:

- [ ] Click "Next" without placement → error
- [ ] Click "Next" without size → error
- [ ] Click "Next" without budget → error
- [ ] Fill required fields → proceeds to Step 5

---

## 📝 Step 5: Review & Confirm

### Summary Display:

- [ ] Step title: "Review & Confirm"
- [ ] Progress bar shows 80%
- [ ] **Consultation Summary** shows:
  - [ ] Consultation type (FREE Phone or $100 In-Person)
  - [ ] Selected artist name
  - [ ] Appointment date
  - [ ] Appointment time
  - [ ] Placement
  - [ ] Size
  - [ ] Budget range

- [ ] **Consultation Fee** displays:
  - [ ] $0.00 for phone consultation
  - [ ] $100.00 for in-person
  - [ ] Credit note shows for in-person: "Your $100 deposit is fully credited toward your final tattoo cost"

### Payment Buttons:

- [ ] **For FREE phone consultation:**
  - [ ] Button says "Confirm Booking" (no payment)
  - [ ] Clicking redirects to `/thank-you.html`

- [ ] **For $100 in-person:**
  - [ ] Button says "Pay $100 Deposit" or "Complete Booking"
  - [ ] Clicking triggers Stripe Checkout redirect
  - [ ] Stripe page opens with $100 charge

### Validation:

- [ ] All summary data matches what was entered
- [ ] Edit buttons work (return to respective steps)
- [ ] Data persists when returning from edit

---

## 💳 Stripe Payment Flow (In-Person Only)

### Stripe Checkout Page:

- [ ] Redirects to Stripe-hosted page
- [ ] Shows: "Tattoo Consultation"
- [ ] Amount: $100.00 AUD
- [ ] Artist name in description
- [ ] Email pre-filled from Step 2

### Test Payment (Use Stripe Test Cards):

**Success Card:** `4242 4242 4242 4242`
- [ ] Enter test card
- [ ] Any future expiry (e.g., 12/25)
- [ ] Any 3-digit CVC (e.g., 123)
- [ ] Any ZIP code (e.g., 12345)
- [ ] Click "Pay"
- [ ] Redirects to `/payment-success.html`

**Declined Card:** `4000 0000 0000 0002`
- [ ] Enter declined card
- [ ] Shows error: "Your card was declined"
- [ ] User can try again

### Payment Success Page:

- [ ] Shows success message
- [ ] Displays booking ID (format: `BT-TIMESTAMP-RANDOM`)
- [ ] Shows consultation details
- [ ] Includes next steps
- [ ] Link to download calendar event (optional)

---

## 🔄 Data Persistence & Navigation

### localStorage Behavior:

- [ ] Fill out wizard partially
- [ ] Close browser tab
- [ ] Re-open `/book.html`
- [ ] Data is restored (correct step, all fields filled)

### Back Button:

- [ ] Works on every step except Step 1
- [ ] Returns to previous step
- [ ] Data persists when going back
- [ ] Progress bar updates correctly

### Browser Back/Forward:

- [ ] Browser back button returns to previous step (if history API used)
- [ ] OR shows warning: "Progress will be lost"

---

## 📱 Mobile Responsiveness

### Mobile Layout (< 768px):

- [ ] Wizard fits screen width
- [ ] No horizontal scroll
- [ ] Buttons stack vertically
- [ ] Form fields stack (single column)
- [ ] Calendar is touch-friendly
- [ ] Time slots are large enough to tap (44px min)

### Touch Interactions:

- [ ] Artist cards respond to touch
- [ ] Consultation cards respond to touch
- [ ] Calendar dates are tappable
- [ ] Dropdowns open with native mobile UI

---

## 🐛 Error Handling

### Network Errors:

- [ ] Disconnect internet
- [ ] Try to submit booking
- [ ] Shows error: "Connection failed, please check your internet"
- [ ] Allows retry without data loss

### Stripe Errors:

- [ ] Stripe fails to load
- [ ] Shows fallback: "Payment unavailable, please contact us"
- [ ] Provides email/phone contact

### JavaScript Errors:

- [ ] Check console for any errors
- [ ] No `console.error` messages
- [ ] No uncaught exceptions

---

## ⚡ Performance Tests

### Load Time:

- [ ] Page loads in < 3 seconds (check Network tab)
- [ ] No render-blocking resources
- [ ] Images lazy-load correctly

### Interactions:

- [ ] Step transitions are smooth (< 300ms)
- [ ] No lag when clicking artist/consultation cards
- [ ] Calendar renders quickly

---

## 🔐 Security & Data Validation

### Input Sanitization:

- [ ] Try entering `<script>alert('XSS')</script>` in description field
- [ ] Script doesn't execute (properly escaped)
- [ ] Special characters handled: `' " < > &`

### Email Validation:

- [ ] `invalidemail` → rejected
- [ ] `test@` → rejected
- [ ] `test@example.com` → accepted

### Phone Validation:

- [ ] `123` → too short (if validated)
- [ ] Letters → rejected (if numeric-only)
- [ ] Valid formats accepted

---

## 📊 Analytics Tracking (If GA4 Enabled)

### Check Google Analytics Events:

- [ ] `booking_step_1` fires
- [ ] `booking_step_2` fires
- [ ] `booking_step_3` fires
- [ ] `booking_step_4` fires
- [ ] `booking_step_5` fires
- [ ] `booking_request_confirmed` fires (free consultation)
- [ ] `purchase` event fires (paid consultation)

View in: **GA4 Realtime → Events**

---

## ✅ Acceptance Criteria

### All Must Pass:

- [x] User can complete full booking flow without errors
- [x] Data persists across steps (localStorage)
- [x] Validation prevents incomplete submissions
- [x] Stripe payment works for $100 in-person consultation
- [x] Free phone consultation bypasses payment
- [x] Mobile responsive (all screen sizes)
- [x] No console errors
- [x] Success page shows correct information
- [x] Consultation fee credit messaging is clear

---

## 🚨 Known Issues / Notes

### To Document During Testing:

- **Issue**: [Description]
  - **Severity**: Critical / High / Medium / Low
  - **Steps to Reproduce**: [Steps]
  - **Expected**: [What should happen]
  - **Actual**: [What actually happens]
  - **Fix**: [Proposed solution]

---

## 📞 Test Support

**If Stripe Test Mode Not Working:**
- Ensure `STRIPE_SECRET_KEY` starts with `sk_test_`
- Ensure `STRIPE_PUBLISHABLE_KEY` starts with `pk_test_`
- Check Netlify environment variables

**If Netlify Functions Fail:**
- Check function logs: Netlify Dashboard → Functions → View logs
- Verify `create-booking.js` is deployed
- Test locally: `netlify dev`

---

## ✅ Sign-Off

**Tested By:** _______________  
**Date:** _______________  
**Browser:** Chrome / Firefox / Safari / Edge  
**Device:** Desktop / Tablet / Mobile  
**Status:** ✅ Pass / ❌ Fail  

**Notes:**
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

**🎉 Once all tests pass, the booking system is production-ready!**

**Last Updated:** October 2025  
**Test Version:** 1.0.0

