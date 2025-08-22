// Confirm Stripe Checkout session without webhooks
// Verifies the session server-side and updates Firestore subscription fields

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const admin = require('firebase-admin');

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

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ error: 'Missing Authorization bearer token' });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;
    const userEmailFromToken = decoded.email;

    const { sessionId } = req.body || {};
    if (!sessionId) {
      return res.status(400).json({ error: 'Missing sessionId' });
    }

    // Retrieve the Checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription']
    });

    // Basic validation
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Ensure the session corresponds to the same email as the signed-in user
    const sessionEmail = session.customer_details?.email || session.customer_email || session.metadata?.userEmail;
    if (userEmailFromToken && sessionEmail && userEmailFromToken.toLowerCase() !== sessionEmail.toLowerCase()) {
      return res.status(403).json({ error: 'Email mismatch between session and signed-in user' });
    }

    // Accept paid sessions (and any active subscription)
    const isPaid = session.payment_status === 'paid';
    const subId = session.subscription?.id || session.subscription;
    const customerId = session.customer;

    if (!isPaid || !subId || !customerId) {
      return res.status(400).json({
        error: 'Session not completed yet',
        details: { payment_status: session.payment_status, subscription: subId, customer: customerId }
      });
    }

    // Update the user's Firestore profile to premium
    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      // Fallback: try locating by email
      if (userEmailFromToken) {
        const snapshot = await db.collection('users').where('email', '==', userEmailFromToken).limit(1).get();
        if (!snapshot.empty) {
          const ref = snapshot.docs[0].ref;
          await ref.update({
            subscriptionStatus: 'premium',
            stripeCustomerId: customerId,
            stripeSubscriptionId: subId,
            subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
        } else {
          // Create minimal profile
          await userDocRef.set({
            uid,
            email: userEmailFromToken || sessionEmail || '',
            subscriptionStatus: 'premium',
            stripeCustomerId: customerId,
            stripeSubscriptionId: subId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        }
      }
    } else {
      await userDocRef.update({
        subscriptionStatus: 'premium',
        stripeCustomerId: customerId,
        stripeSubscriptionId: subId,
        subscriptionUpdatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    return res.status(200).json({ success: true, customerId, subscriptionId: subId });
  } catch (err) {
    console.error('confirm-checkout error:', err);
    return res.status(500).json({ error: 'Failed to confirm checkout', details: err.message });
  }
}


