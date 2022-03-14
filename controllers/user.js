const { loginUser, registerUser } = require("../services/user");

const login = async (req, res) => {
  await loginUser();
  res.status(200).send("logged in");
};

const register = async (req, res) => {
  //logic for user registartion
  await registerUser();
  res.status(200).send("registered");
};

module.exports = {
  login,
  register,
};
