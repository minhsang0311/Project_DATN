const express = require('express');
const router = express.Router();
const customerController = require('../../contrllers/adminControllers/customerController');

// Route lấy danh sách tất cả người dùng
router.get('/customers', customerController.getAllCustomers);

// Thêm một khách hàng mới
router.post('/customerAdd', customerController.postCustomer);

// Lấy chi tiết một khách hàng theo ID
router.get('/customerDetail/:id', customerController.getCustomerDetail);

// Cập nhật thông tin khách hàng theo ID
router.put('/customerUpdate/:id', customerController.putCustomer);

// Xóa một khách hàng theo ID       
router.delete('/customerDelete/:id', customerController.deleteCustomer);

module.exports = router;


