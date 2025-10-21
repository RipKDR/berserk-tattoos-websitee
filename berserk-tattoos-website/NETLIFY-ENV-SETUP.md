# Netlify Environment Variables Setup

## Quick Reference

Copy and paste these into Netlify Dashboard → Site Settings → Environment Variables

---

## Required Variables

### Stripe Payment Integration
```
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

### Site Configuration
```
URL=https://berserktattoos.netlify.app
NODE_ENV=production
```

### Google Analytics
```
GOOGLE_ANALYTICS_ID=G-F83QBK5Z4N
```

### Form Submission
```
FORMSPREE_FORM_ID=xxxxxxxxxxxxx
```

---

## Optional Variables

### Sentry Error Tracking
```
SENTRY_DSN=https://xxxxxxxxxxxxxxxxxxxxx@sentry.io/xxxxx
SENTRY_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxx
```

### Email Notifications
```
EMAIL_SERVICE_API_KEY=xxxxxxxxxxxxxxxxxxxxx
STUDIO_NOTIFICATION_EMAIL=berserk.tattoos.au@gmail.com
```

---

## How to Add Variables in Netlify

1. Go to: https://app.netlify.com
2. Select your site
3. Navigate to: **Site settings** → **Environment variables**
4. Click: **Add a variable**
5. For each variable above:
   - **Key:** Variable name (e.g., `STRIPE_PUBLISHABLE_KEY`)
   - **Values:** Your actual value
   - **Scopes:** Select "All" or choose specific deploy contexts
6. Click **Create variable**
7. Repeat for all variables
8. **Trigger a new deploy** to apply changes

---

## Verification

After adding variables, verify they're set:
1. Go to: **Deploys** tab
2. Click on latest deploy
3. Click **Deploy log**
4. Check for "Environment variables" section

---

## Security Notes

- ⚠️ **NEVER commit** `.env` files to Git
- ✅ **Always use** environment variables for secrets
- 🔒 **Restrict access** to Netlify dashboard
- 📋 **Backup** your environment variables securely
- 🔄 **Rotate keys** periodically for security

---

## Ready to Deploy?

Once all variables are set:
```
✅ All required variables added
✅ Values verified correct
✅ Scopes configured
✅ Ready to deploy!
```

Trigger a new deploy: **Deploys** → **Trigger deploy** → **Deploy site**

