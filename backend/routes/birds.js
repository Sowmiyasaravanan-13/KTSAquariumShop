// routes/livebirds.js
const express = require('express');
const { getBirdsProducts, getSingleBirdsProduct } = require('../controllers/birdsProductController');
const router = express.Router();

router.get('/livebirds', getBirdsProducts);
router.get('/livebirds/:id', getSingleBirdsProduct);

// You can add more routes here for creating, updating, and deleting live dog products as needed.

module.exports = router;
