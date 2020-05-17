const express = require("express");
const router = new express.Router();
const Lesson = require("../models/Lesson");
const Section = require("../models/Section");
router.get("/", (req, res) => {
  const author = req.user._id;
  Section.find({ author })
    .then((items) => res.status(200).json(items))
    .catch((err) => res.send(err));
});
router.get("/:lessonId", (req, res) => {
  const author = req.user._id;
  Section.find({ lessonIdList: req.params.lessonId })
    .then((items) => res.status(200).json(items))
    .catch((err) => res.send(err));
});
router.post("/", (req, res) => {
  const section = req.body;
  const lessonId = req.body.lessonIdList[0];
  Section.create(section)
    .then((section) => {
      Lesson.findByIdAndUpdate(
        { _id: lessonId },
        {
          $push: {
            sectionList: section._id,
          },
        }
      )
        .then((lesson) => {
          res.status(200).send();
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    })
    .catch((err) => res.send(err));
});
router.get("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  Section.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
router.put("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  const update = req.body;
  console.log("edit section");
  Section.updateOne({ _id }, { $set: update })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
router.get("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  Section.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  Section.deleteOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
router.post("/assignTo/:_id", async (req, res) => {
  const { _id } = req.params;
  const { klassId } = req.body;

  Klass.findById(klassId)
    .then((klass) => {
      Section.findByIdAndUpdate(
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
