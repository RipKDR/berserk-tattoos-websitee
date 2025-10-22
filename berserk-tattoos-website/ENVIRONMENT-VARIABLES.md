# 🔐 Environment Variables Setup Guide

## Overview

Your website requires several API keys and configuration values to function properly. These must be set in Netlify as environment variables.

---

## 🚨 IMPORTANT - Do NOT Commit These Values

**Never** add real API keys to:
- Git repository
- `.env` file that gets committed
- Public documentation

Only set them in:
- ✅ Netlify Dashboard → Environment Variables
- ✅ Local `.env` file (excluded by `.gitignore`)

---

## 📋 Required Environment Variables

### 1. Stripe Payment Processing

**Why needed:** Accept booking deposits and payments

```bash
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

#### How to Get Stripe Keys:

**Test Mode (Development):**
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy: **Publishable key** (starts with `pk_test_`)
3. Copy: **Secret key** (starts with `sk_test_`)

**Live Mode (Production):**
1. Complete Stripe account verification
2. Go to: https://dashboard.stripe.com/apikeys
3. Toggle to **Live mode**
4. Copy: **Publishable key** (starts with `pk_live_`)
5. Copy: **Secret key** (starts with `sk_live_`)

**Webhook Secret:**
1. Go to: https://dashboard.stripe.com/webhooks
2. Click: **"Add endpoint"**
3. Enter webhook URL:
   - Test: `https://[your-site].netlify.app/.netlify/functions/stripe-webhook`
   - Live: `https://www.berserk-tattoos.com/.netlify/functions/stripe-webhook`
4. Select events to listen for: `checkout.session.completed`
5. Click: **"Add endpoint"**
6. Copy the **Signing secret** (starts with `whsec_`)

---

### 2. Google Analytics

**Why needed:** Track website traffic and user behavior

```bash
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

#### How to Get Google Analytics ID:

1. Go to: https://analytics.google.com
2. Create account (if you don't have one)
3. Click: **"Admin"** (gear icon)
4. Click: **"Create Property"**
5. Enter property details:
   - Property name: "Berserk Tattoos"
   - Reporting time zone: Australia/Melbourne
   - Currency: AUD
6. Click: **"Create"**
7. Select platform: **"Web"**
8. Enter website details:
   - Website URL: `https://www.berserk-tattoos.com`
   - Stream name: "Berserk Tattoos Website"
9. Click: **"Create stream"**
10. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

---

### 3. Formspree (Contact Forms)

**Why needed:** Handle contact form submissions

```bash
FORMSPREE_FORM_ID=xxxxxxxxxxxxxxxxxxxxx
```

#### How to Get Formspree Form ID:

1. Go to: https://formspree.io/register
2. Create free account
3. Click: **"New Form"**
4. Enter form name: "Berserk Tattoos Contact"
5. Copy the **Form ID** (or form endpoint)

**Note:** You can use different form IDs for different forms:
- Contact form
- Booking inquiries
- Artist applications

---

### 4. Site Configuration

**Why needed:** Configure your site URL and environment

```bash
URL=https://www.berserk-tattoos.com
NODE_ENV=production
```

**For different environments:**

- **Production:** `https://www.berserk-tattoos.com`
- **Staging:** `https://staging--berserk-tattoos.netlify.app`
- **Development:** `http://localhost:3000`

---

### 5. Optional: Sentry Error Tracking

**Why needed:** Monitor and track JavaScript errors

```bash
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

#### How to Get Sentry DSN:

1. Go to: https://sentry.io
2. Create free account
3. Create new project: **JavaScript**
4. Copy the **DSN** value

---

## 🔧 How to Set Environment Variables in Netlify

### Method 1: Netlify Dashboard (Recommended)

1. **Navigate to your site** in Netlify Dashboard
2. Click: **"Site settings"**
3. Click: **"Environment variables"** (in left sidebar)
4. Click: **"Add a variable"**
5. For each variable:
   - **Key:** Variable name (e.g., `STRIPE_PUBLISHABLE_KEY`)
   - **Value:** Your actual key/value
   - **Scopes:** Select all (Production, Deploy Previews, Branch deploys)
6. Click: **"Create variable"**
7. Repeat for all variables

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Navigate to your project
cd berserk-tattoos-website

# Link to existing site
netlify link

# Set environment variables
netlify env:set STRIPE_PUBLISHABLE_KEY "pk_test_xxxxx"
netlify env:set STRIPE_SECRET_KEY "sk_test_xxxxx"
netlify env:set STRIPE_WEBHOOK_SECRET "whsec_xxxxx"
netlify env:set GOOGLE_ANALYTICS_ID "G-XXXXXXXXXX"
netlify env:set FORMSPREE_FORM_ID "xxxxx"
netlify env:set URL "https://www.berserk-tattoos.com"
netlify env:set NODE_ENV "production"
```

### Method 3: Bulk Import

1. Create a `.env` file locally (NOT committed to git):

