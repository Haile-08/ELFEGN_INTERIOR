const jwt = require("jsonwebtoken");

const adminauthCheck = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  });
};

module.exports = adminauthCheck;
