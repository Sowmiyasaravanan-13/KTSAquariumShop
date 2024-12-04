import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WishlistContext } from '../Context/WishlistContext';

const BirdsAccessories = () => {
  const [products, setProducts] = useState([]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    // Use the environment variable for backend URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    // Fetching bird accessories from the backend API
    fetch(`${backendUrl}/api/v1/birdsaccessories`)
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching bird accessories products:', error));
  }, []);

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist.`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Birds Accessories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div 
            key={product.id} 
            className="border p-4 rounded relative transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              {/* Ensure the full URL for the image */}
              <img 
                src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`} 
                alt={product.name} 
                className="w-full h-48 object-cover mb-4 rounded" 
              />
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            </div>
            <div className="flex justify-between items-center mt-4">
              {/* View Details Button */}
              <Link 
                to={`/birdsaccessories/${product.id}`} 
                className="text-lg hover:text-blue-600 p-2 transition duration-300 bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BirdsAccessories;
