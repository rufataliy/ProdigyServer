const express = require("express");
const cors = require("cors");
const flash = require("express-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const isAuthenticated = require("./middlewares/isAuthenticated");
const { auth } = require("express-openid-connect");
const { config } = require("./auth_config");
const { server, app } = require("./server");
const fileupload = require("express-fileupload");
const User = require("./models/User");
const { initChat } = require("./routes/chat");
const cookieParser = require("cookie-parser");
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
  .catch((err) => console.log("DB COULDN'T CONNECT: " + err));

app.use(fileupload());
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
app.use(cookieParser());
//req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.render("index", { baseUrl: req.headers.host });
});

app.get("/profile", (req, res) => {
  const query = req.openid.user
    ? { email: req.openid.user.email }
    : { sample: true };

  User.findOne(query)
    .then((user) => res.send(user))
    .catch(console.log);
});
app.get("/loggedin", (req, res) => {
  console.log(req.isAuthenticated());
  res.status(200).send({ loggedin: req.isAuthenticated() });
});
app.get("/logoutCheck", (req, res) => {
  res.clearCookie("user").redirect("/logout");
});
app.use("/app", isAuthenticated, express.static(`${__dirname}/app/dist`));
app.get("/app/*", (req, res) => {
  res.sendFile(`index.html`, { root: __dirname + "/app/dist" });
});

app.use("/api/*", isAuthenticated);
initChat();
app.use("/api/users", require("./routes/users"));
app.use("/api/klasses", require("./routes/klasses"));
app.use("/api/programs", require("./routes/programs"));
app.use("/api/lessons", require("./routes/lessons"));
app.use("/api/sections", require("./routes/sections"));
app.use("/api/vocabularies", require("./routes/vocabularies"));
app.use("/api/words", require("./routes/words"));
app.use("/api/fileuploads", require("./routes/fileuploads"));

server.listen(process.env.PORT, () => {
  console.log("server running");
});
