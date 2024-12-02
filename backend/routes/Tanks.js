
const express = require('express');
const { getImportedTankProducts, getSingleImportedTankProduct } = require('../controllers/importedTankProducts');
const router = express.Router();

router.get('/importedtanks', getImportedTankProducts);
router.get('/importedtanks/:id', getSingleImportedTankProduct);

module.exports = router;
