const Subcategory = require('../models/Subcategory');
exports.create = async (req, res) => {
    try {
        const { name, category } = req.body;
        const existingSub = await Subcategory.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') },
            category
        });

        if (existingSub) {
            return res.status(400).json({ message: "Subcategory already exists under this category" });
        }
        const sub = await Subcategory.create({ name, category });
        res.status(201).json(sub);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.listByCategory = async (req, res) => {
    try {
        const subs = await Subcategory.find({ category: req.params.categoryId });
        res.json(subs);
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ message: "Server error while fetching subcategories" });

    }
};