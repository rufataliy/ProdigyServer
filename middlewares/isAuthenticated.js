const jwt = require("jsonwebtoken");
const User = require("../models/User");

const persistUserToCookie = (user, res) => {
  jwt.sign(user, process.env.JWT_SECRET, (err, token) => {
    if (!err) {
      res.cookie("user", token);
    }
  });
};

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return User.findOne({ sample: true }, {}, { lean: true }, (err, user) => {
      if (!err) {
        req.user = user;
        persistUserToCookie(req.user, res);
      }
      next();
    });
  }

  const { email } = req.openid.user;

  User.findOne({ email }, {}, { lean: true }, (err, user) => {
    if (!err) {
      persistUserToCookie(req.user, res);
    }
    next();
  });
};

module.exports = isAuthenticated;
