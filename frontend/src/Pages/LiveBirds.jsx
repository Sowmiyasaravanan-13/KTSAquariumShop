import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../Context/WishlistContext';
import { ToastContainer, toast } from 'react-toastify';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const LiveBirds = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  // Set the backend URL dynamically, you can set it based on environment or config
  const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001'; // Default to localhost for development

  useEffect(() => {
    fetch(`${backendURL}/api/v1/livebirds`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching live birds products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, [backendURL]); // Include backendURL as a dependency

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  if (loading) return <div className="flex justify-center items-center"><span className="loader"></span></div>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Live Birds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? products.map(product => (
          <div 
            key={product.id} 
            className="border p-4 rounded relative transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              {product.image ? (
                <img 
                  src={`${backendURL}${product.image}`} 
                  alt={product.name} 
                  className="w-full h-48 object-cover mb-4 rounded" 
                />
              ) : (
                <p>No image available</p>
              )}
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Link 
                to={`/livebirds/${product.id}`} 
                className="text-lg hover:bg-purple-600 p-2 transition duration-300 bg-blue-500 text-white font-bold py-2 px-4 rounded-full inline-flex items-center"
              >
                View Details
              </Link>
              <button 
                onClick={() => handleToggleWishlist(product)} 
                className="text-lg transition duration-300"
              >
                {isInWishlist(product.id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-500" />
                )}
              </button>
            </div>
            <ToastContainer />
          </div>
        )) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default LiveBirds;
