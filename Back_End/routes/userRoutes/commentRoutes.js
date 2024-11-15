const express = require('express');
const router = express.Router();
const ComponentController = require('../../contrllers/userControllers/commentController');


router.get('/reviews/:productId', ComponentController.getreviews); 
router.post('/reviews/:id', ComponentController.postreviews);


module.exports = router;