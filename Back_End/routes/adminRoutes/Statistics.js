const db = require('../../config/db')

const express = require('express');
const router = express.Router();
const StatisticsController = require('../../contrllers/adminControllers/Statistics');

router.get('/stats',  StatisticsController.Statistics);

module.exports = router;