const path = require("path");
module.exports = (req, res, next) => {
  if (req.files) {
    req.body.fileName = req.files.upload.name;
    req.body.filePath = path.join(
      process.env.BASE_URL + "img/" + req.files.upload.name
    );
    req.files.upload
      .mv(path.join(__dirname, "../public/img/" + req.files.upload.name))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  next();
};
