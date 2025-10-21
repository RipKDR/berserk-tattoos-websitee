# Netlify Environment Variables Setup Guide

## 🔐 Overview

This guide explains how to configure environment variables in Netlify for the Berserk Tattoos website. Environment variables store sensitive API keys and configuration settings securely.

---

## 📋 Required Environment Variables

You need to set these variables for the booking system to work:

| Variable Name | Purpose | Example Value | Required? |
|---------------|---------|---------------|-----------|
| `STRIPE_SECRET_KEY` | Stripe API secret key | `sk_test_...` or `sk_live_...` | ✅ Yes |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_test_...` or `pk_live_...` | ✅ Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signature | `whsec_...` | ✅ Yes |
| `URL` | Your website URL | `https://berserktattoos.com` | ✅ Yes |
| `SENDGRID_API_KEY` | SendGrid for emails (optional) | `SG.xxx...` | ❌ Optional |
| `MAILGUN_API_KEY` | Mailgun for emails (optional) | `key-xxx...` | ❌ Optional |

---

## 🚀 Step 1: Access Netlify Dashboard

1. Go to **https://app.netlify.com/**
2. Log in to your Netlify account
3. Click on your **"Berserk Tattoos"** site
4. Go to **Site settings** (top navigation)

---

## ⚙️ Step 2: Navigate to Environment Variables

1. In left sidebar, click **"Environment variables"**
   - OR go to: **Site settings → Build & deploy → Environment**
2. You'll see the environment variables page

---

## 🔑 Step 3: Add Stripe Keys

### A. Get Stripe Keys

First, get your Stripe API keys:

1. Go to **https://dashboard.stripe.com/**
2. Log in to your Stripe account
3. Click **"Developers"** in top nav
4. Click **"API keys"** in left sidebar
5. You'll see:
   - **Publishable key**: Starts with `pk_test_` (test) or `pk_live_` (live)
   - **Secret key**: Click "Reveal" to see, starts with `sk_test_` or `sk_live_`

**⚠️ Important:**
- **Test mode** for development (keys start with `pk_test_` and `sk_test_`)
- **Live mode** for production (keys start with `pk_live_` and `sk_live_`)
- Start with test keys, switch to live when ready to launch

### B. Add Secret Key

1. In Netlify, click **"Add a variable"** or **"New variable"**
2. **Key**: `STRIPE_SECRET_KEY`
3. **Value**: Paste your Stripe secret key (e.g., `sk_test_4eC39HqLyjWDarjtT1zdp7dc`)
4. **Scopes**: Select **"All"** (applies to all deploy contexts)
5. Click **"Create variable"** or **"Set variable"**

### C. Add Publishable Key

1. Click **"Add a variable"** again
2. **Key**: `STRIPE_PUBLISHABLE_KEY`
3. **Value**: Paste your Stripe publishable key (e.g., `pk_test_TYooMQauvdEDq54NiTphI7jx`)
4. **Scopes**: **"All"**
5. Click **"Create variable"**

---

## 🎣 Step 4: Add Stripe Webhook Secret

### A. Create Webhook in Stripe

1. In Stripe Dashboard, go to **Developers → Webhooks**
2. Click **"+ Add endpoint"**
3. **Endpoint URL**: `https://berserktattoos.com/.netlify/functions/stripe-webhook`
   - Replace `berserktattoos.com` with your actual domain
   - OR use Netlify subdomain: `https://YOUR-SITE.netlify.app/.netlify/functions/stripe-webhook`
4. **Events to send**:
   - Click **"Select events"**
   - Select:
     - ✅ `checkout.session.completed`
     - ✅ `payment_intent.succeeded`
     - ✅ `payment_intent.payment_failed`
5. Click **"Add endpoint"**

### B. Get Webhook Secret

1. After creating webhook, click on it
2. In **"Signing secret"** section, click **"Reveal"**
3. Copy the secret (starts with `whsec_...`)

### C. Add to Netlify

1. In Netlify, click **"Add a variable"**
2. **Key**: `STRIPE_WEBHOOK_SECRET`
3. **Value**: Paste webhook secret (e.g., `whsec_XXXXXXXXXXXXXXXX`)
4. **Scopes**: **"All"**
5. Click **"Create variable"**

---

## 🌐 Step 5: Add Website URL

1. Click **"Add a variable"**
2. **Key**: `URL`
3. **Value**: Your production URL
   - **With custom domain**: `https://berserktattoos.com`
   - **OR Netlify subdomain**: `https://berserk-tattoos.netlify.app`
   - ⚠️ **No trailing slash!**
4. **Scopes**: **"All"**
5. Click **"Create variable"**

---

## 📧 Step 6: Add Email Service Keys (Optional)

If you want to send booking confirmation emails, add one of these:

### Option A: SendGrid

1. Create SendGrid account: https://sendgrid.com/
2. Get API key from: **Settings → API Keys**
3. In Netlify, add variable:
   - **Key**: `SENDGRID_API_KEY`
   - **Value**: Your SendGrid key (starts with `SG.`)
   - **Scopes**: **"All"**

### Option B: Mailgun

1. Create Mailgun account: https://www.mailgun.com/
2. Get API key from: **Settings → API Keys**
3. In Netlify, add variable:
   - **Key**: `MAILGUN_API_KEY`
   - **Value**: Your Mailgun key
   - **Scopes**: **"All"**

