const express = require('express');
const router = express.Router();
const ComponentController = require('../../contrllers/userControllers/commentController');


router.get('/reviews/:productId', ComponentController.getreviews); 
router.post('/reviews', ComponentController.postreviews);
router.get('/orders/canComment/:userId/:productId', ComponentController.canComment);
router.put('/reviews/:reviewId', ComponentController.putReview);

module.exports = router;