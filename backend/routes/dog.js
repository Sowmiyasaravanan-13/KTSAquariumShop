const express = require('express');
const { getDogProducts, getSingleDogProduct } = require('../controllers/dogProductController');
const router = express.Router();

// Route to get all dog products with pagination
router.get('/livedog', getDogProducts);

// Route to get a single dog product by ID
router.get('/livedog/:id', getSingleDogProduct);

// You can add more routes here for creating, updating, and deleting live dog products as needed.

module.exports = router;
