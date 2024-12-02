// controllers/dogProductController.js
const birdsProducts = require('../data/BirdsProducts.json');

exports.getBirdsProducts = (req, res) => {
  const { page = 1, limit = 12 } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  const paginatedProducts = birdsProducts.products.slice(startIndex, endIndex);

  res.json({
    totalProducts: birdsProducts.products.length,
    products: paginatedProducts,
  });
};

exports.getSingleBirdsProduct = (req, res) => {
  const product = birdsProducts.products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ product });  // Return product data as an object
};
