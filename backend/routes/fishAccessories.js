// routes/fishAccessories.js
const express = require('express');
const { getFishAccessories, getSingleFishAccessories } = require('../controllers/fishAccessoriesController');
const router = express.Router();

router.get('/fishaccessories', getFishAccessories);
router.get('/fishaccessories/:id', getSingleFishAccessories);

// You can add more routes here for creating, updating, and deleting live dog products as needed.

module.exports = router;
