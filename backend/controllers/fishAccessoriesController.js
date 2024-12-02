// controllers/fishAccessoriesController.js
const fishAccessories = require('../data/FishAccessories.json');

exports.getFishAccessories = (req, res) => {
  const { page = 1, limit = 12 } = req.query;

  // Convert page and limit to integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Calculate start and end index for slicing fish products array
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  // Slice the fish products array to get the current page of products
  const paginatedProducts = fishAccessories.products.slice(startIndex, endIndex);

  // Return paginated products and total count
  res.json({
    totalProducts: fishAccessories.totalProducts,
    products: paginatedProducts,
  });
};

exports.getSingleFishAccessories = (req, res) => {
  const product = fishAccessories.products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

// You can add more controller functions here for creating, updating, and deleting fish products as needed.
