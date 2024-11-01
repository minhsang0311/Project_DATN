const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const categoryController = require('../../contrllers/adminControllers/categoryController');


router.get('/category', categoryController.getAllcategory);
router.get('/categoryDetail/:id', categoryController.getCategoryDetail);
router.delete('/category/:id', categoryController.deletecategory);
router.post('/categoryAdd', categoryController.postCategory);
router.put('/categoryUpdate/:id', categoryController.putcategory);



module.exports = router;