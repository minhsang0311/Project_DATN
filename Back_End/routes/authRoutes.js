const express = require('express');
const router = express.Router();
const authController = require('../contrllers/authController');
const authMiddlware = require('../middlewares/authMiddlware')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check-token', authMiddlware.checkToken)

module.exports = router;
