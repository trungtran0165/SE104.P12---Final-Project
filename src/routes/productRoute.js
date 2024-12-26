const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { uploadImage } = require('../config/cloudinary');

// Add multer middleware for create and update routes
router.get('/get-all', productController.getAllProducts);
router.get('/get-details/:id', productController.getProductById);
router.post('/create', uploadImage.single('imageFile'), productController.createProduct);
router.patch('/update/:id', uploadImage.single('imageFile'), productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;