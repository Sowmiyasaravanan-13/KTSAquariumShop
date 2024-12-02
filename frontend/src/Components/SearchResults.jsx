import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // Extract the search query from the URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');

  useEffect(() => {
    if (searchQuery) {
      // Fetch products based on the search query
      axios
        .get(`https://localhost:5001/api/v1/products/search?q=${encodeURIComponent(searchQuery)}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold">Search Results for: {searchQuery}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-green-600 font-bold">{product.price}</p>
              <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline mt-2 block">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No products found for your search query.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
