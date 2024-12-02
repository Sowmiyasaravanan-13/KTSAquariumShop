// routes/liveDog.js
const express = require('express');
const { getDogProducts, getSingleDogProduct } = require('../controllers/dogProductController');
const router = express.Router();

router.get('/livedog', getDogProducts);
router.get('/livedog/:id', getSingleDogProduct);

// You can add more routes here for creating, updating, and deleting live dog products as needed.

module.exports = router;
