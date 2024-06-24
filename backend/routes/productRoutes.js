const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Get all products
router.get('/', getProducts);

// Get product by ID
router.get('/:id', getProductById);

// Create new product
router.post('/', authMiddleware, adminMiddleware, createProduct);

// Update product
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);

// Delete product
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