```bash
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FORMSPREE_FORM_ID=xxxxx
URL=https://www.berserk-tattoos.com
NODE_ENV=production
```

2. In Netlify Dashboard:
   - Go to: **Site settings** → **Environment variables**
   - Click: **"Import from a .env file"**
   - Paste contents of your `.env` file
   - Click: **"Import variables"**

---

## ✅ Environment Variables Checklist

After setting all variables, verify in Netlify Dashboard:

- [ ] `STRIPE_PUBLISHABLE_KEY` - Set and correct
- [ ] `STRIPE_SECRET_KEY` - Set and correct
- [ ] `STRIPE_WEBHOOK_SECRET` - Set and correct
- [ ] `GOOGLE_ANALYTICS_ID` - Set and correct
- [ ] `FORMSPREE_FORM_ID` - Set and correct
- [ ] `URL` - Set to `https://www.berserk-tattoos.com`
- [ ] `NODE_ENV` - Set to `production`
- [ ] All variables applied to correct scopes (Production, etc.)

---

## 🔄 Updating Environment Variables

### When to Update:

- **Switching from Test to Live mode** (Stripe)
- **Changing domains**
- **Rotating API keys** (security best practice)
- **Adding new integrations**

### How to Update:

1. Go to: **Site settings** → **Environment variables**
2. Find the variable to update
3. Click: **"Options"** → **"Edit"**
4. Enter new value
5. Click: **"Save"**
6. **Trigger a new deploy** for changes to take effect:
   - Go to: **Deploys**
   - Click: **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## 🔐 Security Best Practices

### DO:
- ✅ Use test keys during development
- ✅ Switch to live keys only when ready for production
- ✅ Rotate keys periodically (every 3-6 months)
- ✅ Use different keys for different environments
- ✅ Keep keys in password manager
- ✅ Limit API key permissions where possible

### DON'T:
- ❌ Commit keys to Git
- ❌ Share keys in emails or chat
- ❌ Use production keys in development
- ❌ Reuse keys across multiple sites
- ❌ Store keys in plain text files
- ❌ Use the same keys as other team members

---

## 🧪 Testing Environment Variables

After setting variables, test that they work:

### Test Stripe:
1. Make a test booking on your site
2. Use test card: `4242 4242 4242 4242`
3. Check Stripe Dashboard for payment
4. Verify webhook in Netlify Functions logs

### Test Google Analytics:
1. Visit your website
2. Navigate to a few pages
3. Wait 5-10 minutes
4. Check Google Analytics Real-time report
5. Should see your visit

### Test Formspree:
1. Submit a contact form on your site
2. Check Formspree dashboard for submission
3. Check your email for notification

---

## 🐛 Troubleshooting

### Environment variables not working?

1. **Check spelling:** Ensure variable names match exactly (case-sensitive)
2. **Check values:** No extra spaces or quotes
3. **Redeploy:** Trigger a new deploy after updating variables
4. **Check scopes:** Ensure variables are applied to Production
5. **Check code:** Verify your code is accessing variables correctly

### How to verify variables are set:

In Netlify Functions, you can log (remove after testing):
```javascript
console.log('Stripe key exists:', !!process.env.STRIPE_PUBLISHABLE_KEY);
```

Check Netlify Function logs to see output.

---

## 📋 Quick Setup Template

Copy this template and fill in your values:

```bash
# STRIPE (Get from: https://dashboard.stripe.com/apikeys)
STRIPE_PUBLISHABLE_KEY=pk_test_
STRIPE_SECRET_KEY=sk_test_
STRIPE_WEBHOOK_SECRET=whsec_

# GOOGLE ANALYTICS (Get from: https://analytics.google.com)
GOOGLE_ANALYTICS_ID=G-

# FORMSPREE (Get from: https://formspree.io)
FORMSPREE_FORM_ID=

# SITE CONFIG
URL=https://www.berserk-tattoos.com
NODE_ENV=production

# OPTIONAL
SENTRY_DSN=
```

---

## 🎯 Environment-Specific Variables

You may want different values for different environments:

| Variable | Production | Staging | Development |
|----------|-----------|---------|-------------|
| URL | www.berserk-tattoos.com | staging-berserk.netlify.app | localhost:3000 |
| STRIPE_* | Live keys | Test keys | Test keys |
| NODE_ENV | production | staging | development |
| GA_ID | Production ID | Staging ID (optional) | Test ID (optional) |

Set these in Netlify using **context-specific** variables or use branch deploys.

---

## 📞 Support

Need help with API keys?

- **Stripe:** https://stripe.com/docs/keys
- **Google Analytics:** https://support.google.com/analytics
- **Formspree:** https://help.formspree.io
- **Netlify:** https://docs.netlify.com/configure-builds/environment-variables/

---

**Last Updated:** October 21, 2025
**Project:** Berserk Tattoos Website

---

*Keep your keys safe and never share them publicly!*
