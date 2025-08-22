# ToddlerChef AI Premium Setup Guide

This guide will help you set up the premium subscription features for ToddlerChef AI using Firebase Authentication, Firestore, and Stripe.

## Prerequisites

- Vercel account for hosting
- Firebase account (Google)
- Stripe account for payments
- Node.js and npm installed locally

## 1. Firebase Setup

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "toddlerchef-ai" (or your preferred name)
4. Enable Google Analytics (optional)
5. Complete project creation

### Enable Authentication
1. In Firebase Console, go to "Authentication" → "Get started"
2. Go to "Sign-in method" tab
3. Enable "Email/Password" provider
4. Optionally enable "Google" provider for social login
5. Add your domain (e.g., `toddlerchef-ai.vercel.app`) to authorized domains

### Set up Firestore Database
1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode" (we'll secure it later)
3. Select your preferred region
4. Create the database

### Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" → Web app
4. Register your app with nickname "ToddlerChef AI"
5. Copy the config object
6. Update `firebase-config.js` with your actual values:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

### Generate Service Account Key
1. Go to Project Settings → "Service accounts" tab
2. Click "Generate new private key"
3. Download the JSON file
4. Save the following values for Vercel environment variables:
   - `projectId` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`  
   - `private_key` → `FIREBASE_PRIVATE_KEY`

## 2. Stripe Setup

### Create Stripe Account
1. Sign up at [Stripe Dashboard](https://dashboard.stripe.com/)
2. Complete account verification
3. Go to "Developers" → "API keys"
4. Copy your "Publishable key" and "Secret key"

### Create Product and Price
1. Go to "Products" → "Add product"
2. Create product: "ToddlerChef AI Premium"
3. Set price: $4.99/month (recurring)
4. Copy the Price ID (starts with `price_`)

### Set up Webhook
1. Go to "Developers" → "Webhooks" → "Add endpoint"
2. Set URL: `https://your-domain.vercel.app/api/stripe-webhook`
3. Listen to events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the webhook signing secret

## 3. Environment Variables

Create these environment variables in Vercel:

### Firebase Variables
```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

### Stripe Variables
```bash
STRIPE_SECRET_KEY=sk_live_xxx... (or sk_test_xxx for testing)
STRIPE_PUBLISHABLE_KEY=pk_live_xxx... (or pk_test_xxx for testing)
STRIPE_WEBHOOK_SECRET=whsec_xxx...
STRIPE_PREMIUM_PRICE_ID=price_xxx...
```

### OpenAI Variable (existing)
```bash
OPENAI_API_KEY=sk-xxx...
```

## 4. Vercel Deployment

1. Install dependencies:
```bash
npm install
```

2. Deploy to Vercel:
```bash
vercel --prod
```

3. Set environment variables in Vercel Dashboard:
   - Go to your project → Settings → Environment Variables
   - Add all the variables listed above

## 5. Firestore Security Rules

Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Recipes can be read by authenticated users, written by their creators
    match /recipes/{recipeId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.createdBy;
    }
  }
}
```

## 6. Testing

### Test Authentication
1. Go to your deployed site
2. Try signing up with a test email
3. Check Firebase Console → Authentication to see the user
4. Check Firestore → users collection for user document

### Test Stripe (Test Mode)
1. Use Stripe test cards: `4242 4242 4242 4242`
2. Use any future expiration date and CVC
3. Complete checkout flow
4. Check Stripe Dashboard → Payments for test transactions
5. Verify webhook receives events

### Test Recipe Generation
1. Sign in as a free user
2. Try generating 1 recipe (should work)
3. Try generating a 2nd recipe (should be blocked)
4. Upgrade to premium (test mode)
5. Try generating unlimited recipes

## 7. Going Live

### Switch to Stripe Live Mode
1. Complete Stripe account activation
2. Replace test keys with live keys in Vercel
3. Update webhook URL to live environment
4. Test with real payment method

### Firebase Production Settings
1. Update Firestore rules for production
2. Enable Firebase App Check for additional security
3. Set up proper error monitoring

## 8. Features Overview

### Free Tier
- 1 AI recipe generation per month
- Access to 3 sample recipes
- Basic account features

### Premium Tier ($4.99/month)
- Unlimited AI recipe generation
- Access to 20+ curated favourites
- Advanced meal planning tools
- Nutritional analytics
- Priority support

## 9. Troubleshooting

### Common Issues

1. **Firebase connection errors**
   - Check API keys are correct
   - Verify domain is in authorized domains
   - Check browser console for specific errors

2. **Stripe webhook not working**
   - Verify webhook URL is correct
   - Check webhook signing secret
   - Look at Stripe webhook logs

3. **Authentication not persisting**
   - Check Firebase config
   - Verify HTTPS is used in production
   - Clear browser cache and cookies

4. **Recipe generation failing**
   - Check OpenAI API key
   - Verify user has remaining usage
   - Check server logs for errors

### Support

For issues, check:
1. Vercel function logs
2. Firebase Console logs
3. Stripe webhook logs
4. Browser developer console

## 10. Cost Estimates

### Monthly costs for moderate usage:
- **Firebase**: Free up to 50K auth users, 1GB Firestore
- **Stripe**: 2.9% + 30¢ per successful charge
- **Vercel**: Free for personal projects, $20/month for teams
- **OpenAI**: ~$10-50/month depending on recipe generation volume

Total estimated cost: **$30-100/month** for a growing user base.

## Security Best Practices

1. Never expose secret keys in client-side code
2. Use Firebase security rules to protect user data
3. Validate all API inputs server-side
4. Monitor Stripe webhooks for suspicious activity
5. Implement rate limiting on recipe generation
6. Use HTTPS everywhere in production
7. Regularly review and rotate API keys

## Next Steps

1. Set up monitoring and analytics
2. Implement email notifications for subscriptions
3. Add more premium features (meal planning, nutrition tracking)
4. Set up customer support system
5. Implement referral programs
6. Add mobile responsiveness improvements

This setup provides a solid foundation for a subscription-based SaaS application with proper authentication, payment processing, and usage tracking.