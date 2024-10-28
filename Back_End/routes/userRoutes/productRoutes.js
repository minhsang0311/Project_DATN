const express = require('express');
const router = express.Router();
const productController = require('../../contrllers/userControllers/productController');

router.get('/productList', productController.getAllProducts);
router.get('/productNew', productController.getProductsNew);
router.get('/productDetail/:id', productController.getAllproductDetail);
router.get('/productNew', productController.productNew);
router.get('/productMostView', productController.productMostView);
router.get('/productKhuyenMai', productController.productKhuyenMai);
router.get('/san_pham_lien_quan/:id/:limit', productController.getAllsan_pham_lien_quan);
router.get('/productNew', productController.getAllproductNew);
router.get('/productMostView', productController.getAllproductMostView);
router.get('/Products/:Category_ID', productController.getAllProducts)
router.get('/products_search/', productController.getAllProducts_Search)

module.exports = router;