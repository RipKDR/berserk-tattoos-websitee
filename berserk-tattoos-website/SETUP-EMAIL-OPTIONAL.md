# Email Notifications Setup Guide (Optional)

## 📧 Overview

This guide explains how to add email notifications to the Berserk Tattoos booking system. **Emails are optional** - the booking system works perfectly without them, but they enhance the customer experience.

---

## 🎯 What Emails Are Sent?

### 1. **Customer Confirmation Email**
Sent to customer after successful booking:
- Booking confirmation
- Appointment details
- Artist information
- Preparation instructions
- Contact information

### 2. **Studio Notification Email**  
Sent to Berserk Tattoos staff:
- New booking alert
- Customer details
- Design brief
- Consultation type (phone/in-person)

---

## ⚙️ Email Service Options

Choose one of these email providers:

| Provider | Free Tier | Emails/Month | Setup Difficulty | Recommended For |
|----------|-----------|--------------|------------------|-----------------|
| **SendGrid** | Yes | 100/day (3,000/month) | Easy | ⭐ Most Popular |
| **Mailgun** | Yes | 1,000/month (first 3 months) | Medium | High volume |
| **AWS SES** | Yes (if AWS customer) | 62,000/month | Hard | AWS users |
| **Postmark** | No | Pay-as-you-go ($1.25/1000) | Easy | Transactional focus |

**Recommendation:** Start with **SendGrid** - it's free, reliable, and easy to set up.

---

## 📨 Option 1: SendGrid Setup (Recommended)

### Step 1: Create SendGrid Account

1. Go to **https://sendgrid.com/**
2. Click **"Start for Free"**
3. Fill out signup form:
   - Email: Your work email
   - Company: "Berserk Tattoos"
   - Website: "berserktattoos.com"
4. Verify your email address

### Step 2: Complete Account Setup

1. Log in to SendGrid dashboard
2. Complete onboarding:
   - **Sender Identity**: Add `bookings@berserktattoos.com`
   - Verify it's you (click email verification link)
3. Skip the integration wizard for now

### Step 3: Get API Key

1. In left sidebar, go to **Settings → API Keys**
2. Click **"Create API Key"**
3. **API Key Name**: "Berserk Tattoos Website"
4. **API Key Permissions**: Select **"Full Access"**
5. Click **"Create & View"**
6. **IMPORTANT:** Copy the API key (starts with `SG.`)
   - You'll only see this once!
   - Save it securely (password manager)

### Step 4: Add to Netlify

1. Go to Netlify Dashboard → Your site
2. **Site settings → Environment variables**
3. Click **"Add a variable"**
4. **Key**: `SENDGRID_API_KEY`
5. **Value**: Paste your SendGrid API key
6. Click **"Create variable"**
7. **Redeploy site**

### Step 5: Update Webhook Function

Open `netlify/functions/stripe-webhook.js` and update the `sendConfirmationEmail` function:

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendConfirmationEmail(email, metadata) {
  const msg = {
    to: email,
    from: 'bookings@berserktattoos.com', // Must match verified sender
    subject: 'Booking Confirmed - Berserk Tattoos',
    html: `
      <h1>Booking Confirmed!</h1>
      <p>Thank you for booking with Berserk Tattoos.</p>
      <h2>Appointment Details:</h2>
      <ul>
        <li><strong>Artist:</strong> ${metadata.artistName}</li>
        <li><strong>Date:</strong> ${metadata.appointmentDate}</li>
        <li><strong>Time:</strong> ${metadata.appointmentTime}</li>
        <li><strong>Booking ID:</strong> ${metadata.bookingId}</li>
      </ul>
      <p>We'll see you soon!</p>
    `
  };

  await sgMail.send(msg);
}
```

### Step 6: Install SendGrid Package

In your project:

```bash
cd berserk-tattoos-website
npm install @sendgrid/mail --save
```

Commit and push to trigger Netlify deployment.

### Step 7: Test

1. Complete a test booking
2. Check SendGrid Dashboard → **Activity**
3. Verify email was sent
4. Check your inbox for confirmation email

---

## 📨 Option 2: Mailgun Setup

### Step 1: Create Mailgun Account

1. Go to **https://www.mailgun.com/**
2. Sign up for free account
3. Verify email and complete onboarding

### Step 2: Add Domain (or use sandbox)

**Option A: Use Sandbox Domain (Quick Test)**
- Mailgun provides a sandbox domain immediately
- Can only send to authorized recipients
- Good for testing

**Option B: Add Custom Domain (Production)**
- Add `mail.berserktattoos.com` to Mailgun
- Add DNS records (Mailgun provides instructions)
- Verify domain (takes 24-48 hours)

### Step 3: Get API Key

1. Go to **Settings → API Keys**
2. Copy your **Private API key**
3. Add to Netlify environment variables:
   - **Key**: `MAILGUN_API_KEY`
   - **Value**: Your Mailgun API key

### Step 4: Update Function

```javascript
const mailgun = require('mailgun-js');
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: 'mail.berserktattoos.com' // Or sandbox domain
});

async function sendConfirmationEmail(email, metadata) {
  const data = {
    from: 'Berserk Tattoos <bookings@mail.berserktattoos.com>',
    to: email,
    subject: 'Booking Confirmed',
    html: `...email template...`
  };

  await mg.messages().send(data);
}
```

### Step 5: Install Package

```bash
npm install mailgun-js --save
```

---

## 📨 Option 3: AWS SES Setup

**Best if:** You already use AWS for other services.

### Quick Setup:

1. Go to **AWS Console → SES**
2. Verify email identity: `bookings@berserktattoos.com`
3. Request production access (SES starts in sandbox mode)
4. Get IAM credentials (Access Key + Secret)
5. Add to Netlify:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`

