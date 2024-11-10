const db = require('../../config/db')
const upload = require('../../config/multer')

const express = require('express');
const router = express.Router();
const productController = require('../../contrllers/adminControllers/productController');
const { adminMiddleware } = require('../../middlewares/adminMiddlware');

router.get('/productList',adminMiddleware,  productController.getAllProducts);
router.get('/productList/:id',adminMiddleware, productController.getProductDetail);
router.post('/productAdd', adminMiddleware, upload.single('Image'), productController.postProduct);
router.put('/productUpdate/:id', adminMiddleware, upload.single('Image'), productController.putProduct);
router.delete('/productDelete/:id', adminMiddleware, productController.deleteProduct);

router.get('/search', productController.searchProducts);

module.exports = router;