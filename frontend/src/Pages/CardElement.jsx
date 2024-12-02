import React from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to replace this with your own public Stripe API key
const stripePromise = loadStripe('pk_test_51PmBBDLKF6cjSrz9uj3hbfVA3iEp4EBmR8CETyqRT7AY3xqs9BKosrFAfnLuP8NXdzfTiUqBd8RTNrWfmXedCvKt00ZneqfvhY');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error('Error:', error);
        } else {
            // Handle successful payment method creation
            console.log('Payment Method:', paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay Now
            </button>
        </form>
    );
};

const CardElementWrapper = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default CardElementWrapper;
