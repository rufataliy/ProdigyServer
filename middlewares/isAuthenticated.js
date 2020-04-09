const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        JWT_SECRET;
        jwt.sign(req.openid.user.sub, JWT_SECRET, (err, token) => {
            res.cookie("userid", token);
            next();
        });
    } else {
        res.redirect("/login");
    }
};

module.exports = isAuthenticated;