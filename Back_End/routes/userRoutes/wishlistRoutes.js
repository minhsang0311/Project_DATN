const express = require('express');
const router = express.Router();
const wishlistController = require('../../contrllers/userControllers/wishlistController');

router.get('/wishlist/:userId', wishlistController.getWishlist);
router.post('/wishlist', wishlistController.postWishlist)
router.delete('/wishlist', wishlistController.deleteWishlist)
module.exports = router;