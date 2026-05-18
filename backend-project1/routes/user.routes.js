const express = require('express');
const router = express.Router();
const { register, login, listUsers } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);

router.get('/', protect, listUsers);
router.get('/profile', protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;