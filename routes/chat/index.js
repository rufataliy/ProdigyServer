const { initSocket } = require("./socket/initialize");

module.exports.initChat = () => {
  initSocket();
};
