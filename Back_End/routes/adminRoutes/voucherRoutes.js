const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const voucherController = require('../../contrllers/adminControllers/voucherController')
const { adminMiddleware } = require('../../middlewares/adminMiddlware');


router.get('/vouchers',  voucherController.getAllVoucher);
router.post('/postVoucher', voucherController.postVoucher);
router.get('/getVoucherDetail/:id', voucherController.getVoucherDetail)
router.put('putVoucher/:id', voucherController.putVoucher)
router.delete('/deleteVoucher/:id', voucherController.deleteVoucher)



module.exports = router;