const jwt = require("jsonwebtoken");

//function to create JWT token
const createToken = (/*userId*/) => {
  const token = jwt.sign(
    {
      /* user id from mongo DB */
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  return token;
};

const loginUser = async (userData) => {
  // make DB query
  // check if we have user in DB
  // compare bcrypted passwords

  const token = createToken(/* userId*/);

  return { token /* user */ };
};

const registerUser = async (userData) => {
  //check if emails is not registered already in DB

  const token = createToken(/* userId*/);
  return { token /* user */ };
};

module.exports = {
  loginUser,
  registerUser,
};
