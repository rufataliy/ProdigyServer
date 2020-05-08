const express = require("express");
const router = new express.Router();
const Word = require("../models/Word");
const Vocabulary = require("../models/Vocabulary");

router.get("/:docId", (req, res) => {
    const { docId } = req.params;
    Word.find({ vocabularyId: docId })
        .then((items) => res.send(items))
        .catch((err) => res.send(err));
});
router.post("/", (req, res) => {
    const word = req.body;
    const { vocabularyId: _id } = req.body;
    Word.create(word)
        .then((word) => {

            Vocabulary.findByIdAndUpdate({ _id }, {
                $push: {
                    wordList: word._id,
                },
            }).then((vocabulary) => {});
            res.send(item);
        })
        .catch((err) => res.send(err));
});
router.get("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    Word.findOne({ _id })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.put("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    const update = req.body;

    Word.updateOne({ _id }, { $set: update })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.get("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    Word.findOne({ _id })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.delete("/delete/:_id", async(req, res) => {
    const { _id } = req.params;

    Word.deleteOne({ _id })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
module.exports = router;