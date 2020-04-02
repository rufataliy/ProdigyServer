const config = {
    required: false,
    auth0Logout: true,
    baseURL: "https://prodigylms.herokuapp.com",
    issuerBaseURL: "https://prodigy-gate.auth0.com",
    clientID: process.env.CLIENT_ID,
    redirectUriPath: "/app",
    appSessionSecret: process.env.APP_SESSION_SECRET_AUTH
};

module.exports.config = config;