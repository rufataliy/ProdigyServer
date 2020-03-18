const express = require("express");
const https = require("https");
const cors = require("cors");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express();
const fs = require("fs");
const db = mongoose.connection;
const isAuthenticated = require("./middlewares/isAuthenticated");
const { success, error, warning } = require("./tools/chalk");
const { auth, requiresAuth } = require("express-openid-connect");

mongoose
    .connect("mongodb://localhost/Prodgy", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false
    })
    .then(() => success("DB CONNECTED"))
    .catch(err => error("DB COULDN'T CONNECT"));

const key = fs.readFileSync("./localhost-key.pem");
const cert = fs.readFileSync("./localhost.pem");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(
    session({
        secret: "testserver"
    })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

const config = {
    required: false,
    auth0Logout: true,
    baseURL: "https://localhost:3000",
    issuerBaseURL: "https://prodigy-gate.auth0.com",
    clientID: "uz6EME6apBI5HNS5K0szg8LY3pgDtqdB",
    clientSecret: "0WIh0GRjWc6HJsP6bEG9U24nmawAr0YzlouGJuhoSMTIX0kqYKq1oGUyMQMHGsRk",
    appSessionSecret: "a long, randomly-generated string stored in env"
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
//req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.render("index");
    } else {
        res.send("login");
    }
    //res.send(req.isAuthenticated() ? "Logged in" : "Logged out");
});
app.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.openid.user));
});
app.use(
    cors({
        origin: true,
        credentials: true
    })
);
app.use("/app", isAuthenticated, express.static("app/dist"));
app.get("/app", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
app.use("/api/vocabularies", require("./routes/vocabularies"));
app.use("/api/words", require("./routes/words"));
app.use("/api/klasses", require("./routes/klasses"));
app.use("/api/users", require("./routes/users"));
https.createServer({ key, cert }, app).listen("3000", () => {
    console.log("Listening on https://localhost:3000");
});