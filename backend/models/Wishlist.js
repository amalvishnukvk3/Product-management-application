// models/Wishlist.js
const mongoose = require('mongoose');

const variantSnapshotSchema = new mongoose.Schema(
  {
    ram: { type: String },
    price: { type: Number },
    qty: { type: Number },
  },
  { _id: false }
);

// Optional product snapshot (useful so wishlist items persist even if product changes or is removed)
const productSnapshotSchema = new mongoose.Schema(
  {
    title: { type: String },
    images: [String],
    // store category/subcategory objects if you like:
    category: { _id: mongoose.Schema.Types.ObjectId, name: String },
    subcategory: { _id: mongoose.Schema.Types.ObjectId, name: String },
  },
  { _id: false }
);

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    variant: { type: variantSnapshotSchema, required: false },
    // optional snapshot of product data to show in wishlist without an extra populate
    productSnapshot: { type: productSnapshotSchema, required: false },
  },
  { timestamps: true }
);

// Prevent duplicate product entries per user
wishlistSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
