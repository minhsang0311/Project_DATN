const express = require('express');
const router = express.Router();
const customerController = require('../../contrllers/adminControllers/customerController');

// Route lấy danh sách tất cả người dùng
router.get('/customer', customerController.getAllCustomers)

module.exports = router;
