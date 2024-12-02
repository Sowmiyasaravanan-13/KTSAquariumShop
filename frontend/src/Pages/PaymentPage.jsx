import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const handlePayment = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const billingInfo = {
            name: formData.get('name'),
            email: formData.get('email'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip'),
            cardNumber: formData.get('cardNumber'),
            expiryDate: formData.get('expiryDate'),
            cvv: formData.get('cvv'),
        };

        try {
            const response = await axios.post('http://localhost:5001/api/v1/payment/process', {
                products: cart,
                billingInfo,
            });

            if (response.data.success) {
                navigate('/payment-success');
            } else {
                console.error('Payment failed:', response.data.message);
            }
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 pt-24">
            <h1 className="text-3xl font-bold text-pink-700 mb-4">Payment</h1>
            {cart.length === 0 ? (
                <p className="text-red-500">Your cart is empty. Please add items before proceeding.</p>
            ) : (
                <form onSubmit={handlePayment} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="mb-4">
                        {cart.map((product) => (
                            <div key={product.id} className="flex justify-between py-2 border-b">
                                <span>{product.name}</span>
                                <span>₹{parseFloat(product.price).toFixed(2)} x {product.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Billing Information</h2>
                        <input type="text" name="name" placeholder="Full Name" className="w-full mb-3 p-2 border rounded-md" required />
                        <input type="email" name="email" placeholder="Email" className="w-full mb-3 p-2 border rounded-md" required />
                        <input type="text" name="address" placeholder="Address" className="w-full mb-3 p-2 border rounded-md" required />
                        <input type="text" name="city" placeholder="City" className="w-full mb-3 p-2 border rounded-md" required />
                        <input type="text" name="state" placeholder="State" className="w-full mb-3 p-2 border rounded-md" required />
                        <input type="text" name="zip" placeholder="Zip Code" className="w-full mb-3 p-2 border rounded-md" required />
                    </div>

                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
                        <input type="text" name="cardNumber" placeholder="Card Number" className="w-full mb-3 p-2 border rounded-md" required />
                        <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" className="w-full mb-3 p-2 border rounded-md" required />
                        <input type="text" name="cvv" placeholder="CVV" className="w-full mb-3 p-2 border rounded-md" required />
                    </div>

                    <div className="flex justify-between mt-4">
                        <button type="button" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => navigate('/cart')}>
                            View Cart
                        </button>
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            Checkout
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default PaymentPage;
