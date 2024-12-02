import React, { useEffect } from 'react';

function Checkout() {
  useEffect(() => {
    // Dynamically load the Razorpay script
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = () => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: 50000,
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      image: "https://yourcompany.com/logo.png",
      handler: function (response) {
        alert(`Payment Successful: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Your Address Here",
      },
      theme: {
        color: "#F37254",
      },
      // Add this to catch errors
      modal: {
        ondismiss: function () {
          alert("Payment process cancelled");
        },
      },
    };
    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <h2>Checkout Page</h2>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
}

export default Checkout;
