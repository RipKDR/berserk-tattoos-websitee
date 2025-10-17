# Stripe Booking System Setup Guide

## Overview

This guide will help you set up the complete Stripe booking system for Berserk Tattoos website.

## Prerequisites

- Stripe account (create at [stripe.com](https://stripe.com))
- Netlify account (for hosting and serverless functions)
- Node.js installed (v14 or higher)

## Step 1: Install Dependencies

```bash
cd berserk-tattoos-website
npm install
```

This will install the Stripe Node.js library required for the serverless functions.

## Step 2: Set Up Stripe Account

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Create your Stripe account
3. Complete business verification (required for live payments)

### Get Your API Keys

1. Go to **Developers** → **API keys** in your Stripe Dashboard
2. You'll see two sets of keys:

   - **Test keys** (for development) - start with `pk_test_` and `sk_test_`
   - **Live keys** (for production) - start with `pk_live_` and `sk_live_`

3. **Start with test keys** for development

## Step 3: Configure Environment Variables

Create a `.env` file in the `berserk-tattoos-website` directory:

```env
# Stripe Test Keys (for development)
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_PUBLISHABLE_KEY

# Stripe Webhook Secret (we'll get this in Step 5)
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# Site URL
URL=http://localhost:8888
```

### For Netlify Deployment

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `URL` (your production URL: https://berserktattoos.com)

## Step 4: Configure Netlify Functions

Your Netlify configuration is already set up in `netlify.toml`. The functions will be automatically deployed when you push to your repository.

### Test Functions Locally

Install Netlify CLI:

```bash
npm install -g netlify-cli
```

Run development server:

```bash
netlify dev
```

This starts a local server at `http://localhost:8888` with functioning serverless functions.

## Step 5: Set Up Stripe Webhooks

Webhooks allow Stripe to notify your application when payments are completed.

### For Development (Testing)

1. Install Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. Log in to Stripe CLI:

```bash
stripe login
```

3. Forward webhooks to your local dev server:

```bash
stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook
```

4. Copy the webhook signing secret (starts with `whsec_`) and add it to your `.env` file

### For Production

1. Go to **Developers** → **Webhooks** in your Stripe Dashboard
2. Click **Add endpoint**
3. Enter your endpoint URL: `https://berserktattoos.com/.netlify/functions/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** and add it to your Netlify environment variables

## Step 6: Customize Payment Settings

### Update Consultation Fee

In `netlify/functions/create-booking.js`, line 27:

```javascript
const consultationFee = 5000; // $50.00 in cents
```

Change this value to your desired consultation fee (in cents).

### Update Success/Cancel URLs

The URLs are already configured, but verify they match your domain:

```javascript
success_url: `${process.env.URL}/payment-success.html?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
cancel_url: `${process.env.URL}/book.html?cancelled=true`,
```

## Step 7: Test the Booking Flow

### Test Cards

Use Stripe test cards for testing:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Authentication**: 4000 0025 0000 3155

Use any future expiry date, any 3-digit CVC, and any 5-digit ZIP code.

### Testing Checklist

1. ✅ Select an artist
2. ✅ Fill in personal details
3. ✅ Choose date and time
4. ✅ Enter design brief
5. ✅ Review summary
6. ✅ Complete Stripe payment
7. ✅ Verify webhook receives event
8. ✅ Check confirmation email (when implemented)

## Step 8: Enable Email Notifications

The webhook handler includes placeholder functions for sending emails. Integrate with your preferred email service:

### Option 1: SendGrid

```bash
npm install @sendgrid/mail
```

Update `netlify/functions/stripe-webhook.js`:

```javascript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendConfirmationEmail(email, metadata) {
  const msg = {
    to: email,
    from: "bookings@berserktattoos.com",
    subject: "Booking Confirmed - Berserk Tattoos",
    html: `<!-- Your email template here -->`,
  };

  await sgMail.send(msg);
}
```

### Option 2: Mailgun

```bash
npm install mailgun-js
```

### Option 3: AWS SES, Postmark, etc.

Choose your preferred email service and implement the `sendConfirmationEmail` function.

## Step 9: Go Live

### Before Going Live:

1. ✅ Test all booking flows thoroughly
2. ✅ Switch to live Stripe keys
3. ✅ Update webhook endpoint to production URL
4. ✅ Verify email notifications work
5. ✅ Test on multiple devices and browsers
6. ✅ Set up payment reconciliation process
7. ✅ Train staff on handling bookings

### Switch to Live Mode:

1. Get your **live** API keys from Stripe Dashboard
2. Update Netlify environment variables with live keys
3. Create a new webhook endpoint for production URL
4. Update `STRIPE_WEBHOOK_SECRET` with production webhook secret

## Step 10: Monitor and Maintain

### Stripe Dashboard

Monitor payments and bookings in your Stripe Dashboard:

- **Payments** → View all transactions
- **Customers** → Manage customer data
- **Webhooks** → Monitor webhook deliveries

### Logging

The serverless functions log to Netlify's function logs:

- Go to **Functions** in your Netlify dashboard
- Click on a function to view logs
- Monitor for errors and successful bookings

## Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is correct in Stripe Dashboard
2. Verify `STRIPE_WEBHOOK_SECRET` is set correctly
3. Check Netlify function logs for errors
4. Test webhook locally with Stripe CLI first

### Payment Not Completing

1. Verify Stripe keys are correct
2. Check browser console for JavaScript errors
3. Verify `create-booking` function is deployed
4. Check if CORS is properly configured

### Form Data Not Saving

1. Check localStorage in browser dev tools
2. Verify form field names match JavaScript
3. Check browser console for validation errors

## Security Best Practices

1. ✅ **Never commit** `.env` file to git (it's in `.gitignore`)
2. ✅ Always use **test keys** for development
3. ✅ Verify webhook signatures (already implemented)
4. ✅ Validate all input on serverside
5. ✅ Use HTTPS for all production URLs
6. ✅ Regularly rotate API keys
7. ✅ Monitor Stripe Dashboard for suspicious activity

## Additional Features to Implement

### Database Integration

Consider adding a database to store bookings:

- **Firebase Firestore** (easy setup, real-time)
- **MongoDB Atlas** (flexible, scalable)
- **PostgreSQL** (relational, powerful)

### Calendar Integration

Sync with Google Calendar or other calendar services:

- Use Google Calendar API
- Prevent double bookings
- Send calendar invites to customers

### SMS Notifications

Send booking confirmations via SMS:

- **Twilio** (popular, reliable)
- **AWS SNS** (AWS ecosystem)
- **MessageBird** (international)

## Support

For questions or issues:

- **Stripe Support**: [https://support.stripe.com](https://support.stripe.com)
- **Netlify Support**: [https://www.netlify.com/support/](https://www.netlify.com/support/)
- **Documentation**: See `agents/` folder for additional guides

## Resources

- [Stripe API Documentation](https://stripe.com/docs/api)
- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)

---

**Your booking system is ready! Start with test mode, verify everything works, then switch to live mode when ready.**
