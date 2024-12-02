const catchAsyncError = require('../middlewares/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncError(async (req, res, next) => {
    try {
        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount, // Amount in cents
            currency: 'usd',
            description: 'Test Payment',
            shipping: req.body.shipping, // Optional, includes shipping details
        });

        // Respond with the client secret required for the frontend
        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret,
        });
    } catch (error) {
        next(error); // Pass error to error handling middleware
    }
});

exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY, // Stripe public key
    });
});
