const express = require("express");
const router = new express.Router();
const fileUpload = require("../middlewares/fileUpload");
router.post("/textEditorImageUpload", fileUpload, (req, res) => {
    console.log(req.body.filePath);

    res.status(200).send({ url: "https://localhost:3000/css/img/" + req.files.upload.name });
});
module.exports = router;