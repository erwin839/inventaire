const express = require('express');
const router = express.Router();
const { getTransactions, createTransaction } = require('../controllers/transactionController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Get all transactions
router.get('/', authMiddleware, adminMiddleware, getTransactions);

// Create new transaction
router.post('/', authMiddleware, createTransaction);

module.exports = router;