**Note:** If you skip this, bookings will still work but no emails will be sent.

---

## ✅ Step 7: Verify Variables

Your environment variables should now look like this:

```
STRIPE_SECRET_KEY         sk_test_XXXXXXXXXXXXXXXX
STRIPE_PUBLISHABLE_KEY    pk_test_XXXXXXXXXXXXXXXX  
STRIPE_WEBHOOK_SECRET     whsec_XXXXXXXXXXXXXXXXXX
URL                       https://berserktattoos.com
SENDGRID_API_KEY          SG.XXXXXXXX (optional)
```

---

## 🔄 Step 8: Redeploy Site

**Important:** Environment variables only apply to NEW deployments.

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for deployment to complete (~2-3 minutes)
4. Your functions will now have access to the environment variables

---

## 🧪 Step 9: Test the Setup

### Test Booking Flow:

1. Go to `https://yoursite.com/book.html`
2. Complete the booking wizard
3. Select $100 in-person consultation
4. Use Stripe test card: `4242 4242 4242 4242`
5. Complete payment
6. You should redirect to success page

### Check Function Logs:

1. In Netlify, go to **Functions** tab
2. Click **"stripe-webhook"** or **"create-booking"**
3. View logs to see if functions executed successfully
4. Look for errors (red text)

---

## 🐛 Troubleshooting

### Issue: "Stripe key not found"

**Solution:**
- Verify variable names are exactly: `STRIPE_SECRET_KEY` (not `STRIPE_KEY`)
- Check for typos in variable names
- Redeploy site after adding variables

### Issue: "Webhook signature verification failed"

**Solution:**
- Ensure `STRIPE_WEBHOOK_SECRET` matches the secret in Stripe Dashboard
- Check webhook endpoint URL is correct (includes `.netlify/functions/stripe-webhook`)
- Verify webhook is enabled in Stripe

### Issue: "Cannot read environment variable"

**Solution:**
- Environment variables are only available in Netlify Functions (serverless), not in static HTML/JS
- Client-side code cannot access `process.env.STRIPE_SECRET_KEY` (by design)
- Use `STRIPE_PUBLISHABLE_KEY` in client-side, `STRIPE_SECRET_KEY` in functions

### Issue: "Emails not sending"

**Solution:**
- Emails are optional - booking still works without email service
- Check SendGrid/Mailgun account is active
- Verify API key is correct
- Check function logs for email errors
- See `SETUP-EMAIL-OPTIONAL.md` for implementation details

---

## 🔒 Security Best Practices

### ✅ Do:
- Keep secret keys private (never commit to git)
- Use test keys for development
- Rotate keys regularly (every 6 months)
- Use different keys for staging/production

### ❌ Don't:
- Never expose `STRIPE_SECRET_KEY` in HTML/JavaScript
- Never commit `.env` files to git (already in `.gitignore`)
- Never share keys in screenshots/emails
- Never use live keys in test mode

---

## 📱 Development vs Production

### Development (Test Mode):

```
STRIPE_SECRET_KEY         sk_test_XXXXXXX
STRIPE_PUBLISHABLE_KEY    pk_test_XXXXXXX
STRIPE_WEBHOOK_SECRET     whsec_test_XXXXX
URL                       http://localhost:8888
```

### Production (Live Mode):

```
STRIPE_SECRET_KEY         sk_live_XXXXXXX
STRIPE_PUBLISHABLE_KEY    pk_live_XXXXXXX
STRIPE_WEBHOOK_SECRET     whsec_live_XXXXX
URL                       https://berserktattoos.com
```

**To switch from test to live:**
1. Update all 3 Stripe variables with live keys
2. Create new webhook with live URL
3. Update `STRIPE_WEBHOOK_SECRET` with live webhook secret
4. Redeploy site

---

## 🔄 Updating Variables

### To Change a Variable:

1. Go to **Site settings → Environment variables**
2. Find the variable
3. Click **"Edit"** (pencil icon)
4. Update value
5. Click **"Save"**
6. Redeploy site for changes to take effect

### To Delete a Variable:

1. Click **"Delete"** (trash icon) next to variable
2. Confirm deletion
3. Redeploy site

---

## ✅ Checklist

- [ ] Created Netlify account
- [ ] Deployed Berserk Tattoos site to Netlify
- [ ] Got Stripe API keys (test mode)
- [ ] Added `STRIPE_SECRET_KEY` variable
- [ ] Added `STRIPE_PUBLISHABLE_KEY` variable
- [ ] Created Stripe webhook endpoint
- [ ] Added `STRIPE_WEBHOOK_SECRET` variable
- [ ] Added `URL` variable
- [ ] (Optional) Added email service API key
- [ ] Redeployed site
- [ ] Tested booking flow with test card
- [ ] Verified webhook receives events
- [ ] Checked function logs for errors

---

## 📞 Support

**Netlify Help:**
- Docs: https://docs.netlify.com/environment-variables/get-started/
- Support: https://www.netlify.com/support/

**Stripe Help:**
- Docs: https://stripe.com/docs/keys
- Support: https://support.stripe.com/

---

**🎉 Once all variables are set and tested, your booking system is ready for production!**

**Last Updated:** October 2025  
**Version:** 1.0.0

