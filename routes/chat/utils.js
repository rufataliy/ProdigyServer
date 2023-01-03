const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const cookieParser = require("cookie");

function getUserId(cookie) {
  return jwt.verify(cookieParser.parse(cookie).user, JWT_SECRET, (err, parsed) => {
    if (err) {
      return;
    }
    return parsed
  });
}

module.exports = {
  getUserIdFromCookie: getUserId,
};
