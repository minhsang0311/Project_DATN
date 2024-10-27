const db = require('../../config/db')
const upload = require('../../config/multer')

const express = require('express');
const router = express.Router();
const productController = require('../../contrllers/adminControllers/productController');
const { authMiddleware } = require('../../middlewares/authMiddlware');

router.get('/productList',authMiddleware,  productController.getAllProducts);
router.get('/productList/:id',authMiddleware, productController.getProductDetail);
router.post('/productAdd', authMiddleware, upload.single('Image'), productController.postProduct);
router.put('/productUpdate/:id', authMiddleware, upload.single('Image'), productController.putProduct);
router.delete('/productDelete/:id', authMiddleware, productController.deleteProduct);

module.exports = router;