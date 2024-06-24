const Transaction = require('./Transaction');
const Product = require('./Product');
const User = require('./User');

// Définir les associations
Product.hasMany(Transaction, { foreignKey: 'productId' });
Transaction.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  Transaction,
  Product,
  User,
};
