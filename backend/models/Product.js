const mongoose = require('mongoose');

// Variant schema
const variantSchema = new mongoose.Schema(
  {
    ram: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
  },
  { _id: false }
);

// Embedded category object schema
const categoryObjectSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

// Embedded subcategory object schema
const subcategoryObjectSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);


// Product schema
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    images: [String],

    category: { type: categoryObjectSchema, required: true },
    subcategory: { type: subcategoryObjectSchema, required: true },

    variants: {
      type: [variantSchema],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'At least one variant is required',
      },
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
