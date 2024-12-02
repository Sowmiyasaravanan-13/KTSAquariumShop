import React, { useState} from 'react';
import Modal from 'react-modal';

import InchGold from '../assets/img/InchGold.jpeg'; 
import InchGold180gm from '../assets/img/InchGold180gm.jpeg';
import InchGoldLargeArowana700gm from '../assets/img/InchGoldLargeArowana700gm.jpeg';
import InchGoldLargeArowana454gm from '../assets/img/InchGoldLargeArowana454gm.jpeg';
import InchGoldSmallFishFood80gm from '../assets/img/InchGoldSmallFishFood80gm.jpeg';
import RedCoinFoodTin25gm from '../assets/img/RedCoinFoodTin25gm.jpeg';
import TaiyoPouch20gm from '../assets/img/TaiyoPouch20gm.jpeg';
import TaiyoPouch50gm from '../assets/img/TaiyoPouch50gm.jpeg';
import TaiyoPouch100gm from '../assets/img/TaiyoPouch100gm.jpeg';
import TaiyoPouch500gm from '../assets/img/TaiyoPouch500gm.jpeg';
import TaiyoPouch1kg from '../assets/img/TaiyoPouch1kg.jpeg';
import TaiyoTropicalFlakes25gm from '../assets/img/TaiyoTropicalFlakes25gm.jpeg';
import ProRichArowana60gm from '../assets/img/ProRichArowana60gm.jpeg';
import Optimum100gm from '../assets/img/Optimum100gm.jpeg';
import Optimum200gm from '../assets/img/Optimum200gm.jpeg';
import OsakaGreen100gm from '../assets/img/OsakaGreen100gm.jpeg';

Modal.setAppElement('#root'); // Set the app element for accessibility

const FishFood = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const products = [
    { 
     id: 1,
     image: InchGold,
     name: '6 INCH GOLD 180GM RED PARROT BLOODY PARROT COLOUR',
    },
    {
        id: 2,
        image: InchGold180gm,
        name: 'INCH GOLD 180GM FLOWERHORN FOOD SPECIALLY FOR FLOWEHORN',
    },
    {
        id: 3,
        image: InchGoldLargeArowana700gm,
        name: 'INCH GOLD 700GM LARGE AROWANA',
    },
    {
        id: 4,
        image: InchGoldLargeArowana454gm,
        name: 'INCH GOLD 454GM LARGE AROWANA',
    },
    {
        id: 5,
        image: InchGoldSmallFishFood80gm,
        name: 'INCH GOLD TROPICAL SMALL FISH FOOD 80GM',
    },
    {
        id: 6,
        image: RedCoinFoodTin25gm,
        name: 'RED COIN 25GM FOOD TIN RED WIN RICH PROTIEN FORMULA SUTABILLFOR  ALL FISHES',
    },
    {
        id: 7,
        image: TaiyoPouch20gm,
        name: 'TAIYO POUCH 20GM SPECILIST FISH NEVER CLOUDS',
    },
    {
        id: 8,
        image: TaiyoPouch50gm,
        name: 'TAIYO POUCH 50GM SPECILIST FISH NEVER CLOUDS',
    },
    {
        id: 9,
        image: TaiyoPouch100gm,
        name: 'TAIYO POUCH 100GM SPECIALIST FISH NEVER CLOUDS',
    },
    {
        id: 10,
        image: TaiyoPouch500gm,
        name: 'TAIYO POUCH 500GM HIGH NUTRIOUS FOOD FOR ALL FISH',
    },
    {
        id: 11,
        image: TaiyoPouch1kg,
        name: 'TAIYO POUCH 1 KG 1.2MM  SPECIALIST FISH FLOATING PELLETS',
    },
    {
        id: 12,
        image: TaiyoTropicalFlakes25gm,
        name: 'TAIYO TROPICAL FLAKES 25GM FLAKES FOR ALL GOLD FISH',
    },
    {
        id: 13,
        image: ProRichArowana60gm,
        name: 'PRORICH AROWANA 60 GM FOR AROWANUS OTHER LARGE FISHES',
    },
    {
        id: 14,
        image: Optimum100gm,
        name: 'OPTIMUM 100 GM POUCH HIGHLY NUTRITOUS FOOD FOR ALL FISHES',
    },
    {
        id: 15,
        image: Optimum200gm,
        name: 'OPTIMUM 200GM POUCH HIGHLY NUTRITOUS FOOD FOR ALL FISHES',
    },
    {
        id: 16,
        image: OsakaGreen100gm,
        name: 'OSAKA GREEN-1 100G ENHANCHED FORMULATION',
    },
  ];

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-cover bg-white bg-center bg-fixed">
        <div className="container mx-auto p-4 pt-24 bg-transparent bg-opacity-80">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">🐟Fish Food🐠</h1>
          <div className="bg-transparent grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="border rounded-lg p-4 shadow flex flex-col justify-between transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div>
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-2 rounded" />
                  <h2 className="text-xl font-semibold text-pink-400">{product.name}</h2>
                </div>
                <button 
                  onClick={() => openModal(product)} 
                  className="mt-2 bg-purple-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full self-end transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details Modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedProduct && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="text-lg">{selectedProduct.name}</h3>
            <div className="flex justify-end mt-4">
              <button 
                onClick={closeModal} 
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default FishFood;
