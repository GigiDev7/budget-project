const {
  loginUser,
  registerUser,
  createToken,
  comparePasswords,
} = require("../services/user");

const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    //checking if user exists in DB
    if (!user) {
      return res.status(400).json({ message: "No user found with such email" });
    }
    console.log(user, req.body);
    //checking if passwords are correct
    const isPasswordCorrect = await comparePasswords(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = createToken(user._id);
    res.status(200).json({ email: user.email, id: user._id, token });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(200).send("registered");
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = {
  login,
  register,
};
