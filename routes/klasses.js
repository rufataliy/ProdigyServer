const express = require("express");
const router = new express.Router();
const Klass = require("../models/Klass");
const { warning } = require("../tools/chalk");
router.get("/", (req, res) => {
    const { authorId, studentId } = req.query;
    console.log(studentId);

    Klass.find({ $or: [{ author: authorId }, { studentList: studentId }] })
        .then(items => res.send(items))
        .catch(err => res.send(err));
});
router.post("/", (req, res) => {
    const klass = req.body;
    console.log(req.body);
    Klass.create(klass)
        .then(items => res.send(items))
        .catch(err => res.send(err));
});
router.get("/edit/:_id", async(req, res) => {
    //if authorId is athor of the doc
    const { _id } = req.params;
    Klass.findOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.put("/edit/:_id", async(req, res) => {
    //if authorId is athor of the doc
    const { _id } = req.params;
    const update = req.body;
    console.log(_id, update);

    Klass.updateOne({ _id }, { $set: update })
        .then(items => {
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.get("/delete/:_id", async(req, res) => {
    //if authorId is athor of the doc
    const { _id } = req.params;
    Klass.findOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.delete("/delete/:_id", async(req, res) => {
    //if authorId is athor of the doc
    const { _id } = req.params;
    Klass.deleteOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});

module.exports = router;