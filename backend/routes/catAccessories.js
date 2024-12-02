const express = require('express');
const { getCatAccessories, getSingleCatAccessories } = require('../controllers/catAccessoriesController');
const router = express.Router();

// Route to get all cat accessories
router.get('/cataccessories', getCatAccessories);

// Route to get a single cat accessory by ID
router.get('/cataccessories/:id', getSingleCatAccessories);

// You can add more routes here for creating, updating, and deleting cat accessories as needed.

module.exports = router;
