const express = require('express');
const router = express.Router();
const categoryController = require('../../contrllers/userControllers/categoryController');

router.get('/category', categoryController.getAllcategory);
router.get('/category/:Category_ID', categoryController.getAllcategoryID);
module.exports = router;