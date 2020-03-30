const express = require("express");
const router = new express.Router();
const Vocabulary = require("../models/Vocabulary");
const Klass = require("../models/Klass")
const { warning, error } = require("../tools/chalk");
router.get("/", (req, res) => {
    const author = req.openid.user.sub;
    Vocabulary.find({ $or: [{ author }, { studentList: author }] })
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
router.put("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    const update = req.body;
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
router.post("/assignTo/:_id", async(req, res) => {
    const { _id } = req.params;
    const { klassId } = req.body
    console.log(klassId);

    Klass.findById(klassId).then(klass => {
        console.log(klass);
        Vocabulary.findByIdAndUpdate({ _id }, {
                $push: {
                    klassList: { title: klass.title, klassId: klass._id },
                    studentList: { $each: klass.studentList }
                },
            })
            .then(vocabulary => {
                res.send({ vocabulary, klass })
            }).catch(err => error(err))
    }).catch(err => error(err))

});
module.exports = router;