// Stripe Webhook Handler
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Import Firebase Admin SDK functions
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    })
  });
}

const db = admin.firestore();

// Webhook endpoint secret
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  // Read raw body for Stripe signature verification
  async function getRawBody(req) {
    return await new Promise((resolve, reject) => {
      try {
        const chunks = [];
        req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', (err) => reject(err));
      } catch (e) {
        reject(e);
      }
    });
  }

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
        
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
        
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
        
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
}

// Handle successful checkout session
async function handleCheckoutSessionCompleted(session) {
  console.log('Checkout session completed:', session.id);
  
  const userEmail = session.metadata?.userEmail || session.customer_email;
  
  if (!userEmail) {
    console.error('No user email found in checkout session');
    return;
  }

  try {
    // Find user by email
    const usersSnapshot = await db.collection('users')
      .where('email', '==', userEmail)
      .limit(1)
      .get();
    
    if (usersSnapshot.empty) {
      console.error('User not found:', userEmail);
      return;
    }

    const userDoc = usersSnapshot.docs[0];
    
    // Update user subscription status
    await userDoc.ref.update({
      subscriptionStatus: 'premium',
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`Updated user ${userEmail} to premium subscription`);
    
  } catch (error) {
    console.error('Error updating user subscription:', error);
  }
}

// Handle successful invoice payment (recurring)
async function handleInvoicePaymentSucceeded(invoice) {
  console.log('Invoice payment succeeded:', invoice.id);
  
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    await updateUserSubscriptionFromStripe(subscription);
  }
}

// Handle subscription updates
async function handleSubscriptionUpdated(subscription) {
  console.log('Subscription updated:', subscription.id);
  await updateUserSubscriptionFromStripe(subscription);
}

// Handle subscription deletion
async function handleSubscriptionDeleted(subscription) {
  console.log('Subscription deleted:', subscription.id);
  
  try {
    // Find user by Stripe subscription ID
    const usersSnapshot = await db.collection('users')
      .where('stripeSubscriptionId', '==', subscription.id)
      .limit(1)
      .get();
    
    if (usersSnapshot.empty) {
      console.error('User not found for subscription:', subscription.id);
      return;
    }

    const userDoc = usersSnapshot.docs[0];
    
    // Downgrade user to free plan
    await userDoc.ref.update({
      subscriptionStatus: 'free',
      stripeSubscriptionId: admin.firestore.FieldValue.delete(),
      subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`Downgraded user to free plan for subscription: ${subscription.id}`);
    
  } catch (error) {
    console.error('Error downgrading user subscription:', error);
  }
}

// Update user subscription based on Stripe subscription object
async function updateUserSubscriptionFromStripe(subscription) {
  try {
    // Find user by Stripe subscription ID
    const usersSnapshot = await db.collection('users')
      .where('stripeSubscriptionId', '==', subscription.id)
      .limit(1)
      .get();
    
    if (usersSnapshot.empty) {
      console.error('User not found for subscription:', subscription.id);
      return;
    }

    const userDoc = usersSnapshot.docs[0];
    
    // Determine subscription status
    const status = subscription.status === 'active' ? 'premium' : 'free';
    
    // Update user subscription status
    await userDoc.ref.update({
      subscriptionStatus: status,
      subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`Updated subscription status to ${status} for subscription: ${subscription.id}`);
    
  } catch (error) {
    console.error('Error updating subscription from Stripe:', error);
  }
}

// Configure to receive raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}