// controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');

// @desc Add a product to wishlist
// @route POST /api/wishlist/add
// @access Private
exports.addToWishlist = async (req, res) => {
  try {
    const { productId, variant } = req.body;
    const userId = req.user.id;

    // Check if already exists
    const existing = await Wishlist.findOne({ user: userId, product: productId });
    if (existing) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    const wishlistItem = new Wishlist({
      user: userId,
      product: productId,
      variant,
    });

    await wishlistItem.save();
    res.status(201).json({ message: 'Added to wishlist', wishlistItem });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Get all wishlist items for a user
// @route GET /api/wishlist
// @access Private
exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await Wishlist.find({ user: userId })
      .populate('product')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Remove a product from wishlist
// @route DELETE /api/wishlist/:productId
// @access Private
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const deleted = await Wishlist.findOneAndDelete({ user: userId, product: productId });
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
