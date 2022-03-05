const loginUser = require("../services/loginUser");

const login = async (req, res) => {
  await loginUser();
  res.status(200).send("logged in");
};

module.exports = {
  login,
};
