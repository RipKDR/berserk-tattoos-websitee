# 🚀 Deploy Berserk Tattoos to Netlify - Quick Start Guide

## ⚡ Quick Deployment (5 Minutes)

Your website is 100% ready to deploy! Follow these simple steps:

---

## Step 1: Create Netlify Account (1 minute)

1. Go to https://app.netlify.com/signup
2. Sign up with your GitHub account (recommended) or email
3. Confirm your email if required

---

## Step 2: Deploy via GitHub (2 minutes)

### Option A: Automatic GitHub Integration (RECOMMENDED)

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Click: **"Add new site"** → **"Import an existing project"**

2. **Connect to GitHub**
   - Click: **"Deploy with GitHub"**
   - Authorize Netlify to access your GitHub account
   - Select repository: **"RipKDR/berserk-tattoos-websitee"**

3. **Configure Build Settings**
   ```
   Branch to deploy: claude/setup-website-deployment-011CULP5dWumN2DdoddmntUi
   Base directory: berserk-tattoos-website
   Build command: (leave empty)
   Publish directory: berserk-tattoos-website
   ```

4. **Click "Deploy site"**
   - Wait 1-2 minutes for deployment
   - Your site will be live at: `https://[random-name].netlify.app`

### Option B: Manual Deploy (Drag & Drop)

1. **Build the site locally** (if you want to optimize first)
   ```bash
   cd berserk-tattoos-website
   npm install
   npm run optimize-all
   ```

2. **Go to Netlify Drop**
   - Visit: https://app.netlify.com/drop
   - Drag and drop the `berserk-tattoos-website` folder
   - Wait for upload to complete

---

## Step 3: Configure Custom Domain (2 minutes)

### In Netlify:

1. **Go to your site in Netlify Dashboard**
   - Click: **"Domain settings"**
   - Click: **"Add custom domain"**
   - Enter: `www.berserk-tattoos.com`
   - Click: **"Verify"** then **"Add domain"**

2. **Netlify will show you DNS records to configure**
   - Keep this tab open - you'll need these values

### In Hostinger (Your Domain Registrar):

**🔑 Your Hostinger Auth Code:** `%zB]0[=?DwVoh]bH`

1. **Login to Hostinger**
   - Go to: https://hpanel.hostinger.com
   - Login with your account

2. **Access DNS Settings**
   - Go to: **Domains** → **www.berserk-tattoos.com**
   - Click: **"DNS / Nameservers"**

3. **Option A: Use Netlify DNS (RECOMMENDED - Easier)**

   - In Netlify, go to: **Domain settings** → **"Set up Netlify DNS"**
   - Netlify will show you 4 nameservers like:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```

   - In Hostinger:
     - Click: **"Change nameservers"**
     - Select: **"Use custom nameservers"**
     - Enter all 4 Netlify nameservers
     - Click: **"Save"**

   **✅ DONE! This is the easiest method.**

4. **Option B: Use Hostinger DNS (Manual DNS Records)**

   If you prefer to keep Hostinger DNS:

   - In Hostinger DNS management, **add these records:**

   ```
   Type: A
   Name: @ (or leave blank)
   Points to: 75.2.60.5
   TTL: 3600

   Type: CNAME
   Name: www
   Points to: [your-site-name].netlify.app
   TTL: 3600
   ```

   - **Delete any conflicting A or CNAME records** for @ and www

5. **Wait for DNS Propagation**
   - Usually takes 5-30 minutes
   - Can take up to 24 hours in rare cases
   - Check status: https://dnschecker.org/#A/www.berserk-tattoos.com

6. **SSL Certificate (Automatic)**
   - Netlify automatically provisions SSL certificate
   - Your site will be available at: `https://www.berserk-tattoos.com`
   - Wait 5-10 minutes after DNS propagation for SSL to activate

---

## Step 4: Configure Environment Variables

**IMPORTANT:** These are required for:
- ✅ Stripe payments
- ✅ Google Analytics tracking
- ✅ Contact form submissions

### In Netlify Dashboard:

1. Go to: **Site settings** → **Environment variables**
2. Click: **"Add a variable"**
3. Add the following variables:

```bash
# Required for Stripe Payments
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Required for Google Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Required for Contact Forms
FORMSPREE_FORM_ID=xxxxxxxxxxxxx

# Site Configuration
URL=https://www.berserk-tattoos.com
NODE_ENV=production
```

### 🔑 Where to Get These Keys:

#### Stripe Keys:
1. Go to: https://dashboard.stripe.com/apikeys
2. Copy **Publishable key** (starts with `pk_`)
3. Copy **Secret key** (starts with `sk_`)
4. For webhook secret:
   - Go to: https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - URL: `https://www.berserk-tattoos.com/.netlify/functions/stripe-webhook`
   - Events: Select `checkout.session.completed`
   - Copy the **Webhook signing secret**

