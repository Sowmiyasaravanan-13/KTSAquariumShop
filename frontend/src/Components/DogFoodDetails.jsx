import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext'; // Import the CartContext

const DogFoodDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { addToCart } = useContext(CartContext); // Destructure addToCart from useContext

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/v1/livedog/${id}`);
        const data = await response.json();
        setProduct(data.product);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product details');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= (product.quantity || 10)) {
      addToCart({ ...product, quantity });
      alert(`${product.name} (${quantity}) has been added to your cart.`);
    } else {
      alert('Please select a valid quantity.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="flex flex-col md:flex-row items-start bg-white shadow-md rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 p-4">
          <img 
            src={`http://localhost:5001${product.image}`} 
            alt={product.name} 
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="mb-4">
            {product.originalPrice && (
              <p className="text-xl font-semibold text-gray-600 line-through">
                ₹{product.originalPrice}
              </p>
            )}
            <p className="text-2xl font-semibold text-green-600">
              ₹{product.price}
            </p>
          </div>

         
          <p className={`text-lg mb-2 ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
            Status: {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>

          <div className="flex space-x-4 mt-4">
            <button 
              onClick={handleAddToCart}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>
            {/* Add to Wishlist button or any other actions */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogFoodDetails;
