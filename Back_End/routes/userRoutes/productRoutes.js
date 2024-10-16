const express = require('express');
const router = express.Router();
const productController = require('../../contrllers/userControllers/productController');

router.get('/productListUser', productController.getAllProducts);

module.exports = router;