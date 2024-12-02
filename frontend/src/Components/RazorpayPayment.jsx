import React from 'react';

const RazorpayPayment = ({ product }) => {
  const openRazorpayCheckout = () => {
    const options = {
      key: 'rzp_test_zeZc53RPnHEhNt', // Replace with your Razorpay key
      amount: product.price * 100, // Amount in paise
      currency: 'INR',
      name: 'KTS Aquarium and Exotic Pets',
      description: `Payment for ${product.name}`,
      image: 'https://example.com/your-logo.png', // Optional
      handler: function (response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        // Optionally send this info to your backend to verify the payment
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9150030327',
      },
      notes: {
        address: 'Your Address',
      },
      theme: {
        color: '#F37254', // Customize the theme color
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleCOD = () => {
    alert(`Order placed with Cash on Delivery option for ${product.name}!`);
    // Send the order details to your backend
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '400px', margin: 'auto', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
      {/* Product Image */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '10px' }}
        />
      </div>

      {/* Product Name */}
      <h3 style={{ color: '#333', marginBottom: '10px', textAlign: 'center' }}>{product.name}</h3>

      {/* Price Summary */}
      <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '20px' }}>
        <p style={{ fontWeight: 'bold', color: '#555' }}>Price Summary:</p>
        <h4 style={{ color: '#F37254' }}>₹{product.price}</h4>
      </div>

      {/* Razorpay Button */}
      <button
        onClick={openRazorpayCheckout}
        style={{
          backgroundColor: '#F37254',
          color: '#fff',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Pay with Razorpay
      </button>

      {/* Cash on Delivery Button */}
      <button
        onClick={handleCOD}
        style={{
          marginTop: '10px',
          backgroundColor: '#28a745',
          color: '#fff',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Cash on Delivery
      </button>
    </div>
  );
};

export default RazorpayPayment;
