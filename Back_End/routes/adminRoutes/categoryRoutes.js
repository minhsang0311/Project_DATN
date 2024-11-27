const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const categoryController = require('../../contrllers/adminControllers/categoryController');
const { adminMiddleware } = require('../../middlewares/adminMiddlware');

router.get('/category', adminMiddleware, categoryController.getAllcategory);
router.get('/categoryDetail/:id', adminMiddleware, categoryController.getCategoryDetail);
router.delete('/category/:id', adminMiddleware, categoryController.deletecategory);
router.post('/categoryAdd', categoryController.postCategory);
router.put('/categoryUpdate/:id', adminMiddleware, categoryController.putcategory);



module.exports = router;