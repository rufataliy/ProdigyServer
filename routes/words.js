const express = require("express");
const router = new express.Router();
const Word = require("../models/Word");
const { warning } = require("../tools/chalk");
router.get("/:docId", (req, res) => {
    console.log("words");

    const { docId } = req.params;
    Word.find({ vocabularyId: docId })
        .then(items => res.send(items))
        .catch(err => res.send(err));
});
router.post("/", (req, res) => {
    const word = req.body;
    console.log(req.body);

    Word.create(word)
        .then(items => res.send(items))
        .catch(err => res.send(err));
});
router.get("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    Word.findOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.put("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    const update = req.body;
    console.log(_id, update);

    Word.updateOne({ _id }, { $set: update })
        .then(items => {
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.get("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    Word.findOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.delete("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    console.log(_id);

    Word.deleteOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});
module.exports = router;