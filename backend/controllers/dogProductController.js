const path = require("path");
const dogProducts = require(path.join(__dirname, '../data/dogProducts.json'));

exports.getDogProducts = (req, res) => {
  let { page = 1, limit = 12 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 12;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

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
