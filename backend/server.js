const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors'); // Importez cors

// Load config
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Utilisez cors middleware

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// sequelize.sync().then(() => {
// });