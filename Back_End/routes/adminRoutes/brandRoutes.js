const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const brandController = require('../../contrllers/adminControllers/brandController')
const { adminMiddleware } = require('../../middlewares/adminMiddlware');

router.get('/brand', adminMiddleware, brandController.getAllBrands);



module.exports = router;