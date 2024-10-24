const express = require('express');
const router = express.Router();
const categoryController = require('../../contrllers/userControllers/categoryController');

router.get('/categoryList', categoryController.getAllCategories);

module.exports = router;