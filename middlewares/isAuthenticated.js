const jwt = require("jsonwebtoken");
const cookieParser = require("cookie");
const { JWT_SECRET } = process.env;
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        const userToken = cookieParser.parse(req.headers.cookie).user;
        jwt.verify(userToken, JWT_SECRET, (err, user) => {
            if (!err) {
                req.user = user;
                next();
            } else {
                console.log("Verify token isAthenticated");
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

module.exports = isAuthenticated;