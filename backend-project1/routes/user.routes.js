const express = require('express');
const router = express.Router();
const { register } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.get('/profile', protect, (req, res) => {
  res.json({ user: req.user });   // protected route
});

module.exports = router;