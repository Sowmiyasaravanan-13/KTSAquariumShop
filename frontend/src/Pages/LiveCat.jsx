import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LiveCat = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/v1/livecat');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products); // Ensure the 'products' array is properly set
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={`http://localhost:5001${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              
              {/*<p className="text-green-600 font-semibold">{product.price}</p>*/}
              {/* Link to Cat Product Details Page */}
              <Link to={`/livecat/${product.id}`}>
                <button className="bg-blue-500 text-white py-2 px-4 mt-4 font-bold hover:bg-purple-600 transition rounded-full duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveCat;
