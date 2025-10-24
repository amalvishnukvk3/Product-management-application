const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');


// Public routes
router.get('/', categoryController.list);


// Protected routes
router.post('/', auth, categoryController.create);


module.exports = router;