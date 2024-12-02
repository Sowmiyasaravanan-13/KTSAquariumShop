const express = require('express');
const { checkPaymentIntent } = require('../utils/stripeUtils'); // Import the function

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Ensure this is your Stripe secret key
const router = express.Router();

router.post('/payment', async (req, res) => {
    try {
        const { products } = req.body;

        // Check if products is defined and is an array
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Products data is missing or invalid.' });
        }

        // Create a Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: products.map(product => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        // Send the session URL to the frontend
        res.json({ url: session.url });
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ error: error.message });
    }
});
// Route to check payment intent status
router.get('/check-payment-intent/:id', async (req, res) => {
    const { id } = req.params; // Get the payment intent ID from the URL
  
    try {
      const paymentIntent = await checkPaymentIntent(id); // Call the function
      if (paymentIntent) {
        res.json(paymentIntent); // Send back the payment intent details if successful
      } else {
        res.status(404).json({ error: 'Payment not found or unsuccessful' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving payment intent' });
    }
  });
  


module.exports = router;
