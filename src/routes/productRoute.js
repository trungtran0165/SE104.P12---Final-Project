const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/get-all', productController.getAllProducts);
router.get('/get-details/:id', productController.getProductById);
router.post('/create', productController.createProduct);
router.patch('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

// Route to update isDelete field
router.patch('/soft-delete/:id', productController.softDeleteProduct);

module.exports = router;