const express = require('express');
const router = express.Router();
const { userMiddleware } = require('../../middlewares/userMiddlware');

const changePassword = require('../../contrllers/userControllers/changePassword')
router.post('/change-password',userMiddleware, changePassword.changePassword)
module.exports = router;