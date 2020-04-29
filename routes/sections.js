const express = require("express");
const router = new express.Router();
const Lesson = require("../models/Lesson");
const Section = require("../models/Section");

router.get("/:lessonId", (req, res) => {
    const author = req.user._id;
    Section.find({ lessonId: req.params.lessonId })
        .then((items) => res.status(200).json(items))
        .catch((err) => res.send(err));
});
router.post("/", (req, res) => {
    const section = req.body;
    const { lessonId: _id } = req.body;
    console.log(req.body);
    Section.create(section)
        .then((section) => {
            console.log(section);
            Lesson.findByIdAndUpdate({ _id }, {
                $push: {
                    sectionList: section._id,
                },
            }).then((lesson) => {
                console.log("lesson", lesson);
            });
            res.send(item);
        })
        .catch((err) => res.send(err));
});
router.get("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    Section.findOne({ _id })
        .then((items) => {
            console.log(items);
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.put("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    const update = req.body;
    Section.updateOne({ _id }, { $set: update })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.get("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    Section.findOne({ _id })
        .then((items) => {
            console.log(items);
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.delete("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    console.log(_id);

    Section.deleteOne({ _id })
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
            Section.findByIdAndUpdate({ _id }, {
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