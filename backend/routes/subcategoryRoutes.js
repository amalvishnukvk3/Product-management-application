const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const auth = require('../middleware/auth');


// Public routes
router.get('/category/:categoryId', subcategoryController.listByCategory);


// Protected routes
router.post('/', auth, subcategoryController.create);


module.exports = router;