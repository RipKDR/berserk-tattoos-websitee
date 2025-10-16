# Berserk Tattoos Website Setup Guide

## Quick Setup Checklist

### 1. Formspree Configuration (Required)

1. **Sign up at [formspree.io](https://formspree.io)**
2. **Create a new form**:
   - Form name: "Berserk Tattoos Booking"
   - Email notifications: `berserk.tattoos.au@gmail.com`
3. **Get your Form ID** (format: `xqwerty123`)
4. **Update `book.html`**:
   - Replace `YOUR_FORM_ID` with your actual Form ID
   - Line 15: `action="https://formspree.io/f/YOUR_FORM_ID"`

### 2. Stripe Payment Links (Required)

1. **Sign up at [stripe.com](https://stripe.com)**
2. **Create Payment Link**:
   - Product: "Consultation Deposit"
   - Price: $50.00 AUD
   - Description: "Tattoo consultation deposit"
3. **Get your Payment Link ID** (format: `test_1234567890`)
4. **Update `book.html`**:
   - Replace `YOUR_PAYMENT_LINK_ID` with your actual Payment Link ID
   - Line 1035: `https://buy.stripe.com/YOUR_PAYMENT_LINK_ID`

### 3. Google Analytics (Optional)

1. **Go to [analytics.google.com](https://analytics.google.com)**
2. **Create new property** for berserktattoos.com
3. **Get Measurement ID** (format: `G-XXXXXXXXXX`)
4. **Update all HTML files**:
   - Replace `GA_MEASUREMENT_ID` with your actual Measurement ID
   - Files: `index.html`, `book.html`, `artists.html`, `thank-you.html`, `payment-success.html`

### 4. Domain Configuration

1. **Update all URLs** from `berserktattoos.com` to your actual domain
2. **Update canonical URLs** in all HTML files
3. **Update Open Graph URLs** in all HTML files
4. **Update sitemap.xml** with your domain

### 5. Email Configuration

1. **Update email addresses** in contact sections
2. **Set up email forwarding** if needed
3. **Test email notifications** from Formspree

## Testing Checklist

### Form Functionality

- [ ] Form submits successfully to Formspree
- [ ] Email notifications received
- [ ] Error handling works (try submitting without required fields)
- [ ] Success redirect to Stripe works

### Payment Flow

- [ ] Stripe Payment Link loads correctly
- [ ] Payment processes successfully
- [ ] Success redirect to payment-success.html works
- [ ] Email receipt received

### Image Loading

- [ ] All images load correctly on all pages
- [ ] WebP images work in modern browsers
- [ ] JPG fallbacks work in older browsers
- [ ] Image error handling works

### Mobile Responsiveness

- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on tablet devices
- [ ] Check touch interactions

### Performance

- [ ] Page load times under 3 seconds
- [ ] Images optimized and compressed
- [ ] No console errors
- [ ] Lighthouse score above 90

## Deployment

### Netlify (Recommended)

1. **Connect GitHub repository**
2. **Set build command**: `npm run build` (if using build process)
3. **Set publish directory**: `/` (root)
4. **Add environment variables**:
   - `FORMSPREE_FORM_ID`: Your Formspree form ID
   - `STRIPE_PAYMENT_LINK_ID`: Your Stripe payment link ID
   - `GA_MEASUREMENT_ID`: Your Google Analytics ID

### Manual Upload

1. **Upload all files** to web server
2. **Ensure HTTPS** is enabled
3. **Test all functionality** on live site
4. **Monitor for errors** in first 24 hours

## Maintenance

### Regular Updates

- **Check Formspree submissions** weekly
- **Monitor Stripe payments** daily
- **Update portfolio images** as needed
- **Check Google Analytics** monthly

### Security

- **Keep dependencies updated**
- **Monitor for security vulnerabilities**
- **Backup website files** regularly
- **Use strong passwords** for all accounts

## Support

### Common Issues

1. **Form not submitting**: Check Formspree form ID
2. **Payment not working**: Check Stripe payment link ID
3. **Images not loading**: Check file paths and permissions
4. **Analytics not tracking**: Check Measurement ID

### Contact

- **Technical issues**: Check browser console for errors
- **Formspree support**: [help.formspree.io](https://help.formspree.io)
- **Stripe support**: [support.stripe.com](https://support.stripe.com)

---

**Note**: This setup guide assumes you have basic web development knowledge. If you need assistance, consider hiring a web developer for the initial setup.
