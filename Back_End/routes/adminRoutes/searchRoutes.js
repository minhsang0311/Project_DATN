const db = require('../../config/db')


const express = require('express');
const router = express.Router();
const searchController = require('../../contrllers/adminControllers/searchController')
const { adminMiddleware } = require('../../middlewares/adminMiddlware');


router.get('/searchAdmin',  searchController.generalSearch);


module.exports = router;