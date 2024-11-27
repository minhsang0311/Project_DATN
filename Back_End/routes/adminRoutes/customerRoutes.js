const express = require('express');
const router = express.Router();
const customerController = require('../../contrllers/adminControllers/customerController');

// Route lấy danh sách tất cả người dùng
<<<<<<< HEAD
router.get('/customer', customerController.getAllCustomers)
=======
router.get('/customers', customerController.getAllCustomers);

// Thêm một khách hàng mới
router.post('/customerAdd', customerController.postCustomer);

// Lấy chi tiết một khách hàng theo ID
router.get('/customerDetail/:id', customerController.getCustomerDetail);

// Cập nhật thông tin khách hàng theo ID
router.put('/customerUpdate/:id', customerController.putCustomer);

// Xóa một khách hàng theo ID       
router.delete('/customerDelete/:id', customerController.deleteCustomer);
>>>>>>> cb57d5c7d3e2ab9f181f9b55be44fa7880046034

module.exports = router;


