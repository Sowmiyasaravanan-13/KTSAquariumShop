// routes/dogAccessories.js
const express = require('express');
const { getDogAccessories, getSingleDogAccessories } = require('../controllers/dogaccessoriesController');
const router = express.Router();

router.get('/dogaccessories', getDogAccessories);
router.get('/dogaccessories/:id', getSingleDogAccessories);

// You can add more routes here for creating, updating, and deleting live dog products as needed.

module.exports = router;
