// controllers/dogProductController.js
const path = require("path");
const dogProducts = require(path.join(__dirname, '../data/dogProducts.json'));

exports.getDogProducts = (req, res) => {
  const { page = 1, limit = 12 } = req.query;

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  const paginatedProducts = dogProducts.products.slice(startIndex, endIndex);

  res.json({
    totalProducts: dogProducts.products.length,
    products: paginatedProducts,
  });
};

exports.getSingleDogProduct = (req, res) => {
  const product = dogProducts.products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({ product });  // Return product data as an object
};
