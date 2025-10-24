require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/subcategories', subcategoryRoutes);
app.use('/products', productRoutes);


const PORT = process.env.PORT || 5000;
connectDB("mongodb+srv://amal:amal123@cluster0.uronlob.mongodb.net/").then(() => {
    app.listen(PORT, () => console.log('Server started on', PORT));
});