const express = require('express');

const users = require('../data/users');
const { paginate, toNumber } = require('../utils/pagination');

const router = express.Router();

router.get('/users', (req, res) => {
  const page = toNumber(req.query.page, 1);
  const limit = toNumber(req.query.limit, 5);

  const result = paginate(users, page, limit);
  res.json(result);
});

module.exports = router;