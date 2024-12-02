import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const location = useLocation();
    
    // Extract the paymentIntentId from the URL (assuming it's passed as a query parameter)
    const queryParams = new URLSearchParams(location.search);
    const paymentIntentId = queryParams.get('payment_intent_id'); // Change this according to how you pass the ID

    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/v1/check-payment-intent/${paymentIntentId}`);
                const data = response.data;

                if (data.error) {
                    console.error('Error checking payment intent:', data.error);
                } else {
                    console.log('Payment Intent Status:', data);
                    // Show payment status to the user
                }
            } catch (error) {
                console.error('Error fetching payment intent:', error);
            }
        };

        if (paymentIntentId) {
            checkPaymentStatus();
        }
    }, [paymentIntentId]);

    return (
        <div className="container mx-auto p-4 pt-24">
            <h1 className="text-3xl font-bold text-pink-700 mb-4">Payment Status</h1>
            <p>Checking your payment status...</p>
            {/* Optionally display status to the user here */}
        </div>
    );
};

export default PaymentSuccess;
