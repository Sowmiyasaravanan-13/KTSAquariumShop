import React, { useContext, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuVisible, setUserMenuVisible] = useState(false);
  const [isFishMenuVisible, setFishMenuVisible] = useState(false); // For Fish submenu
  const [isDogMenuVisible, setDogMenuVisible] = useState(false); // For Dog submenu
 // const [isCatMenuVisible, setCatMenuVisible] = useState(false); // For Cat submenu
  const [isBirdMenuVisible, setBirdMenuVisible] = useState(false); // For Bird submenu
  const [isGalleryMenuVisible, setGalleryMenuVisible] = useState(false); // For Gallery submenu
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = useCallback(() => {
    fetch('https://localhost:5001/api/v1/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
          navigate('/login');
        } else {
          console.error('Failed to logout');
        }
      })
      .catch((error) => console.error('Error logging out:', error));
  }, [navigate, setIsAuthenticated]);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Toggle submenu visibility on click
  const toggleSubMenu = (setVisibleMenu, currentVisibility) => {
    setVisibleMenu(!currentVisibility);
  };

  return (
    <>
      {/* Top Header with Logo and Contact Info */}
      
      {/* Main Navigation */}
      <nav className="bg-blue-800 p-5">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            KTS Aquarium and Exotic Pets
          </Link>
          <div className="flex space-x-4 items-center">
            {/* Category Dropdown */}
            <div className="relative">
              <select className="bg-white text-gray-700 p-2 rounded">
                <option>All Categories</option>
                <option>Fish</option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
              </select>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded"
                placeholder="Search..."
              />
              <button type="submit" className="absolute right-0 top-0 p-2 bg-green-600 text-white rounded-r">
                <FaSearch />
              </button>
            </form>

            {/* Cart Icon with Counter */}
            <Link to="/cart" className="text-white text-lg hover:text-blue-600 p-2 transition duration-300 flex items-center relative">
              <FaShoppingCart className="mr-2" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Wishlist Icon with Counter */}
            <Link to="/wishlist" className="text-white text-lg hover:text-blue-600 p-2 transition duration-300 flex items-center relative">
              <FaHeart className="mr-2" />
              Wishlist
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-3 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Account Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setUserMenuVisible(true)}
                onMouseLeave={() => setUserMenuVisible(false)}
                className="text-white text-lg hover:text-blue-600 p-2 transition duration-300 flex items-center"
              >
                <FaUser className="mr-2" />
                Account
              </button>
              {isUserMenuVisible && (
                <ul
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-20"
                  onMouseEnter={() => setUserMenuVisible(true)}
                  onMouseLeave={() => setUserMenuVisible(false)}
                >
                  {isAuthenticated ? (
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:text-green-400"
                      >
                        Logout
                      </button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to="/login" className="block px-4 py-2 text-gray-700 hover:text-green-400">
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:text-green-400">
                          Create an Account
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-blue-800">
          <div className="container mx-auto flex p-5 justify-around">
            <Link to="/" className="text-white text-lg">
              Home
            </Link>

            {/* Fish Menu with Clickable Submenu */}
            <div className="relative">
              <button
                onClick={() => toggleSubMenu(setFishMenuVisible, isFishMenuVisible)}
                className="text-white text-lg hover:text-blue-400 flex items-center"
              >
                Fish <FaChevronDown className="ml-1" />
              </button>
              {isFishMenuVisible && (
                <ul className="absolute mt-2 bg-white text-gray-800 rounded shadow-lg z-10">
                  <li>
                    <Link to="/livefish" className="block px-4 py-2 hover:bg-gray-100">
                      Live Fish
                    </Link>
                  </li>
                  <li>
                    <Link to="/fishaccessories" className="block px-4 py-2 hover:bg-gray-100">
                      Fish Accessories
                    </Link>
                  </li>
                  <li>
                    <Link to="/fishfood" className="block px-4 py-2 hover:bg-gray-100">
                      Fish Food
                    </Link>
                  </li>
                  <li>
                    <Link to="/importedtanks" className="block px-4 py-2 hover:bg-gray-100">
                      Imported Tanks
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Dog Menu with Clickable Submenu */}
            <div className="relative">
              <button
                onClick={() => toggleSubMenu(setDogMenuVisible, isDogMenuVisible)}
                className="text-white text-lg hover:text-blue-400 flex items-center"
              >
                Dog <FaChevronDown className="ml-1" />
              </button>
              {isDogMenuVisible && (
                <ul className="absolute mt-2 bg-white text-gray-800 rounded shadow-lg z-10">
                  <li>
                    <Link to="/livedog" className="block px-4 py-2 hover:bg-gray-100">
                      Live Dog
                    </Link>
                  </li>
                  <li>
                    <Link to="/dogaccessories" className="block px-4 py-2 hover:bg-gray-100">
                      Dog Accessories
                    </Link>
                  </li>
                  <li>
                    <Link to="/dogfood" className="block px-4 py-2 hover:bg-gray-100">
                      Dog Food
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Birds Menu with Clickable Submenu */}
            <div className="relative">
              <button
                onClick={() => toggleSubMenu(setBirdMenuVisible, isBirdMenuVisible)}
                className="text-white text-lg hover:text-blue-400 flex items-center"
              >
                Birds <FaChevronDown className="ml-1" />
              </button>
              {isBirdMenuVisible && (
                <ul className="absolute mt-2 bg-white text-gray-800 rounded shadow-lg z-10">
                  <li>
                    <Link to="/livebirds" className="block px-4 py-2 hover:bg-gray-100">
                      Live Birds
                    </Link>
                  </li>
                  <li>
                    <Link to="/birdsaccessories" className="block px-4 py-2 hover:bg-gray-100">
                      Birds Accessories
                    </Link>
                  </li>
                  <li>
                    <Link to="/birdsfood" className="block px-4 py-2 hover:bg-gray-100">
                      Birds Food
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Cat Menu with Clickable Submenu */}
            {/*
            <div className="relative">
              <button
                onClick={() => toggleSubMenu(setCatMenuVisible, isCatMenuVisible)}
                className="text-white text-lg hover:text-blue-400 flex items-center"
              >
                Cat <FaChevronDown className="ml-1" />
              </button>
              {isCatMenuVisible && (
                <ul className="absolute mt-2 bg-white text-gray-800 rounded shadow-lg z-10">
                  <li>
                    <Link to="/livecat" className="block px-4 py-2 hover:bg-gray-100">
                      Live Cat
                    </Link>
                  </li>
                  <li>
                    <Link to="/cataccessories" className="block px-4 py-2 hover:bg-gray-100">
                      Cat Accessories
                    </Link>
                  </li>
                  <li>
                    <Link to="/catfood" className="block px-4 py-2 hover:bg-gray-100">
                      Cat Food
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            */}

            {/* Gallery Link */}
            <div className="relative">
              <button
                onClick={() => toggleSubMenu(setGalleryMenuVisible, isGalleryMenuVisible)}
                className="text-white text-lg hover:text-blue-400 flex items-center"
              >
                Gallery <FaChevronDown className="ml-1" />
              </button>
              {isGalleryMenuVisible && (
                <ul className="absolute mt-2 bg-white text-gray-800 rounded shadow-lg z-10">
                  <li>
                    <Link to="/gallery" className="block px-4 py-2 hover:bg-gray-100">
                      View Gallery
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <Link to="/aboutus" className="text-white text-lg">
              AboutUs
            </Link>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
