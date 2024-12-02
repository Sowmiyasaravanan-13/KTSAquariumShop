import React, { useContext } from 'react';
import { WishlistContext } from '../Context/WishlistContext'; // Adjust the path accordingly
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  const handleRemoveClick = (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your wishlist?')) {
      removeFromWishlist(productId);
      toast.success('Product removed from wishlist!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container mx-auto p-5">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-5">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. <Link to="/" className="text-blue-500">Continue shopping</Link>.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded p-5">
              <img src={`http://localhost:5001${product.image}`} alt={product.name} className="w-full h-40 object-cover mb-3 rounded"/>
              
              <Link to={`/product/${product.id}`}>
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              </Link>
              
              <p className="text-gray-700 mb-3">{product.description}</p>
              
              <p className="text-lg font-bold mb-3">
                <span className="text-gray-700">₹{product.price}</span>
              </p>
              
              <button
                onClick={() => handleRemoveClick(product.id)}
                className="bg-red-500 text-white px-3 py-2 rounded"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
