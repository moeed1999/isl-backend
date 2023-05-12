const jwt = require("jsonwebtoken");
const User = require('../models/userModel')
require('dotenv').config({ path: '../.env' });

const auth = () => async (req, res, next) => {
  try {
    let token = req.headers["auth-token"];

    if (!token)
      return res.status(500).json({
        success: false,
        reason: "Token is required",
        message: "Authentication error",
      });

    token = token.replace("Bearer", "").trim();
    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let user = await User.findOne({ userName: decoded?.userName });
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      reason: error.message,
      message: "Authentication error",
    });
  }
};

module.exports = auth;