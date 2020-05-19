const jwt = require("jsonwebtoken");
const User = require("./models/User");
const saveUser = async function(req, res, next) {
    // This will store the user identity claims in the session.
    const user = req.openidTokens.claims();
    user.userId = user.sub;

    if (user) {
        User.findOneAndUpdate({ email: user.email }, user, { upsert: true })
            .lean()
            .then((user) => {
                jwt.sign(user, process.env.JWT_SECRET, (err, token) => {
                    res.cookie("user", token).redirect("/app");
                });
            })
            .catch((err) => {
                next();
            });
    } else {
        console.log(err);
        res.redirect("/login");
    }
};

const config = {
    required: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    issuerBaseURL: "https://prodigy-gate.auth0.com",
    clientID: process.env.CLIENT_ID,
    redirectUriPath: "app",
    handleCallback: saveUser,
    appSessionSecret: process.env.APP_SESSION_SECRET_AUTH,
};
module.exports.config = config;