#### Google Analytics:
1. Go to: https://analytics.google.com
2. Create a property for your website
3. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

#### Formspree:
1. Go to: https://formspree.io
2. Create a free account
3. Create a new form
4. Copy the **Form ID**

---

## Step 5: Update Domain in netlify.toml (IMPORTANT)

The netlify.toml file has a redirect rule that needs to be updated with your actual domain.

In the file `berserk-tattoos-website/netlify.toml`, find this section (around line 98):

```toml
[[redirects]]
  # Redirect www to non-www (or vice versa)
  from = "https://www.berserktattoos.com/*"
  to = "https://berserktattoos.com/:splat"
  status = 301
  force = true
```

**Update it to:**

```toml
[[redirects]]
  # Redirect non-www to www
  from = "https://berserk-tattoos.com/*"
  to = "https://www.berserk-tattoos.com/:splat"
  status = 301
  force = true
```

Then commit and push this change, or redeploy the site.

---

## ✅ Post-Deployment Checklist

After deployment, test these:

- [ ] **Site loads:** Visit https://www.berserk-tattoos.com
- [ ] **SSL is active:** Check for 🔒 padlock in browser
- [ ] **All pages work:**
  - [ ] Home page
  - [ ] Artists page
  - [ ] Portfolio page
  - [ ] Pricing page
  - [ ] Booking page
  - [ ] Contact forms
- [ ] **Images load correctly**
- [ ] **Mobile responsive:** Test on phone
- [ ] **Booking form submits** (use Stripe test card: 4242 4242 4242 4242)
- [ ] **Google Analytics tracks visits** (check GA dashboard)
- [ ] **Contact form works** (submit a test message)

---

## 🎯 Stripe Test Mode

Before going live, test payments in Stripe test mode:

**Test Card:** `4242 4242 4242 4242`
**Expiry:** Any future date (e.g., 12/25)
**CVC:** Any 3 digits (e.g., 123)
**ZIP:** Any 5 digits (e.g., 12345)

Test a booking on your site and verify:
1. Payment processes successfully
2. You receive confirmation in Stripe Dashboard
3. Customer is redirected to thank you page

---

## 🔴 Go LIVE with Stripe

When ready to accept real payments:

1. **Complete Stripe verification**
   - Provide business information
   - Add bank account for payouts

2. **Switch to Live Mode**
   - In Stripe Dashboard, toggle from "Test" to "Live"
   - Get your **Live API keys**
   - Create a new webhook endpoint with live keys

3. **Update Netlify Environment Variables**
   ```
   STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   STRIPE_SECRET_KEY=sk_live_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx (from live webhook)
   ```

4. **Redeploy site** or wait for automatic rebuild

---

## 🎨 Optional Customizations

### Update Site Name in Netlify:
1. Go to: **Site settings** → **General** → **Site details**
2. Click: **"Change site name"**
3. Enter: `berserk-tattoos` (if available)
4. Your site will be: `https://berserk-tattoos.netlify.app`

### Enable Form Notifications:
1. Go to: **Site settings** → **Forms**
2. Add notification email for form submissions
3. Configure spam filtering

### Set up Deploy Notifications:
1. Go to: **Site settings** → **Build & deploy** → **Deploy notifications**
2. Add email or Slack notifications for deployments

---

## 🐛 Troubleshooting

### Site not loading?
- Check deployment status in Netlify dashboard
- Look for errors in deploy logs
- Verify DNS records are correct

### Domain not working?
- Wait 30 minutes for DNS propagation
- Check DNS with: https://dnschecker.org
- Verify nameservers or DNS records in Hostinger

### SSL certificate not working?
- Wait 10-15 minutes after DNS propagation
- Go to: **Domain settings** → **HTTPS** → **Verify DNS configuration**
- Click **"Renew certificate"** if needed

### Forms not working?
- Check FORMSPREE_FORM_ID is set in environment variables
- Verify form action URLs in HTML files
- Check browser console for errors

### Payments not working?
- Verify all Stripe environment variables are set
- Check Stripe is in correct mode (test vs live)
- Review webhook endpoint URL
- Check Netlify Functions logs for errors

---

## 📞 Need Help?

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Support:** https://www.netlify.com/support/
- **Stripe Docs:** https://stripe.com/docs
- **DNS Checker:** https://dnschecker.org

---

## 🎉 You're All Set!

Your website is now live at: **https://www.berserk-tattoos.com**

**Next Steps:**
1. ✅ Test all functionality
2. ✅ Share with your team
3. ✅ Promote on social media (Instagram, Facebook)
4. ✅ Monitor bookings and analytics
5. ✅ Gather customer feedback

---

**Deployment Date:** October 21, 2025
**Domain:** www.berserk-tattoos.com
**Hosting:** Netlify
**Status:** Production Ready ✅

---

*Need to make changes? Just push to your GitHub repository and Netlify will automatically redeploy!*
