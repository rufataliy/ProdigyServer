const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const cookieParser = require("cookie");

function getUserId(cookie) {
  let user;
  jwt.verify(cookieParser.parse(cookie).user, JWT_SECRET, (err, parsed) => {
    if (err) {
      return;
    }
    user = parsed;
  });
  return user;
}

module.exports = {
  getUserIdFromCookie: getUserId,
};
