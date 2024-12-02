import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add to cart (if not already in the cart)
    const addToCart = (product) => {
        if (!isInCart(product.id)) {
            setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
        } else {
            incrementItem(product.id); // Increment if already in cart
        }
    };

    // Check if a product is in the cart
    const isInCart = (productId) => cart.some(product => product.id === productId);

    // Remove an item from the cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    // Clear the entire cart
    const clearCart = () => setCart([]);

    // Increment item quantity in cart
    const incrementItem = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Decrement item quantity in cart
    const decrementItem = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, isInCart, removeFromCart, clearCart, incrementItem, decrementItem }}
        >
            {children}
        </CartContext.Provider>
    );
};
