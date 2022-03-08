const jwt = require("jsonwebtoken");

const loginUser = async (userData) => {
  // make DB query
  // check if we have user in DB
  // write authentication  logic
  // compare bcrypted passwords

  const token = jwt.sign(
    {
      /* user id from mongo DB */
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  return { token /* user */ };
};

module.exports = loginUser;
