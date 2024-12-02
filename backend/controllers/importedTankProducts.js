const importedTankProducts = require('../data/ImportedTankProducts.json');

exports.getImportedTankProducts = (req, res) => {
  let { page = 1, limit = 12 } = req.query;

  // Parse page and limit to ensure they are numbers
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  // Handle invalid page or limit values
  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 12;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Slice the products array for pagination
  const paginatedProducts = importedTankProducts.products.slice(startIndex, endIndex);

  res.json({
    totalProducts: importedTankProducts.products.length,
    products: paginatedProducts,
  });
};

exports.getSingleImportedTankProduct = (req, res) => {
  // Ensure the ID is parsed as an integer
  const productId = parseInt(req.params.id, 10);
  if (isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  const product = importedTankProducts.products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ product });
};
