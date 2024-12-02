import React, { createContext, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const StripeContext = createContext();

export const StripeProvider = ({ children }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

  return (
    <StripeContext.Provider value={{ stripePromise }}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripe = () => useContext(StripeContext);
