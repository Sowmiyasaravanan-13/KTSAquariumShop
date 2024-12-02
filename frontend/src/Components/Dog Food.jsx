import React, { useContext } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { FaHeart } from 'react-icons/fa';
import { WishlistContext } from '../Context/WishlistContext'; // Ensure the path is correct
import Droolschicken50gm from '../assets/img/Droolschicken 50gm.jpeg';
import MilkBoneJar from '../assets/img/MilkBoneJar.jpeg';
import PedigreeAdultChicken from '../assets/img/PedigreeAdultChicken.jpeg';
import PedigreePuppyChicken from '../assets/img/PedigreePuppyChicken.jpeg';
import PedigreeAdultChickenandVeg from '../assets/img/PedigreeAdultChickenandVeg.jpeg';
import PedigreePuppyChickenandMilk from '../assets/img/PedigreePuppyChickenandMilk.jpeg';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DogFood = () => {
  const { addToWishlist, isInWishlist } = useContext(WishlistContext);

  const products = [
    { 
      id: 1,
      image: Droolschicken50gm,
      name: 'Drools Chicken Chunks Liver in 150gm',
    },
    {
      id: 2,
      image: MilkBoneJar,
      name: 'DROOL MILK BONE JAR ABSOLUTECALCIUM 20 PC',
    },
    {
      id: 3,
      image: PedigreeAdultChicken,
      name: 'PEDIGREE ADULT CHICKEN & LIVER IN GRAVY 70GM',
    },
    {
      id: 4,
      image: PedigreePuppyChicken,
      name: 'PEDIGREE PUPPY CHICKEN MILK 370GM',
    },
    {
      id: 5,
      image: PedigreeAdultChickenandVeg,
      name: 'PEDIGREE ADULT CHICKEN & VEG 2.8KG',
    },
    {
      id: 6,
      image: PedigreePuppyChickenandMilk,
      name: 'PEDIGREE PUPPY CHICKEN & MILK 2.8KG',
    },
    {
      id: 7,
      image: PedigreePuppyChickenandCig,
      name: 'PEDIGREE PUPPY CHICKEN & CIG 70GM',
    },
    {
      id: 8,
      image: PedigreeAdultChickenandVeg5,
      name: 'PEDIGREE ADULT CHICKEN & VEG 5 370GM',
    },
    {
      id: 9,
      image: PedigreeAdultChickenandVeg5sign,
      name: 'PEDIGREE ADULT CHICKEN & VEG 5 1.1KG',
    },
    {
      id: 10,
      image: PedigreePuppyChickenandMilk5,
      name: 'PEDIGREE PUPPY CHICKEN & MILK 5 90GM',
    },
    {
      id: 11,
      image: PedigreePuppyChickenandMilk5sign,
      name: 'PEDIGREE PUPPY CHICKEN & MILK 5 1KG',
    },
    {
      id: 12,
      image: PedigreeProMotherBreed,
      name: 'PEDIGREE PRO PUPPY LARGE BREED MOTHER PUPPY 3KG',
    },
    {
      id: 13,
      image: PurepetMunchySticksMutton,
      name: 'PUREPET MUNCHY STICKS MUTTON 1KG',
    },
    {
      id: 14,
      image: PurepetMunchySticksBeef,
      name: 'PUREPET MUNCHY STICKS BEEF 1KG',
    },
    {
      id: 15,
      image: PurepetMunchySticksMutton500gm,
      name: 'PUREPET MUNCHY STICKS MUTTON 500GM',
    },
    {
      id: 16,
      image: PurepetMunchySticksBeef500gm,
      name: 'PUREPET MUNCHY STICKS BEEF 500GM',
    },
  ];

  const handleAddToWishlist = (product) => {
    if (!isInWishlist(product.id)) {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-cover bg-center bg-fixed">
        <div className="container mx-auto p-4 pt-24 bg-white bg-opacity-80">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">🐶Dog Food🍖</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow flex flex-col justify-between transition-transform duration-300 transform hover:scale-105 hover:shadow-lg bg-white bg-opacity-90">
                <div>
                  <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
                  <h2 className="text-xl text-purple-700 font-bold">{product.name}</h2>
                </div>
                <div className="flex justify-between items-center mt-4">
                  {/* View Details Button */}
                  <Link 
                    to={`/dogaccessories/${product.id}`} 
                    className="text-lg hover:text-blue-600 p-2 transition duration-300 bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleAddToWishlist(product)} 
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default DogFood;
