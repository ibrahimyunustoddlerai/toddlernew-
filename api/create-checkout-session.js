// Stripe Checkout Session API
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export default async function handler(req, res) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ message: 'OK' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId: priceIdFromBody, customerId, userEmail } = req.body || {};
    const priceId = priceIdFromBody || process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return res.status(400).json({ error: 'Missing priceId. Configure STRIPE_PRICE_ID in env or send priceId in request.' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/dashboard`,
      customer_email: userEmail,
      customer: customerId || undefined,
      metadata: {
        userEmail: userEmail,
      },
      subscription_data: {
        metadata: {
          userEmail: userEmail,
        },
      },
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    return res.status(500).json({
      error: 'Failed to create checkout session',
      details: error.message
    });
  }
}