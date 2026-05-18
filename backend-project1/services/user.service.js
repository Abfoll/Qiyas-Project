const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const createUser = async ({ name, email, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  return await user.save();
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = { createUser, getUserByEmail };