// src/components/FishAccessoryDetails.js

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext'; // Import CartContext
import { ToastContainer, toast } from 'react-toastify'; // Import Toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const FishAccessoriesProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, addToWishlist } = useContext(CartContext); // Access addToCart and addToWishlist functions from context

  useEffect(() => {
    fetch(`http://localhost:5001/api/v1/fishaccessories/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto mt-8">
      {product ? (
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={`http://localhost:5001${product.image}`}
            alt={product.name}
            className="w-full md:w-1/2 object-cover rounded-lg shadow-md mb-4 md:mb-0 md:mr-4"
          />
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="text-red-500 font-bold text-lg mr-2">{product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through">{product.originalPrice}</span>
              )}
            </div>
            <p className={`text-lg font-semibold mb-4 ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            {product.inStock && (
              <>
                <button
                  onClick={handleAddToCart}
                  className="text-lg hover:text-green-600 p-2 transition duration-300 bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="text-lg hover:text-green-600 p-2 transition duration-300 bg-red-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  Add to Wishlist
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default FishAccessoriesProductDetails;
