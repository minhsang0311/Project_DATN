const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const voucherController = require('../../contrllers/adminControllers/voucherController')
const { adminMiddleware } = require('../../middlewares/adminMiddlware');


router.get('/vouchers',adminMiddleware,  voucherController.getAllVoucher);
router.post('/postVoucher',adminMiddleware, voucherController.postVoucher);
router.get('/getVoucherDetail/:id',adminMiddleware, voucherController.getVoucherDetail)
router.put('/putVoucher/:id', adminMiddleware, voucherController.putVoucher)
// router.patch('/vouchers/:id/lock', adminMiddleware, voucherController.lockVoucher)



module.exports = router;