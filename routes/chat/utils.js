const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const cookieParser = require("cookie");

function getUserId(cookie) {
  let userid;
  jwt.verify(cookieParser.parse(cookie).user, JWT_SECRET, (err, user) => {
    if (err) {
      return;
    }
    userid = user._id;
  });
  return userid;
}

module.exports = {
  getUserIdFromCookie: getUserId,
};
