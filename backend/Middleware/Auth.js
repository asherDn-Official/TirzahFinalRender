const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(500).json({
        errorMessage: "unAuthorised",
      });
    }
    const verified = jwt.verify(token, process.env.JWTSecret);
    req.userId = verified.userId;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      errorMessage: "unAuthorised",
    });
  }
};
module.exports = { auth };
