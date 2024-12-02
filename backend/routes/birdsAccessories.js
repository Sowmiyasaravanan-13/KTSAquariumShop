// routes/birdsAccessories.js
const express = require('express');
const { getBirdsAccessories, getSingleBirdsAccessories } = require('../controllers/birdsAccessoriesController');
const router = express.Router();

router.get('/birdsaccessories', getBirdsAccessories);
router.get('/birdsaccessories/:id', getSingleBirdsAccessories);

// You can add more routes here for creating, updating, and deleting live dog products as needed.

module.exports = router;
