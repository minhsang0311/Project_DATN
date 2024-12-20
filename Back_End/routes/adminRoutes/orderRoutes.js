const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const  orderController = require('../../contrllers/adminControllers/orderController');
const { adminMiddleware } = require('../../middlewares/adminMiddlware');



router.get('/order', adminMiddleware, orderController.getOrderList);
router.get('/order/:orderId' ,adminMiddleware, orderController.getOrderDetail);
router.patch('/order/:id',adminMiddleware, orderController.patchOrderStatus);
router.patch('/order/cancel/:orderId', orderController.patchPaymentMethod);




module.exports = router;
