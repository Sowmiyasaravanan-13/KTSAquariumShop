const fishProducts = require('../data/FishProducts.json');

exports.getFishProducts = (req, res) => {
  try {
    const { page = 1, limit = 12, variety = 'All' } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Validate page and limit inputs
    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
      return res.status(400).json({ message: 'Invalid page or limit values' });
    }

    let filteredProducts = fishProducts.products;

    // Filter products by variety if applicable
    if (variety !== 'All') {
      filteredProducts = filteredProducts.filter(product => product.variety === variety);

      // If no products match the variety, return a message
      if (filteredProducts.length === 0) {
        return res.status(404).json({ message: `No products found for variety: ${variety}` });
      }
    }

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limitNumber);

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = Math.min(startIndex + limitNumber, totalProducts);

    // Ensure the start index is within the range
    if (startIndex >= totalProducts) {
      return res.status(404).json({ message: 'No products found for this page.' });
    }

    // Paginate the products
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      totalProducts,
      totalPages,
      currentPage: pageNumber,
      products: paginatedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};

exports.getSingleFishProduct = (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);

    if (isNaN(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = fishProducts.products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
};
