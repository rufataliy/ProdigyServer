const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const { email } = req.openid.user;

  User.findOne({ email }, {}, { lean: true }, (err, user) => {
    if (!err) {
      req.user = user;
      jwt.sign(user, process.env.JWT_SECRET, (err, token) => {
        if (!err) {
          res.cookie("user", token);
        }
      });
    }
    next();
  });
};

module.exports = isAuthenticated;
