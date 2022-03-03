const login = (req, res) => {
  //get credentials from req.body
  res.status(200).send("logged in");
};

module.exports = {
  login,
};
