const Category = require('../models/Category');
exports.create = async (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    const cat = await Category.create({ name });
    res.json(cat);
};
exports.list = async (req, res) => {
    const cats = await Category.find();
    res.json(cats);
};