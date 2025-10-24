const Product = require('../models/Product');


exports.create = async (req, res) => {
    const data = req.body; // expect name, description, images, category, subcategory, variants
    const product = await Product.create({ ...data, createdBy: req.user._id });
    res.json(product);
};


exports.update = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(product);

    res.json(product);
};


exports.get = async (req, res) => {
    // console.log(req.params);

    // const product = await Product.findById(req.params.id).populate('category subcategory');
    const product = await Product.findById(req.params.id);
    // console.log(product);

    res.json(product);
};


exports.list = async (req, res) => {
    const { page = 1, limit = 10, search, subcategory } = req.query;
    const q = { title: { $regex: search || ".*", $options: "i" } };
    // if (subcategory) q.subcategory = subcategory;
    const skip = (Number(page) - 1) * Number(limit);
    let [items, total] = await Promise.all([
        // Product.find(q).populate('category subcategory').skip(skip).limit(Number(limit)).lean(),
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
};


exports.delete = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
};