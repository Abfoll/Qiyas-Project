const userService = require('../services/user.service');

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'User created', userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { register };