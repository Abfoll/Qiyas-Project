const express = require('express');

const products = require('../data/products');
const { paginate, toNumber } = require('../utils/pagination');

const router = express.Router();

router.get('/products', (req, res) => {
  const page = toNumber(req.query.page, 1);
  const limit = toNumber(req.query.limit, 5);

  const type = req.query.type ? String(req.query.type).toLowerCase() : '';
  const minPrice = toNumber(req.query.minPrice, NaN);
  const maxPrice = toNumber(req.query.maxPrice, NaN);

  const filtered = products.filter((product) => {
    const matchesType = !type || product.type.toLowerCase() === type;
    const matchesMin = Number.isNaN(minPrice) || product.price >= minPrice;
    const matchesMax = Number.isNaN(maxPrice) || product.price <= maxPrice;
    return matchesType && matchesMin && matchesMax;
  });

  const result = paginate(filtered, page, limit);
  result.filters = {
    type: type || null,
    minPrice: Number.isNaN(minPrice) ? null : minPrice,
    maxPrice: Number.isNaN(maxPrice) ? null : maxPrice,
  };

  res.json(result);
});

module.exports = router;