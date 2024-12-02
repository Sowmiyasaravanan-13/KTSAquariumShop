import React, { useState, useContext } from 'react';
import Navbar from '../Components/Navbar';
import Modal from 'react-modal';
import { CartContext } from '../Context/CartContext';  // Ensure the path is correct

import LetsBiteCatKitten from '../assets/img/LetsBiteCatKitten.jpeg';
import LetsBitePersianCatOcean from '../assets/img/LetsBitePersianCatOcean.jpeg';
import PurepetCatRealChicken from '../assets/img/PurepetCatRealChicken.jpeg';
import WhiskasGravy85gm from '../assets/img/WhiskasGravy85gm.jpeg';
import WhiskasTuna85gm from '../assets/img/WhiskasTuna85gm.jpeg';
import WhiskasJuniorMilk450gm from '../assets/img/WhiskasJuniorMilk450gm.jpeg';
import PedigreePuppyChickenandCig from '../assets/img/PedigreePuppyChickenandCig.jpeg';
import PedigreeAdultChickenandVeg5 from '../assets/img/PedigreeAdultChickenandVeg5.jpeg';
import PedigreeAdultChickenandVeg5sign from '../assets/img/PedigreeAdultChickenandVeg5sign.jpeg';
import PedigreePuppyChickenandMilk5 from '../assets/img/PedigreePuppyChickenandMilk5.jpeg';
import PedigreePuppyChickenandMilk5sign from '../assets/img/PedigreePuppyChickenandMilk5sign.jpeg';
import PedigreeProMotherBreed from '../assets/img/PedigreeProMotherBreed.jpeg';
import PurepetMunchySticksMutton from '../assets/img/PurepetMunchySticksMutton.jpeg';
import PurepetMunchySticksBeef from '../assets/img/PurepetMunchySticksBeef.jpeg';
import PurepetMunchySticksMutton500gm from '../assets/img/PurepetMunchySticksMutton500gm.jpeg';
import PurepetMunchySticksBeef500gm from '../assets/img/PurepetMunchySticksBeef500gm.jpeg';

const CatFood = () => {
  const { addToCart, isInCart } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const products = [
    { 
     id: 1,
     image: LetsBiteCatKitten,
     name: 'LETS BITE CAT KITTEN 400GM',
     price: 298.00
    },
    {
        id:2,
        image:LetsBitePersianCatOcean,
        name:'DROOLS ACTIVE PERSIAN OCEAN FISH SARADINE EGG LETS BITE CAT 500 GM',
        price:298.00
    },
    {
        id:3,
        image:PurepetCatRealChicken,
        name:'DROOLS PUREPET CAT REAL CHICKEN LIVER IN GRAVY 70GM',
        price:37.50
    },
    {
      id:4,
      image:WhiskasGravy85gm,
      name:'WHISKAS AD SIJ 85GM  SALMON IN GRAVY',
      price:75.00
    },
    {
      id:5,
      image:WhiskasTuna85gm,
      name:'WHISKAS KIT TUNA 85GM',
      price:75.00

    },
    {
      id:6,
      image:WhiskasJuniorMilk450gm,
      name:'WHISKAS POC JUNIOR OF MILKY 450GM JUNIOR 2-12 MONTH OCEAN FISH FLA',
      price:352.50
    },
    {
      id:7,
      image:PedigreePuppyChickenandCig,
      name:'PEDIGREE PUPPY CHICKEN & CIG 70GM',
      price:75.00
    },
    {
      id:8,
      image:PedigreeAdultChickenandVeg5,
      name:'PEDIGREE ADULT CHICKEN & VEG 5 370GM',
      price:150.00
    },
    {
      id:9,
      image:PedigreeAdultChickenandVeg5sign,
      name:'PEDIGREE ADULT CHICKEN & VEG 5 1.1KG',
      price:427.50
    },
    {
      id:10,
      image:PedigreePuppyChickenandMilk5,
      name:'PEDIGREE PUPPY CHICKEN & MILK 5 90GM',
      price:37.50
    },
    {
      id:11,
      image:PedigreePuppyChickenandMilk5sign,
      name:'PEDIGREE PUPPY CHICKEN & MILK 5 1KG',
      price:480.00
    },
    {
      id:12,
      image:PedigreeProMotherBreed,
      name:'PEDIGREE PRO PUPPY LARGE BREED MOTHER PUPPY 3KG',
      price:1680.00
    },
    {
      id:13,
      image:PurepetMunchySticksMutton,
      name:'PUREPET MUNCHY STICKS MUTTON 1KG',
      price:360.00
    },
    {
      id:14,
      image:PurepetMunchySticksBeef,
      name:'PUREPET MUNCHY STICKS BEEF 1KG',
      price:360.00
    },
    {
      id:15,
      image:PurepetMunchySticksMutton500gm,
      name:'PUREPET MUNCHY STICKS MUTTON 500GM',
      price:195.00
    },
    {
      id:16,
      image:PurepetMunchySticksBeef500gm,
      name:'PUREPET MUNCHY STICKS BEEF 500GM',
      price:195.00
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

  return (
    <>
      
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed" 
        
      >
        <div className="container mx-auto p-4 pt-24 bg-white bg-opacity-80">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">Cat Food</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow flex flex-col justify-between transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                <div>
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
                  <h2 className="text-xl text-purple-700 font-bold">{product.name}</h2>
                  <p className="text-lg text-black font-bold">₹{product.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => openModal(product)} 
                  className={`mt-2 ${isInCart(product.id) ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-red-600'} text-black font-bold py-2 px-4 rounded-full self-end transition-colors duration-300`}
                  disabled={isInCart(product.id)}
                >
                  {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                </button>
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
    </>
  );
};

export default CatFood;