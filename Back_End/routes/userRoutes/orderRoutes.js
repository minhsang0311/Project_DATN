const db = require('../../config/db');
const express = require('express');
const router = express.Router();
const orderController = require('../../contrllers/userControllers/orderController'); // Fixed 'controllers' spelling

// Route to get orders based on user ID
router.get('/orders/:userId', orderController.getOrderList);

module.exports = router;
