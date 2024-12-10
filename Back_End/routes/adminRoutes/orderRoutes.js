const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const  orderController = require('../../contrllers/adminControllers/orderController');
const { adminMiddleware } = require('../../middlewares/adminMiddlware');



router.get('/order', orderController.getOrderList);
router.put('/order/:id', adminMiddleware, orderController.putOrder);




module.exports = router;