const config = {
    required: false,
    auth0Logout: true,
    baseURL: "https://localhost:3000",
    issuerBaseURL: "https://prodigy-gate.auth0.com",
    clientID: process.env.CLIENT_ID,
    redirectUriPath: "/app",
    appSessionSecret: process.env.APP_SESSION_SECRET_AUTH
};
console.log(process.env.APP_SESSION_SECRET_AUTH);

module.exports.config = config