const jwt = require("jsonwebtoken");
const User = require("./models/User");
const config = {
    required: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    issuerBaseURL: "https://prodigy-gate.auth0.com",
    clientID: process.env.CLIENT_ID,
    redirectUriPath: "app",
    appSessionSecret: process.env.APP_SESSION_SECRET_AUTH,
    handleCallback: async function(req, res, next) {
        // This will store the user identity claims in the session.
        const user = req.openidTokens.claims();
        user._id = user.sub;
        jwt.sign(req.openidTokens.claims().sub, "lululu", (err, token) => {
            if (!err) {
                res.cookie("userid", token);
                User.findByIdAndUpdate({ _id: user._id }, user, { upsert: true })
                    .then((user) => {
                        console.log(user);
                        res.redirect("/app");
                    })
                    .catch((err) => {
                        console.log(err);
                        next();
                    });
            } else {
                console.log(err);
                res.redirect("/login");
            }
        });
    },
};
module.exports.config = config;