const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const app = express();

app.use(cors());
app.use(express.static("dist"));

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://prodigy-gate.auth0.com/.well-known/jwks.json`
    }),
    aud: "https://prodigy-gate.auth0.com/userinfo",
    iss: `https://prodigy-gate.auth0.com`,
    alg: "RS256"
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/index.html", err => {
        console.log(err + "error");
    });
});

app.listen(3001, () => console.log("Server running"));