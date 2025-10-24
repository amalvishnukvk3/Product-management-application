const Category = require('../models/Category');
exports.create = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the category already exists (case-insensitive)
        const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        // Create new category
        const cat = await Category.create({ name });
        res.status(201).json(cat);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.list = async (req, res) => {
    const cats = await Category.find();
    res.json(cats);
};