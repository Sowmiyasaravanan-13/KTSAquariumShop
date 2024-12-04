import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import FishVarietyMenu from '../Components/FishVarietyMenu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LiveFish = () => {
  
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedVariety, setSelectedVariety] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const productsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/livefish?page=${currentPage}&limit=${productsPerPage}&variety=${selectedVariety}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.products || []);
        setTotalProducts(data.totalProducts || 0);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      });
  }, [currentPage, selectedVariety]);

  return (
    <div className="container mx-auto mt-8 flex">
      <div className="w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">Fish Varieties</h2>
        <FishVarietyMenu selectedVariety={selectedVariety} setSelectedVariety={setSelectedVariety} />
      </div>
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Live Fish</h1>
        
        <h2 className="text-xl font-bold mb-4">{selectedVariety === 'All' ? 'All Varieties' : selectedVariety}</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className="border p-4 rounded relative transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`} // Use backend URL for image
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded animate-slow-fade"
                  />
                  <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                </div>
                <div className="flex justify-center mt-4">
                  <Link
                    to={`/livefish/${product.id}`} // Navigate to the details page for the specific product
                    className="text-lg transition duration-300 bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    aria-label={`View details for ${product.name}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`text-lg p-2 transition duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-600'}`}
            aria-disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <FaArrowLeft /> Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= Math.ceil(totalProducts / productsPerPage)}
            className={`text-lg p-2 transition duration-300 ${currentPage >= Math.ceil(totalProducts / productsPerPage) ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-600'}`}
            aria-disabled={currentPage >= Math.ceil(totalProducts / productsPerPage)}
            aria-label="Next page"
          >
            Next <FaArrowRight />
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default LiveFish;
