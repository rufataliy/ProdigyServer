const express = require("express");
const router = new express.Router();
const Lesson = require("../models/Lesson");
const Section = require("../models/Section");

router.get("/", (req, res) => {
  const author = req.user._id;

  Section.find({ author })
    .then((items) => res.status(200).send({ items }))
    .catch((err) => res.send(err));
});

router.get("/:lessonId", (req, res) => {
  const author = req.user._id;

  Section.find({ lessonIdList: req.params.lessonId })
    .then((items) => res.status(200).json(items))
    .catch((err) => res.send(err));
});

router.post("/:lessonId", (req, res) => {
  const section = req.body;
  const { lessonId } = req.params;
  section.author = req.user._id;

  Section.create(section)
    .then((section) => {
      //add section id to the lesson it belongs
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

router.put("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  const update = req.body;

  Section.updateOne({ _id }, { $set: update })
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

module.exports = router;
