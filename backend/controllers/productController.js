const Product = require('../models/Product');

exports.create = async (req, res) => {
    try {
        const data = req.body; // expect name, description, images, category, subcategory, variants
        const product = await Product.create({ ...data, createdBy: req.user._id });
        res.json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
};

exports.update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ error: "Product not found" });
        console.log(product);
        res.json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
};

exports.get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product" });
    }
};

exports.list = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, subcategory } = req.query;
        const q = { title: { $regex: search || ".*", $options: "i" } };
        const skip = (Number(page) - 1) * Number(limit);

        let [items, total] = await Promise.all([
            Product.find(q).skip(skip).limit(Number(limit)).lean(),
            Product.countDocuments(q)
        ]);

        function filterItemsBySubcategory(items, subcategories) {
            return items.filter(item =>
                subcategories.includes(item.subcategory?.name?.toLowerCase())
            );
        }

        if (subcategory) {
            const selectedNames = subcategory
                .split(",")
                .map(name => name.trim()?.toLowerCase())
                .filter(Boolean);

            items = filterItemsBySubcategory(items, selectedNames);
        }

        res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
    } catch (error) {
        console.error("Error listing products:", error);
        res.status(500).json({ error: "Failed to list products" });
    }
};
