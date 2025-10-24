const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');


router.get('/', productController.list);
router.get('/:id', productController.get);
router.post('/', auth, productController.create);
router.put('/:id', auth, productController.update);


module.exports = router;