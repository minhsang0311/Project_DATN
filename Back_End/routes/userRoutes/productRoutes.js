const express = require('express');
const router = express.Router();
const productController = require('../../contrllers/userControllers/productController');

router.get('/productList', productController.getAllProducts);

module.exports = router;