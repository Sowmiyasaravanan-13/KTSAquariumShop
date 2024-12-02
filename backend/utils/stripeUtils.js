// utils/stripeUtils.js (create this file if you want to separate the logic)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function checkPaymentIntent(paymentIntentId) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log('Payment Intent:', paymentIntent);
    
    // Check the status
    if (paymentIntent.status === 'succeeded') {
      console.log('Payment was successful!');
      return paymentIntent; // Return the payment intent if needed
    } else {
      console.log('Payment not successful. Status:', paymentIntent.status);
      return null; // Or throw an error based on your needs
    }
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    throw error; // Throw an error for handling in the caller
  }
}

module.exports = { checkPaymentIntent };
