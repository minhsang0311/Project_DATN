const express = require('express');
const router = express.Router();
const { userMiddleware } = require('../../middlewares/userMiddlware');
const voucherController = require('../../contrllers/userControllers/voucherController')

// Route to handle contact form submissions
router.post('/voucher', userMiddleware, voucherController.CheckVoucher);

module.exports = router;
