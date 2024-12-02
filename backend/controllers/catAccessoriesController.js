const catAccessories = require('../data/CatAccessories.json');

// Function to get paginated cat accessories
exports.getCatAccessories = (req, res) => {
  const { page = 1, limit = 12 } = req.query;

  // Convert page and limit to integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Calculate start and end index for slicing cat accessories array
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  // Slice the cat accessories array to get the current page of products
  const paginatedProducts = catAccessories.products.slice(startIndex, endIndex);

  // Return paginated products and total count
  res.json({
    totalProducts: catAccessories.totalProducts,
    products: paginatedProducts,
  });
};

// Function to get a single cat accessory by ID
exports.getSingleCatAccessories = (req, res) => {
  const product = catAccessories.products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

// You can add more controller functions here for creating, updating, and deleting cat accessories as needed.