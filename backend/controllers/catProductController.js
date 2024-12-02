// controllers/catProductController.js
const catProducts = require('../data/catProducts.json');

exports.getCatProducts = (req, res) => {
  const { page = 1, limit = 12 } = req.query;

  // Convert page and limit to integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Calculate start and end index for slicing cat products array
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  // Slice the cat products array to get the current page of products
  const paginatedProducts = catProducts.products.slice(startIndex, endIndex);

  // Return paginated products and total count
  res.json({
    totalProducts: catProducts.totalProducts,
    products: paginatedProducts,
  });
};

exports.getSingleCatProduct = (req, res) => {
  const product = catProducts.products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};
