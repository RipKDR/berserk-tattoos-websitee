/**
 * Netlify Function: Create Booking
 * Handles booking creation and initiates Stripe Checkout session
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse booking data
    const bookingData = JSON.parse(event.body);

    // Validate required fields
    const requiredFields = ['artist', 'firstName', 'lastName', 'email', 'phone', 'appointmentDate', 'appointmentTime'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: `Missing required field: ${field}` })
        };
      }
    }

    // Generate unique booking ID
    const bookingId = `BT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Consultation fee (in cents)
    const consultationFee = 5000; // $50.00

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'Tattoo Consultation',
              description: `Consultation with ${bookingData.artistName || bookingData.artist}`,
              images: ['https://berserktattoos.com/og-image.jpg'],
            },
            unit_amount: consultationFee,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL || 'https://berserktattoos.com'}/payment-success.html?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${process.env.URL || 'https://berserktattoos.com'}/book.html?cancelled=true`,
      customer_email: bookingData.email,
      client_reference_id: bookingId,
      metadata: {
        bookingId: bookingId,
        artist: bookingData.artist,
        artistName: bookingData.artistName || '',
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        phone: bookingData.phone,
        appointmentDate: bookingData.appointmentDate,
        appointmentTime: bookingData.appointmentTime,
        placement: bookingData.placement || '',
        size: bookingData.size || '',
        description: bookingData.description || '',
        timestamp: new Date().toISOString()
      },
      payment_intent_data: {
        metadata: {
          bookingId: bookingId,
          artist: bookingData.artist,
          appointmentDate: bookingData.appointmentDate,
          appointmentTime: bookingData.appointmentTime
        }
      }
    });

    // In production, save booking to database here
    // Example: await saveBookingToDatabase(bookingId, bookingData, 'pending');

    // Log booking creation (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Booking created: ${bookingId} for ${bookingData.email}`);
    }

    // Return success with Stripe URL
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        bookingId: bookingId,
        stripeUrl: session.url,
        sessionId: session.id
      })
    };

  } catch (error) {
    console.error('Booking creation error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create booking',
        message: error.message
      })
    };
  }
};

