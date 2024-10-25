const express = require('express');
const router = express.Router();
const productController = require('../../contrllers/userControllers/productController');

router.get('/productList', productController.getAllProducts);
router.get('/productDetail/:id', productController.getAllproductDetail);
router.get('/productNew', productController.productNew);
router.get('/productMostView', productController.productMostView);
router.get('/san_pham_lien_quan/:id/:limit', productController.getAllsan_pham_lien_quan);

module.exports = router;