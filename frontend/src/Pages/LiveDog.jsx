import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../Context/WishlistContext';
import { ToastContainer } from 'react-toastify';

const LiveDog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/livedog`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Check what the API returns
        setProducts(data.products || []); // Safely access the products array
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching live dog products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Live Dogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? products.map(product => (
          <div 
            key={product.id} 
            className="border p-4 rounded relative transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              {product.image ? (
                <img 
                src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}  
                  alt={product.name} 
                  className="w-full h-48 object-cover mb-4 rounded" 
                />
              ) : (
                <p>No image available</p>
              )}
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              
              {/*<span className="text-green-500 font-bold mb-4 block">{product.price}</span>*/}
            </div>
            <div className="flex justify-between items-center mt-4">
              <Link 
                to={`/livedog/${product.id}`} 
                className="text-lg hover:bg-purple-600 p-2 transition duration-300 bg-blue-500 text-white font-bold py-2 px-4 rounded-full inline-flex items-center"
              >
                View Details
              </Link>
              <button 
                onClick={() => handleToggleWishlist(product)} 
                className="text-lg transition duration-300"
              >
                
              </button>
            </div>
            <ToastContainer/>
          </div>
        )) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default LiveDog;
