const express = require('express');

const users = require('../data/users');
const products = require('../data/products');

const router = express.Router();

router.get('/stats', (req, res) => {
  res.json({
    userCount: users.length,
    productCount: products.length,
  });
});

module.exports = router;