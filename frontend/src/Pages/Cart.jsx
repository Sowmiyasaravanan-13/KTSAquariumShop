import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import stripePromise from '../utils/Stripe'; // Ensure you import your stripe.js

const Cart = () => {
    const { cart, removeFromCart, clearCart, incrementItem, decrementItem } = useContext(CartContext);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            // Prepare the products array for Stripe checkout
            const products = cart.map(product => ({
                name: product.name,
                price: parseFloat(product.price), // Ensure the price is a float
                quantity: product.quantity,
                image: `http://localhost:5001${product.image}`, // Adjust the image path as needed
            }));

            const { data } = await axios.post('http://localhost:5001/api/v1/process', { products });

            if (data && data.sessionId) {
                const stripe = await stripePromise; // Await the stripe promise
                await stripe.redirectToCheckout({ sessionId: data.sessionId }); // Use sessionId from the backend response
            } else {
                console.error('Invalid response from backend:', data);
            }
        } catch (error) {
            console.error('Error creating Stripe checkout session:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 pt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2">
                <h1 className="text-3xl font-bold text-pink-700 mb-4">Your Cart: {cart.length} items</h1>
                {cart.length === 0 ? (
                    <p className="text-pink-600">Your cart is empty.</p>
                ) : (
                    <div>
                        {cart.map((product) => (
                            <div key={product.id} className="flex items-center justify-between border-b py-4">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={`http://localhost:5001${product.image}`} // Dynamically render product image
                                        alt={product.name}
                                        className="w-24 h-24 object-cover rounded"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Fallback image
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold">{product.name}</h2>
                                        <p className="text-gray-700">₹{parseFloat(product.price).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => decrementItem(product.id)} className="bg-red-500 text-white w-8 h-8 rounded">-</button>
                                    <span>{product.quantity}</span>
                                    <button onClick={() => incrementItem(product.id)} className="bg-blue-500 text-white w-8 h-8 rounded">+</button>
                                    <button onClick={() => removeFromCart(product.id)} className="text-red-500">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-4 bg-gray-100 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <p className="mb-2">Subtotal: <span className="font-semibold">{cart.length} (Units)</span></p>
                <p className="mb-4">Est. total: <span className="font-semibold">₹{cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}</span></p>
                <button onClick={handleCheckout} className="bg-green-500 text-white py-2 px-4 rounded mt-4 w-full">Proceed to Checkout</button>
                <button onClick={clearCart} className="bg-red-500 text-white py-2 px-4 rounded mt-4 w-full">Clear Cart</button>
            </div>
        </div>
    );
};

export default Cart;
