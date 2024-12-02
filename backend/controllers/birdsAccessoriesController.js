// controllers/birdsAccessoriesController.js
const birdsAccessories = require('../data/BirdsAccessories.json');

exports.getBirdsAccessories = (req, res) => {
  const { page = 1, limit = 12 } = req.query;

  // Convert page and limit to integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Calculate start and end index for slicing fish products array
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  // Slice the fish products array to get the current page of products
  const paginatedProducts = birdsAccessories.products.slice(startIndex, endIndex);

  // Return paginated products and total count
  res.json({
    totalProducts: birdsAccessories.totalProducts,
    products: paginatedProducts,
  });
};

exports.getSingleBirdsAccessories = (req, res) => {
  const product = birdsAccessories.products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

// You can add more controller functions here for creating, updating, and deleting fish products as needed.
