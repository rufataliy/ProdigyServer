const express = require("express");
const router = new express.Router();
const Program = require("../models/Program");
const Section = require("../models/Section");

router.get("/", (req, res) => {
    const author = req.user._id;
    Program.find({ $or: [{ author }, { studentList: author }] })
        .populate([
            { path: "lessonList", select: "title" },
            { path: "klassList", select: "title" },
        ])
        .then((items) => {
            res.status(200).json(items);
        })
        .catch((err) => res.send(err));
});
router.post("/", (req, res) => {
    const newProgram = req.body;
    Program.create(newProgram)
        .then((items) => res.send(items))
        .catch((err) => res.send(err));
});
router.get("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    Program.findOne({ _id })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.put("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    const update = req.body;
    Program.updateOne({ _id }, { $set: update })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.get("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    Program.findOne({ _id })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.delete("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    Program.deleteOne({ _id })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.post("/assignTo/:_id", async(req, res) => {
    const { _id } = req.params;
    const { klassId } = req.body;
    Klass.findById(klassId)
        .then((klass) => {
            Program.findByIdAndUpdate({ _id }, {
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