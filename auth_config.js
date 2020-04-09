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
};
module.exports.config = config;