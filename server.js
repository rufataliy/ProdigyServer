const app = require("express")();
const https = require("https");
const http = require("http");
const fs = require("fs");
// const key = fs.readFileSync("./localhost-key.pem");
// const cert = fs.readFileSync("./localhost.pem");
// const server = https.createServer({ key, cert }, app);
const server = http.createServer(app);
io = require("socket.io")(server);
module.exports.app = app;
module.exports.server = server;
module.exports.io = io;