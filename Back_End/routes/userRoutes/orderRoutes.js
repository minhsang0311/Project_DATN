const db = require('../../config/db');
const express = require('express');
const router = express.Router();
const orderController = require('../../contrllers/userControllers/orderController'); // Fixed 'controllers' spelling
const { userMiddleware } = require('../../middlewares/userMiddlware');
// Route to get orders based on user ID
router.get('/orders/:userId', orderController.getOrderList);
router.get('/orderDetail/:orderDetailId', orderController.getOrderDetailById);
router.put('/cancelOrder/:orderDetailId', orderController.putcancelOrder);

module.exports = router;
