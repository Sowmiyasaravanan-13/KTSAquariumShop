import React from 'react';

const FishVarietyMenu = ({ selectedVariety, setSelectedVariety }) => {
  const varieties = [
    'All', 'Guppy', 'Arowana', 'Koi Fish', 'Puffer Fish', 
    'Goldfish', 'Betta Fish', 'Discus Fish', 'Cichlids', 
    'Albino Fish', 'Gourami Fish', 'Shark Fish', 'Angel Fish', 
    'Zebra Fish', 'Tiger Barb', 'Oranda Fish','Parrot Fish', 'Black Ghost Fish','Shrimp Fish','Petro Chithimba','Widow Fish', 'Taiwan Reef', 'Morph Fish', 'Peacock Fish'
  ];

  return (
    <div className="flex flex-col items-start mb-4">
      {varieties.map((variety) => (
        <button
          key={variety}
          onClick={() => setSelectedVariety(variety)}
          className={`px-4 py-2 my-1 ${selectedVariety === variety ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
        >
          {variety}
        </button>
      ))}
    </div>
  );
};

export default FishVarietyMenu;
