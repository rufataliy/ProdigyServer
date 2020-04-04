const express = require("express");
const https = require("https");
const cors = require("cors");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const socketioJwt = require("socketio-jwt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie");
var mongoose = require("mongoose");
const app = express();
const fs = require("fs");
const isAuthenticated = require("./middlewares/isAuthenticated");
const { auth, requiresAuth } = require("express-openid-connect");
const { config } = require("./auth_config");

// configure store for session and store sessions there then get session id from socket and get session from and se user.
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
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
app.get("/loginCheck", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/app");
    } else {
        res.redirect("/login");
    }
});
//req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    res.render("index", { baseUrl: req.headers.host });
});
app.get("/profile", requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.openid.user));
});

app.use("/app", isAuthenticated, express.static(`${__dirname}/app/dist`));
app.get("/app", (req, res) => {
    res.sendFile(`index.html`, { root: "/app/dist" });
});

app.use(
    "/app/Schedule",
    isAuthenticated,
    express.static(`${__dirname}/app/dist`)
);
app.use(
    "/app/Vocabulary",
    isAuthenticated,
    express.static(`${__dirname}/app/dist`)
);
app.use("/api/*", isAuthenticated);
app.use("/api/vocabularies", require("./routes/vocabularies"));
app.use("/api/words", require("./routes/words"));
app.use("/api/klasses", require("./routes/klasses"));
app.use("/api/users", require("./routes/users"));
const key = fs.readFileSync("./localhost-key.pem");
const cert = fs.readFileSync("./localhost.pem");
const server = https.createServer({ key, cert }, app);
const io = require("socket.io")(server);
if ((process.env.NODE_ENV = "dev")) {
    server.listen(process.env.PORT, () => {
        console.log("Listening on https://localhost:3000");
    });
    io.on("connection", (socket) => {
        jwt.verify(
            cookieParser.parse(socket.request.headers.cookie).userid,
            "lululu",
            (err, userid) => {
                console.log(err, userid);
            }
        );
        socket.emit("connected", { msg: "you are connected" });
        socket.on("chat", (a) => {
            socket.emit("chat", { msg: `${a.msg} from server` });
        });
    });
} else {
    app.listen(process.env.PORT, () => {
        console.log("production");
    });
}