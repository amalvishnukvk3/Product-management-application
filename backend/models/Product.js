const mongoose = require('mongoose');
const variantSchema = new mongoose.Schema({
ram: { type: String, required: true },
price: { type: Number, required: true },
qty: { type: Number, required: true }
}, { _id: false });


const productSchema = new mongoose.Schema({
title: { type: String, required: true },
description: String,
images: [String],
// category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
// subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
category: String,
subcategory: String,
variants: { type: [variantSchema], validate: v => v.length > 0 },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);