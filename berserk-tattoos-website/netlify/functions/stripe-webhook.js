/**
 * Netlify Function: Stripe Webhook Handler
 * Handles Stripe webhook events for payment confirmation
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let stripeEvent;

  try {
    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` })
    };
  }

  // Handle different event types
  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(stripeEvent.data.object);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(stripeEvent.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(stripeEvent.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };

  } catch (error) {
    console.error('Webhook handling error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook handler failed' })
    };
  }
};

// Handle successful checkout session
async function handleCheckoutCompleted(session) {
  const bookingId = session.client_reference_id;
  const customerEmail = session.customer_email;
  const metadata = session.metadata;

  console.log(`Checkout completed for booking: ${bookingId}`);

  // Update booking status in database
  // Example: await updateBookingStatus(bookingId, 'confirmed', session.id);

  // Send confirmation email to customer
  await sendConfirmationEmail(customerEmail, metadata);

  // Send notification to studio
  await sendStudioNotification(metadata);

  // Log successful payment
  console.log(`Payment confirmed for ${customerEmail} - Booking ${bookingId}`);
}

// Handle successful payment intent
async function handlePaymentSucceeded(paymentIntent) {
  const bookingId = paymentIntent.metadata.bookingId;

  console.log(`Payment succeeded for booking: ${bookingId}`);

  // Additional payment confirmation logic
  // Example: await confirmPaymentInDatabase(bookingId, paymentIntent.id);
}

// Handle failed payment
async function handlePaymentFailed(paymentIntent) {
  const bookingId = paymentIntent.metadata.bookingId;

  console.error(`Payment failed for booking: ${bookingId}`);

  // Update booking status and notify customer
  // Example: await updateBookingStatus(bookingId, 'payment_failed');
  // Example: await sendPaymentFailedEmail(paymentIntent.customer_email);
}

// Send confirmation email (placeholder - integrate with email service)
async function sendConfirmationEmail(email, metadata) {
  // In production, integrate with email service like SendGrid, Mailgun, etc.
  console.log(`Sending confirmation email to: ${email}`);

  // Example email content:
  const emailContent = {
    to: email,
    subject: 'Booking Confirmed - Berserk Tattoos',
    html: `
            <h2>Your Consultation is Confirmed!</h2>
            <p>Hi ${metadata.firstName},</p>
            <p>Thank you for booking your consultation with ${metadata.artistName}.</p>
            <p><strong>Appointment Details:</strong></p>
            <ul>
                <li>Date: ${metadata.appointmentDate}</li>
                <li>Time: ${metadata.appointmentTime}</li>
                <li>Artist: ${metadata.artistName}</li>
                <li>Booking ID: ${metadata.bookingId}</li>
            </ul>
            <p>We look forward to seeing you!</p>
            <p>Questions? Contact us at berserk.tattoos.au@gmail.com or 0478 128 212</p>
        `
  };

  // Implement actual email sending here
  // await emailService.send(emailContent);
}

// Send notification to studio
async function sendStudioNotification(metadata) {
  console.log('Sending notification to studio');

  // In production, send notification via email, Slack, SMS, etc.
  const notification = {
    subject: `New Booking: ${metadata.firstName} ${metadata.lastName}`,
    message: `
            New consultation booking received:
            
            Customer: ${metadata.firstName} ${metadata.lastName}
            Email: ${metadata.email}
            Phone: ${metadata.phone}
            Artist: ${metadata.artistName}
            Date: ${metadata.appointmentDate} at ${metadata.appointmentTime}
            Placement: ${metadata.placement}
            Size: ${metadata.size}
            Description: ${metadata.description}
            Booking ID: ${metadata.bookingId}
        `
  };

  // Implement notification sending here
}

