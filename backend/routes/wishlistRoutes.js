// routes/wishlist.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const auth = require('../middleware/auth');

// Public routes (if any) — currently none

// Protected routes
router.get('/', auth, wishlistController.getWishlist);
router.post('/add', auth, wishlistController.addToWishlist);
router.delete('/:productId', auth, wishlistController.removeFromWishlist);

module.exports = router;
