const jwt = require("jsonwebtoken");
const cookieParser = require("cookie");
const { JWT_SECRET } = process.env;
const User = require("../models/User");

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    const userToken = cookieParser.parse(req.headers.cookie).user;
    jwt.verify(userToken, JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
      } else {
        console.log(err);
      }
      next();
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = isAuthenticated;
