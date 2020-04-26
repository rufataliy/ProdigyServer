const express = require("express");
const cors = require("cors");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const isAuthenticated = require("./middlewares/isAuthenticated");
const { auth, requiresAuth } = require("express-openid-connect");
const { config } = require("./auth_config");
const { server, app } = require("./server");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
// configure store for session and store sessions
//there then get session id from socket and
//get session from and se user.
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        useFindAndModify: false,
    })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB COULDN'T CONNECT"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
    })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

// auth router attaches /login, /logout, and /callback routes to the baseURL

app.use(auth(config));
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

//req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    res.render("index", { baseUrl: req.headers.host });
});
app.get("/profile", requiresAuth(), (req, res) => {
    User.findOne({ email: req.openid.user.email })
        .then((user) => res.send(user))
        .catch(console.log);
});
app.get("/logoutCheck", (req, res) => {
    res.clearCookie("user")

    res.redirect("/logout")
})
app.use("/app", isAuthenticated, express.static(`${__dirname}/app/dist`));
app.get("/app", (req, res) => {
    res.sendFile(`index.html`, { root: "/app/dist" });
});

app.use("/app/Schedule", express.static(`${__dirname}/app/dist`));
app.use("/app/Vocabulary", express.static(`${__dirname}/app/dist`));
app.use("/app/test", isAuthenticated, express.static(`${__dirname}/app/dist`));

app.use("/api/*", isAuthenticated);
app.use("/api/vocabularies", require("./routes/vocabularies"));
app.use("/api/words", require("./routes/words"));
app.use("/api/klasses", require("./routes/klasses"));
app.use("/api/users", require("./routes/users"));
app.use("/api/chats", require("./routes/chats"));
app.use("/api/messages", require("./routes/messages"));

server.listen(process.env.PORT, () => {
    console.log("server running");
});