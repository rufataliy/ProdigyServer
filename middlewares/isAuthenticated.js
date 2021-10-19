const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sampleUser } = require('../tools/defaults');

const persistUserToCookie = (user, res) => {
  jwt.sign(user, process.env.JWT_SECRET, (err, token) => {
    if (!err) {
      res.cookie('user', token);
    }
  });
};

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    User.findOne({ sample: true }, (err, user) => {

      if (!err || !user) {
        User.create(sampleUser).then((user) => {
          req.user = user;
          persistUserToCookie(req.user, res);
          next();
        });
      } else {
        req.user = user;
        persistUserToCookie(req.user, res);
        next();
      }
    });
  } else {
    const { email } = req.openid.user;

    User.findOne({ email }, {}, { lean: true }, (err, user) => {
      if (!err) {
        req.user = user;
        persistUserToCookie(user, res);
        next();
      }else {
        res.redirect("/login");
      }
      
    })
  } 
};

module.exports = isAuthenticated;
