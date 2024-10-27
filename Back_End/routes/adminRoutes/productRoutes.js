const db = require('../../config/db')
const upload = require('../../config/multer')

const express = require('express');
const router = express.Router();
const productController = require('../../contrllers/adminControllers/productController');

router.get('/productList',  productController.getAllProducts);
router.get('/productList/:id', productController.getProductDetail);
router.post('/productAdd',upload.single('Image'), productController.postProduct);
router.put('/productUpdate/:id',upload.single('Image'), productController.putProduct);
router.delete('/productDelete/:id', productController.deleteProduct);
router.get('/search', productController.searchProducts);

module.exports = router;