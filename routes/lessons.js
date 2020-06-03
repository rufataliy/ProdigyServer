const express = require("express");
const router = new express.Router();
const Lesson = require("../models/Lesson");
const Program = require("../models/Program");

router.get("/", (req, res) => {
  const author = req.user._id;
  Lesson.find({ author })
    .populate({ path: "sectionList", select: "title" })
    .then((items) => {
      res.status(200).json({ extendable: true, items });
    })
    .catch((err) => res.send(err));
});
router.post("/", (req, res) => {
  const newLesson = req.body;
  newLesson.author = req.user._id;

  Lesson.create(newLesson)
    .then((items) => res.send(items))
    .catch((err) => res.send(err));
});
router.post("/:programId", (req, res) => {
  const newLesson = req.body;
  const { programId } = req.params;
  newLesson.author = req.user._id;

  Lesson.create(newLesson)
    .then((item) => {
      Program.findByIdAndUpdate(
        { _id: programId },
        {
          $push: {
            lessonList: item._id,
          },
        }
      )
        .then((response) => res.send(response))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/:lessonId/sections", (req, res) => {
  const author = req.user._id;
  const { lessonId } = req.params;
  Lesson.findOne({ _id: lessonId, author })
    .populate({ path: "sectionList" })
    .then((item) => {
      res.status(200).json({ extendable: true, sections: item.sectionList });
    })
    .catch((err) => res.send(err));
});

router.get("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  Lesson.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
router.put("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  const update = req.body;
  Lesson.updateOne({ _id }, { $set: update })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
router.get("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  Lesson.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  Lesson.deleteOne({ _id })
    .then((response) => {
      let deleted = response.n > 0 ? true : false;
      res.send(deleted);
    })
    .catch((err) => res.send(err));
});
router.post("/assignTo/:_id", async (req, res) => {
  const { _id } = req.params;
  const { klassId } = req.body;
  Klass.findById(klassId)
    .then((klass) => {
      Lesson.findByIdAndUpdate(
        { _id },
        {
          $push: {
            klassList: { title: klass.title, klassId: klass._id },
            studentList: { $each: klass.studentList },
          },
        }
      )
        .then((vocabulary) => {
          res.send({ vocabulary, klass });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
module.exports = router;
