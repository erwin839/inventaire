const { Transaction, Product, User } = require('../models'); 

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'], // Inclure les informations de l'utilisateur
        },
        {
          model: Product,
          attributes: ['name'], // Inclure les informations du produit
        },
      ],
    });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createTransaction = async (req, res) => {
  const { productId, type, quantity, userId } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    if (type === 'out' && product.quantity < quantity) {
      return res.status(400).json({ msg: 'Insufficient quantity' });
    }
    const newTransaction = await Transaction.create({ productId, type, quantity, userId });
    if (type === 'in') {
      product.quantity = parseInt(product.quantity) + parseInt(quantity);
    } else {
      product.quantity = parseInt(product.quantity) - parseInt(quantity);
    }    
    await product.save();
    res.json(newTransaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
