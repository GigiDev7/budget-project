const {
  loginUser,
  registerUser,
  createToken,
  comparePasswords,
} = require("../services/user");

const handleError = (error) => {
  const errors = { email: "", password: "" };

  if (error.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }

  errors.email = error?.errors?.email?.message;
  errors.password = error?.errors?.password?.message;
  return errors;
};

const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    //checking if user exists in DB
    if (!user) {
      return res.status(400).json({ message: "Wrong user email or password" });
    }
    //checking if passwords are correct
    const isPasswordCorrect = await comparePasswords(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong user email or password" });
    }

    const token = createToken(user._id);
    res.status(200).json({ email: user.email, id: user._id, token });
  } catch (err) {
    res.status(400).json(err);
  }
};

const register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(200).send("registered");
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};

module.exports = {
  login,
  register,
};
