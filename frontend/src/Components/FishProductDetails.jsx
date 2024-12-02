import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';

const FishDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null); // State for notification

  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/v1/livefish/${id}`);
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
      setNotification(`${product.name} (${quantity}) has been added to your cart.`);
      setTimeout(() => {
        navigate('/cart'); // Redirect to cart page
      }, 1000); // Optional: delay to allow notification to be seen
    } else {
      alert('Please select a valid quantity.');
    }
  };

  const handleWishlistToggle = () => {
    if (wishlist.some(item => item.id === product.id)) {
      removeFromWishlist(product.id);
      setNotification(`${product.name} has been removed from your wishlist.`);
    } else {
      addToWishlist(product);
      setNotification(`${product.name} has been added to your wishlist.`);
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

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="font-medium text-gray-700">
              Quantity:
            </label>
            <input 
              type="number" 
              id="quantity" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
              className="w-16 px-2 py-1 border rounded"
              min="1" 
              max={product.quantity || 10} 
            />
          </div>

          <div className="flex space-x-4 mt-4">
            <button 
              onClick={handleAddToCart}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={handleWishlistToggle}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            >
              {wishlist.some(item => item.id === product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Notification Popup */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default FishDetails;
