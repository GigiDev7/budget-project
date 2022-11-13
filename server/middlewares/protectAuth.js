const jwt = require("jsonwebtoken");

const protectAuth = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decodedData.id;
    next();
  });
};

module.exports = protectAuth;
