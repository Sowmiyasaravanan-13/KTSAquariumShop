const express = require('express');
const { getFishProducts, getSingleFishProduct } = require('../controllers/fishProductController');
const router = express.Router();

// Route to get a paginated list of all live fish products
router.get('/livefish', getFishProducts);

// Route to get details of a single fish product by ID
router.get('/livefish/:id', getSingleFishProduct);

module.exports = router;