### Install Package:

```bash
npm install @aws-sdk/client-ses --save
```

**Note:** AWS SES is more complex - only recommended if you're comfortable with AWS.

---

## 🎨 Email Template Customization

### Create Professional Email Template:

```javascript
function generateBookingEmail(metadata) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
        .header { background: #7B1113; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-family: 'Cinzel', Georgia, serif; }
        .content { padding: 30px; }
        .details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .details h2 { color: #7B1113; margin-top: 0; }
        .details ul { list-style: none; padding: 0; }
        .details li { padding: 8px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; padding: 20px; }
        .button { display: inline-block; background: #7B1113; color: white; padding: 15px 30px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>BERSERK TATTOOS</h1>
          <p>Booking Confirmation</p>
        </div>
        <div class="content">
          <p>Thank you for choosing Berserk Tattoos!</p>
          
          <div class="details">
            <h2>Your Appointment</h2>
            <ul>
              <li><strong>Artist:</strong> ${metadata.artistName}</li>
              <li><strong>Date:</strong> ${metadata.appointmentDate}</li>
              <li><strong>Time:</strong> ${metadata.appointmentTime}</li>
              <li><strong>Booking ID:</strong> ${metadata.bookingId}</li>
            </ul>
          </div>

          <h3>What's Next?</h3>
          <ul>
            <li>✅ Bring a valid photo ID</li>
            <li>✅ Eat a good meal beforehand</li>
            <li>✅ Wear comfortable clothing</li>
            <li>✅ Arrive 10 minutes early</li>
          </ul>

          <a href="https://berserktattoos.com/aftercare.html" class="button">View Aftercare Guide</a>

          <p><strong>Location:</strong> 33 Southern Road, Heidelberg Heights, VIC 3081</p>
          <p><strong>Contact:</strong> 0478 128 212 | berserk.tattoos.au@gmail.com</p>
        </div>
        <div class="footer">
          <p>&copy; 2025 Berserk Tattoos. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
```

---

## 🧪 Testing Emails

### SendGrid Test:

1. Log in to SendGrid
2. Go to **Email API → Integration Guide**
3. Choose **"Web API"** → **"Node.js"**
4. Click **"Send test email"**
5. Check inbox

### Test with Real Booking:

1. Complete booking with your email
2. Check function logs in Netlify
3. Look for: "Email sent successfully" or errors
4. Check email inbox (and spam folder)

---

## 🐛 Troubleshooting

### Issue: "Email not sent"

**Check:**
- [ ] API key is correct in Netlify env vars
- [ ] Email service package is installed (`@sendgrid/mail`)
- [ ] Function has been redeployed after adding env var
- [ ] Sender email is verified in email service dashboard
- [ ] Check Netlify function logs for specific error

### Issue: "Email goes to spam"

**Solutions:**
- Verify your sending domain (not `@gmail.com`)
- Add SPF/DKIM records to DNS
- Use reputable sender address
- Don't use spam trigger words in subject

### Issue: "Rate limit exceeded"

**Solutions:**
- SendGrid free tier: 100/day max
- Add delay between emails if sending in bulk
- Upgrade to paid plan if needed

---

## 💰 Cost Comparison

### Free Tiers:

| Provider | Free Limit | After Free | Best For |
|----------|------------|------------|----------|
| SendGrid | 100/day (3,000/month) | $14.95/month (40k) | Small studios |
| Mailgun | 1,000/month (3 months) | $35/month (50k) | Medium volume |
| AWS SES | 62,000/month (if using EC2) | $0.10/1,000 | High volume |

**For Berserk Tattoos:**
- If < 100 bookings/day: SendGrid free tier is perfect
- If > 100/day: Upgrade to SendGrid Pro ($14.95/month)

---

## ✅ Checklist

- [ ] Chose email provider (SendGrid recommended)
- [ ] Created account and verified sender email
- [ ] Got API key
- [ ] Added `SENDGRID_API_KEY` to Netlify env vars
- [ ] Installed email package (`npm install @sendgrid/mail`)
- [ ] Updated `stripe-webhook.js` with email function
- [ ] Deployed to Netlify
- [ ] Tested with real booking
- [ ] Confirmed email received
- [ ] Checked spam folder (if not received)
- [ ] Customized email template with branding

---

## 🚫 Skipping Email Setup

**You can skip email setup entirely!** The booking system will:
- ✅ Still accept bookings
- ✅ Still process payments
- ✅ Still show success page
- ✅ Still store booking data

**Without emails:**
- ❌ Customers don't get automated confirmation
- ❌ You need to manually check Stripe Dashboard for bookings
- ❌ No automatic notifications to studio

**Workaround without emails:**
- Check Stripe Dashboard daily for new bookings
- Manually call/email customers to confirm
- Use Stripe webhooks logs to track bookings

---

## 📞 Support

**SendGrid:**
- Docs: https://docs.sendgrid.com/
- Support: https://support.sendgrid.com/

**Mailgun:**
- Docs: https://documentation.mailgun.com/
- Support: support@mailgun.com

---

**🎉 Once email is configured, customers will receive beautiful branded confirmation emails automatically!**

**Last Updated:** October 2025  
**Version:** 1.0.0

