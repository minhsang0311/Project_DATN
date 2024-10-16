

const express = require('express');
const router = express.Router();
const productController = require('../../contrllers/adminControllers/productController');

router.get('/productListadminAuth', productController.getAllProducts);
router.get('/productList/:id', productController.getProductDetail);
router.post('/productAdd', productController.postProduct);
router.put('/productUpdate', productController.putProduct);
router.delete('/productDelete', productController.deleteProduct);

module.exports = router;