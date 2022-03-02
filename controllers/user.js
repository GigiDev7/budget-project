const login = (req, res) => {
  res.status(200).send("logged in");
};

const logout = (req, res) => {
  res.status(200).send("logged out");
};

module.exports = {
  login,
  logout,
};
