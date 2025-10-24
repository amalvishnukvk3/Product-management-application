const Subcategory = require('../models/Subcategory');
exports.create = async (req, res) => {
const { name, category } = req.body;
const sub = await Subcategory.create({ name, category });
res.json(sub);
};
exports.listByCategory = async (req, res) => {
const subs = await Subcategory.find({ category: req.params.categoryId });
res.json(subs);
};