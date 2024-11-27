const db = require('../../config/db')
const upload = require('../../config/multer')

const express = require('express');
const router = express.Router();
const productController = require('../../contrllers/adminControllers/productController');
const { adminMiddleware } = require('../../middlewares/adminMiddlware');

router.get('/productList', adminMiddleware, productController.getAllProducts);
router.get('/productList/:id', adminMiddleware, productController.getProductDetail);
router.get('/productImageDetail/:id', adminMiddleware, productController.getProductImageDetail);
router.post('/productAdd', adminMiddleware, upload, productController.postProduct);
router.put('/productUpdate/:id', adminMiddleware, upload, productController.putProduct);
router.delete('/productDelete/:id', adminMiddleware, productController.deleteProduct);
router.delete('/productDeleteImg/:id', adminMiddleware, productController.deleteProductImageDetail);

router.get('/search', productController.searchProducts);

module.exports = router;