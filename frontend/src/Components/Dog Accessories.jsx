import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WishlistContext } from '../Context/WishlistContext';

const DogAccessories = () => {
  const [products, setProducts] = useState([]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    fetch('http://localhost:5001/api/v1/dogaccessories') // Adjust the URL to your backend endpoint
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching dog accessories products:', error));
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
      <h1 className="text-2xl font-bold mb-4">Dog Accessories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div 
            key={product.id} 
            className="border p-4 rounded relative transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <img src={`http://localhost:5001${product.image}`} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              
              
            </div>
            <div className="flex justify-between items-center mt-4">
              
              {/* View Details Button */}
              <Link 
                to={`/dogaccessories/${product.id}`} 
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

export default DogAccessories;
