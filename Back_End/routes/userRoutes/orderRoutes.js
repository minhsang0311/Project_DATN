const db = require('../../config/db');
const express = require('express');
const router = express.Router();
const orderController = require('../../contrllers/userControllers/orderController'); // Fixed 'controllers' spelling
const { userMiddleware } = require('../../middlewares/userMiddlware');
// Route to get orders based on user ID
router.get('/orders/:userId', userMiddleware, orderController.getOrderList);
router.get('/orderDetail/:orderId',userMiddleware, orderController.getOrderDetail);
router.put('/cancelOrder/:orderId', userMiddleware, orderController.putcancelOrder);

module.exports = router;
