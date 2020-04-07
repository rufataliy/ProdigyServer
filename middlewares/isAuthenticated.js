const jwt = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        jwt.sign(req.openid.user.sub, "lululu", (err, token) => {
            res.cookie("userid", token);
            next();
        })
    } else {
        res.redirect("/login");
    }
};

module.exports = isAuthenticated;