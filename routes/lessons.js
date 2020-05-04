const express = require("express");
const router = new express.Router();
const Lesson = require("../models/Lesson");
const Section = require("../models/Section");

router.get("/", (req, res) => {
    const author = req.user._id;
    Lesson.find({ $or: [{ author }, { studentList: author }] })
        .populate({ path: "sectionList", select: "title" })
        .then((items) => {
            console.log(items);

            res.status(200).json(items)
        })
        .catch((err) => res.send(err));
});
router.post("/", (req, res) => {
    console.log("lessons");

    const newLesson = req.body;
    Lesson.create(newLesson)
        .then((items) => res.send(items))
        .catch((err) => res.send(err));
});
router.get("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    Lesson.findOne({ _id })
        .then((items) => {
            console.log(items);
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.put("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    const update = req.body;
    Lesson.updateOne({ _id }, { $set: update })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.get("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    Lesson.findOne({ _id })
        .then((items) => {
            console.log(items);
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.delete("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    console.log(_id);

    Lesson.deleteOne({ _id })
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
            Lesson.findByIdAndUpdate({ _id }, {
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