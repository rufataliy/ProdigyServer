const express = require("express");
const router = new express.Router();
const fileUpload = require("../middlewares/fileUpload");
router.post("/textEditorImageUpload", fileUpload, (req, res) => {

    res.status(200).send({ url: "http://prodigy.rufataliyev.com/css/img/" + req.files.upload.name });
});
module.exports = router;