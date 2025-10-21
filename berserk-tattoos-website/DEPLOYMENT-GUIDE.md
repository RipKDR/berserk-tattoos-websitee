# 🚀 Berserk Tattoos - Complete Deployment Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Netlify Deployment](#netlify-deployment)
4. [Stripe Configuration](#stripe-configuration)
5. [Post-Deployment Checklist](#post-deployment-checklist)
6. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before deploying, ensure you have:

- [ ] GitHub repository access
- [ ] Netlify account (free tier works)
- [ ] Stripe account (for payments)
- [ ] Google Analytics account (for tracking)
- [ ] Formspree account (for form submissions)

---

## 🔧 Environment Setup

### Step 1: Create Environment Variables

Copy `.env.example` to `.env` and fill in ALL values:

```bash
cp .env.example .env
```

### Step 2: Get Your API Keys

#### **Stripe Keys** (Required for payments)
1. Go to: https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_`)
3. Copy your **Secret key** (starts with `sk_`)
4. For webhooks:
   - Go to: https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - URL: `https://YOUR_SITE.netlify.app/.netlify/functions/stripe-webhook`
   - Events to listen: `checkout.session.completed`
   - Copy the **Webhook signing secret** (starts with `whsec_`)

#### **Google Analytics** (Required for tracking)
1. Go to: https://analytics.google.com
2. Create a new property or use existing
3. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

#### **Formspree** (Required for contact forms)
1. Go to: https://formspree.io
2. Create a new form
3. Copy your **Form ID**

---

## 🌐 Netlify Deployment

### Method 1: Netlify UI (Recommended for first deployment)

1. **Connect Repository**
   ```
   - Go to: https://app.netlify.com
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub
   - Select: berserk-tattoos-websitee repository
   - Branch: claude/improve-codebase-011CUKX7wQATcd8F6oo8TszA
   ```

2. **Build Settings**
   ```
   Build command: (leave empty - static site)
   Publish directory: .
   ```

3. **Environment Variables**
   ```
   Go to: Site Settings > Environment Variables > Add variables

   Add each variable from your .env file:
   - STRIPE_PUBLISHABLE_KEY
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - URL (set to your Netlify URL, e.g., https://berserktattoos.netlify.app)
   - NODE_ENV=production
   - GOOGLE_ANALYTICS_ID
   - FORMSPREE_FORM_ID
   - SENTRY_DSN (optional)
   ```

4. **Deploy**
   ```
   Click "Deploy site"
   Wait 2-3 minutes for deployment to complete
   ```

### Method 2: Netlify CLI (For advanced users)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Set environment variables
netlify env:set STRIPE_PUBLISHABLE_KEY "your_key_here"
netlify env:set STRIPE_SECRET_KEY "your_key_here"
netlify env:set STRIPE_WEBHOOK_SECRET "your_secret_here"
netlify env:set URL "https://your-site.netlify.app"
netlify env:set NODE_ENV "production"
# ... add all other variables

# Deploy
netlify deploy --prod
```

---

## 💳 Stripe Configuration

### Step 1: Update Product Pricing

1. Go to: https://dashboard.stripe.com/products
2. Create product: "Tattoo Consultation"
3. Set price: $50 AUD (or your consultation fee)
4. Copy the Price ID

### Step 2: Update Netlify Functions

The Stripe integration is already configured in:
- `netlify/functions/create-booking.js`
- `netlify/functions/stripe-webhook.js`

No code changes needed! Just ensure environment variables are set.

### Step 3: Test Stripe Integration

1. Use Stripe test mode first:
   - Test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

2. Make a test booking on your site
3. Check Stripe Dashboard > Payments to see the test payment
4. Check webhook logs in Netlify Functions tab

### Step 4: Go Live with Stripe

1. Complete Stripe account verification
2. Switch to **Live mode** in Stripe Dashboard
3. Get your **Live API keys**
4. Update Netlify environment variables with live keys:
   ```
   STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   STRIPE_SECRET_KEY=sk_live_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx (from live webhook)
   ```
5. Redeploy site

---

## 📊 Post-Deployment Checklist

### Immediate Tasks (Day 1)

- [ ] Test website loads correctly
- [ ] Test all navigation links
- [ ] Test booking form submission
- [ ] Test Stripe payment flow (test mode)
- [ ] Verify Google Analytics is tracking
- [ ] Test on mobile devices
- [ ] Test contact form submission
- [ ] Check all images load correctly

### Week 1 Tasks

- [ ] Monitor Netlify function logs
- [ ] Check Stripe webhook deliveries
- [ ] Review Google Analytics data
- [ ] Test from different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Get feedback from team
- [ ] Create backup of environment variables

### Optimization Tasks

- [ ] Set up custom domain (if not using netlify subdomain)
- [ ] Configure SSL certificate (automatic with Netlify)
- [ ] Enable Netlify analytics (optional, paid)
- [ ] Set up Sentry error tracking
- [ ] Configure email notifications for bookings
- [ ] Set up automated backups

---

## 🔧 Custom Domain Setup (Optional)

### If using your own domain:

1. **In Netlify:**
   ```
   Site Settings > Domain management > Add custom domain
   Enter: berserktattoos.com
   ```

2. **In your domain registrar (e.g., GoDaddy, Namecheap):**
   ```
   Add DNS records:
   - Type: A
     Name: @
     Value: 75.2.60.5

   - Type: CNAME
     Name: www
     Value: your-site.netlify.app
   ```

3. **Update environment variables:**
   ```
   URL=https://berserktattoos.com
   ```

4. **Update Stripe webhooks** with new domain

---

## 🐛 Troubleshooting

### Issue: Netlify build fails

**Solution:**
```bash
# Check build logs in Netlify dashboard
# Common issues:
- Missing environment variables
- Node version mismatch
- npm install failures

# Fix:
- Ensure all environment variables are set
- Check netlify.toml configuration
- Review build command output
```

### Issue: Stripe payments not working

**Solution:**
```bash
# Check:
1. Environment variables are set correctly
2. Webhook endpoint is correct
3. Webhook secret matches Stripe dashboard
4. Check Netlify Functions logs for errors
5. Verify Stripe is in correct mode (test vs live)
```

### Issue: Forms not submitting

**Solution:**
```bash
# Check:
1. FORMSPREE_FORM_ID is set correctly
2. Form action URL is correct in HTML
3. Check browser console for JavaScript errors
4. Verify Formspree account is active
```

### Issue: Google Analytics not tracking

**Solution:**
```bash
# Check:
1. GOOGLE_ANALYTICS_ID is correct
2. gtag.js script is loading (check browser network tab)
3. Ad blockers disabled for testing
4. Wait 24-48 hours for data to appear
```

---

## 📞 Support

For issues:
1. Check Netlify function logs
2. Check browser console
3. Review this deployment guide
4. Contact: berserk.tattoos.au@gmail.com

---

## 🎉 Deployment Complete!

Your Berserk Tattoos website is now live!

**Next steps:**
1. Share the URL with your team
2. Start promoting on social media
3. Monitor bookings and analytics
4. Gather user feedback
5. Iterate and improve

**Production URL:** `https://your-site.netlify.app`

---

*Generated with Claude Code - Production-ready deployment*
