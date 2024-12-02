// routes/liveCat.js
const express = require('express');
const { getCatProducts, getSingleCatProduct } = require('../controllers/catProductController');
const router = express.Router();

router.get('/livecat', getCatProducts);
router.get('/livecat/:id', getSingleCatProduct);

// You can add more routes here for creating, updating, and deleting live dog products as needed.

module.exports = router;
