const express = require('express');
const router = express.Router();

const voucherController = require('../../contrllers/userControllers/voucherController')

// Route to handle contact form submissions
router.post('/voucher', voucherController.CheckVoucher);

module.exports = router;
