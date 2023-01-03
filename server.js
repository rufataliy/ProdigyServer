const app = require("express")();

if (process.env.NODE_ENV !== "prod") {
  var fs = require("fs");
  var key = fs.readFileSync("./localhost-key.pem");
  var cert = fs.readFileSync("./localhost.pem");
  var server = require("https").createServer({ key, cert }, app);
} else {
  var server = require("http").createServer(app);
}

const redis = require("redis").createClient();
const io = require("socket.io")(server);
module.exports.app = app;
module.exports.server = server;
module.exports.io = io;
module.exports.redis = redis;
