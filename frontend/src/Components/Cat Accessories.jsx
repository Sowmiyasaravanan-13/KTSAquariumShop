import React, { useEffect, useState, useContext } from 'react';
import { FaCartPlus, FaHeart, FaRegHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';

const CatAccessories = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    fetch('http://localhost:5001/api/v1/cataccessories') // Adjust the URL to your backend endpoint
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching cat accessories products:', error));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

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
      <h1 className="text-2xl font-bold mb-4">Cat Accessories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div 
            key={product.id} 
            className="border p-4 rounded relative transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <img src={`http://localhost:5001${product.image}`} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="mb-4">
                <span className="text-red-500 font-bold text-lg mr-2">
                  {product.price}
                </span>
                <span className="text-gray-500 line-through">
                  {product.originalPrice}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button 
                onClick={() => handleAddToCart(product)} 
                className="text-lg hover:text-blue-600 p-2 transition duration-300 bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <FaCartPlus className="mr-2" /> Add to Cart
              </button>
              <button 
                onClick={() => handleToggleWishlist(product)} 
                className="text-lg transition duration-300"
              >
                {isInWishlist(product.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />} 
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CatAccessories;
