import React from 'react';

const FishMenu = ({ setCategory }) => {
  return (
    <div className="w-64">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => setCategory('LiveFish')}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-200"
          >
            Live Fish
          </button>
          <ul className="pl-4 space-y-1">
            <li>
              <button
                onClick={() => setCategory('FishAccessories')}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-200"
              >
                Fish Accessories
              </button>
            </li>
            <li>
              <button
                onClick={() => setCategory('FishFood')}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-200"
              >
                Fish Food
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default FishMenu;
