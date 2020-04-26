const express = require("express");
const router = new express.Router();
const Vocabulary = require("../models/Vocabulary");
const Klass = require("../models/Klass");
const vocabulary = {
    name: "ielts",
    topic: "reading words",
    level: "intermediate",
    author: "5ea20e17c22ae8f32ac0b331"
}
for (let i = 0; i < 20; i++) {
    Vocabulary.create(vocabulary)
}
router.get("/", (req, res) => {
    console.log(req.user);
    const author = req.user._id;
    Vocabulary.find({ $or: [{ author }, { studentList: author }] })
        .then((items) => res.status(200).json(items))
        .catch((err) => res.send(err));
});
router.post("/", (req, res) => {
    const newVocabulary = req.body;
    Vocabulary.create(newVocabulary)
        .then((items) => res.send(items))
        .catch((err) => res.send(err));
});
router.get("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    Vocabulary.findOne({ _id })
        .then((items) => {
            console.log(items);
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.put("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    const update = req.body;
    Vocabulary.updateOne({ _id }, { $set: update })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.get("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    Vocabulary.findOne({ _id })
        .then((items) => {
            console.log(items);
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.delete("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    console.log(_id);

    Vocabulary.deleteOne({ _id })
        .then((items) => {
            console.log(items);
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.post("/assignTo/:_id", async(req, res) => {
    const { _id } = req.params;
    const { klassId } = req.body;
    console.log(klassId);

    Klass.findById(klassId)
        .then((klass) => {
            console.log(klass);
            Vocabulary.findByIdAndUpdate({ _id }, {
                    $push: {
                        klassList: { title: klass.title, klassId: klass._id },
                        studentList: { $each: klass.studentList },
                    },
                })
                .then((vocabulary) => {
                    res.send({ vocabulary, klass });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
});
module.exports = router;