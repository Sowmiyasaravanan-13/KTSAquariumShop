import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { FaHeart } from 'react-icons/fa';
import Navbar from './Navbar';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import PetsLifeHandFeedingBird500gm from '../assets/img/PetsLifeHandFeedingBird500gm.jpeg';
import PetsLifeCalciumMedicine50ml from '../assets/img/PetsLifeCalciumMedicine50ml.jpeg';
import PetsLifeMultiVitaminsMedicine50ml from '../assets/img/PetsLifeMultiVitaminsMedicine50ml.jpeg';
import PetsLifeBCompluseMedicine50ml from '../assets/img/PetsLifeBCompluseMedicine50ml.jpeg';
import PetsLifeHandFeedingFormula500ml from '../assets/img/PetsLifeHandFeedingFormula500ml.jpeg';
import BirdsCareHerbalPlus60ml from '../assets/img/BirdsCareHerbalPlus60ml.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BirdsFood = () => {
  const { addToCart, isInCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const products = [
    { 
      id: 1,
      image: PetsLifeHandFeedingBird500gm,
      name: 'PETSLIFE BIRD FOOD 500GM HANDFEEDING',
      price: 750.00
    },
    {
      id: 2,
      image: PetsLifeCalciumMedicine50ml,
      name: 'Petslife calcium medicine 50ml',
      price: 270.00
    },
    {
      id: 3,
      image: PetsLifeMultiVitaminsMedicine50ml,
      name: 'PETSLIFE MULTIVITAMINS MEDICINE 50ML',
      price: 270.00
    },
    {
      id: 4,
      image: PetsLifeBCompluseMedicine50ml,
      name: 'PETSLIFE B COMPLUS MEDICINE 50ML',
      price: 270.00
    },
    {
      id: 5,
      image: PetsLifeHandFeedingFormula500ml,
      name: 'PETSLIFE HANDFEEDING FORMULA 500ML',
      price: 760.00
    },
    {
      id: 6,
      image: BirdsCareHerbalPlus60ml,
      name: 'BIRDS CARE HERBAL PLUS 60ML',
      price: 230.00
    }
  ];

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    closeModal();
  };

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-cover bg-center bg-fixed">
        <div className="container mx-auto p-4 pt-24 bg-white bg-opacity-80">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">🦜Birds Food 🐦</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow flex flex-col justify-between transition-transform duration-300 transform hover:scale-105 hover:shadow-lg bg-white bg-opacity-90">
                <div>
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-lg text-gray-700">₹{product.price.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button 
                    onClick={() => openModal(product)} 
                    className={`mt-2 ${isInCart(product.id) ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded transition-colors duration-300`}
                    disabled={isInCart(product.id)}
                  >
                    {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                  <button 
                    onClick={() => handleToggleWishlist(product)} 
                    className={`text-red-500 hover:text-red-600 ${isInWishlist(product.id) ? 'text-red-600' : 'text-gray-500'}`}
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add to Cart Modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedProduct && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add to Cart</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="text-lg">{selectedProduct.name}</h3>
            <p className="text-lg text-gray-700">₹{selectedProduct.price.toFixed(2)}</p>
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleAddToCart} 
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
              <button 
                onClick={closeModal} 
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </>
  );
};

export default BirdsFood;
