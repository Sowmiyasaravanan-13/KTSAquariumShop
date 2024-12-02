import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import context providers
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';

// Import components and pages
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import AboutUs from './Components/AboutUs';
import FishAccessories from './Components/Fish Accessories';
import FishFood from './Components/Fish Food';
import DogAccessories from './Components/Dog Accessories';
import DogFood from './Components/Dog Food';
import CatAccessories from './Components/Cat Accessories';
import CatFood from './Components/Cat Food';
import BirdsAccessories from './Components/Birds Accessories';
import BirdsFood from './Components/Birds Food';
import Login from './Pages/Login';
import Signin from './Pages/signin';
import SearchResults from './Components/SearchResults';
import LiveFish from './Pages/LiveFish';
import LiveDog from './Pages/LiveDog';
import LiveCat from './Pages/LiveCat';
import LiveBirds from './Pages/LiveBirds';
import Cart from './Pages/Cart';
import Success from './Pages/Success';
import Cancel from './Pages/Cancel';
import WishlistPage from './Pages/Wishlist';
import WhatsAppChat from './Components/WhatsAppChat';
import ProductDetails from './Components/ProductDetails';
import FishAccessoriesProductDetails from './Components/FishAccessoriesProductDetails';
import CatProductDetails from './Components/CatProductDetails';
import BirdsProductDetails from './Components/BirdsProductDetail';
import DogAccessoriesProductDetails from './Components/DogAccessoriesProductDetails';
import DogFoodDetails from './Components/DogFoodDetails';
import ImportedTanks from './Components/ImportedTanks';
import TankProductDetails from './Components/TankProductDetails';

import Checkout from './Components/Checkout';
import PrivateRoute from './Components/PrivateRoute';
import LiveFishDetails from './Components/FishProductDetails';
import BirdsAccessoriesProductDetails from './Components/BirdsAccessoriesProductDetails';
import RazorpayPayment from './Components/RazorpayPayment';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/livefish" element={<LiveFish />} />
                  <Route path="/livefish/:id" element={<LiveFishDetails />} />
                  <Route path="/fishaccessories" element={<FishAccessories />} />
                  <Route path="/fishaccessories/:id" element={<FishAccessoriesProductDetails />} />
                  <Route path="/fishfood" element={<FishFood />} />
                  <Route path="/dogfood" element={<DogFood />} />
                  <Route path="/dogfood/:id" element={<DogFoodDetails />} />
                  <Route path="/dogaccessories" element={<DogAccessories />} />
                  <Route path="/dogaccessories/:id" element={<DogAccessoriesProductDetails />} />
                  <Route path="/cataccessories" element={<CatAccessories />} />
                  <Route path="/catfood" element={<CatFood />} />
                  <Route path="/birdsaccessories" element={<BirdsAccessories />} />
                  <Route path="/birdsaccessories/:id" element={<BirdsAccessoriesProductDetails />} />
                  <Route path="/birdsfood" element={<BirdsFood />} />
                  <Route path="/livebirds" element={<LiveBirds />} />
                  <Route path="/livebirds/:id" element={<BirdsProductDetails />} />
                  <Route path="/livedog" element={<LiveDog />} />
                  <Route path="/livedog/:id" element={<ProductDetails />} />
                  <Route path="/livecat" element={<LiveCat />} />
                  <Route path="/livecat/:id" element={<CatProductDetails />} />
                  <Route path="/importedtanks" element={<ImportedTanks />} />
                  <Route path="/importedtanks/:id" element={<TankProductDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signin />} />

                  {/* Protected route using PrivateRoute for Cart */}
                  <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />

                  {/* Payment routes */}
                  <Route path="/success" element={<Success />} />
                  <Route path="/cancel" element={<Cancel />} />

                  {/* Wishlist and other features */}
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/whatsappchat" element={<WhatsAppChat />} />
                  <Route path="/payment/process" element={<Checkout />} />
                  <Route path="/razorpaypayment" element={<RazorpayPayment />} />

                  {/* Fallback Route for 404 */}
                  <Route path="*" element={<h2>404 - Page Not Found</h2>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
