const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (userId) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  return token;
};

const comparePasswords = async (password, hashedPassword) => {
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  return isPasswordCorrect;
};

const loginUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  return user;
};

const registerUser = async (userData) => {
  await User.create(userData);
};

module.exports = {
  loginUser,
  registerUser,
  createToken,
  comparePasswords,
};
