const express = require("express");
const router = new express.Router();
const Vocabulary = require("../models/Vocabulary");
const { warning } = require("../tools/chalk");
router.get("/", (req, res) => {
    const author = req.openid.user.sub.replace("auth0|", "")
    Vocabulary.find({ author })
        .then(items => res.status(200).json(items))
        .catch(err => res.send(err));
});
router.post("/", (req, res) => {
    const newVocabulary = req.body;
    console.log(req.body);

    Vocabulary.create(newVocabulary)
        .then(items => res.send(items))
        .catch(err => res.send(err));
});
router.get("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    Vocabulary.findOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.post("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    const update = req.body;
    console.log(_id, update);

    Vocabulary.updateOne({ _id }, { $set: update })
        .then(items => {
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.get("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    Vocabulary.findOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.delete("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    console.log(_id);

    Vocabulary.deleteOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});
module.exports = router;