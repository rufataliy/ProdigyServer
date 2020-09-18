const express = require("express");
const router = new express.Router();
const Vocabulary = require("../models/Vocabulary");
const Klass = require("../models/Klass");

router.get("/", (req, res) => {
  const usedId = req.user._id;

  Vocabulary.find({
    $or: [{ author: usedId }, { studentList: usedId }, { sample: true }],
  })
    .populate({ path: "klassList", select: ["title", "studentList"] })
    .then((items) => res.status(200).json({ extendable: true, items }))
    .catch((err) => res.send(err));
});

router.get("/:vocabularyId/words", (req, res) => {
  const userId = req.user._id;
  const { vocabularyId } = req.params;

  Vocabulary.findOne({
    _id: vocabularyId,
    $or: [{ author: userId }, { studentList: userId }, { sample: true }],
  })
    .populate({ path: "wordList" })
    .then((item) =>
      res
        .status(200)
        .json({
          extendable: userId.toString() === item.author,
          items: item.wordList,
        })
    )
    .catch((err) => res.send(err));
});

router.post("/", (req, res) => {
  const newVocabulary = req.body;
  newVocabulary.author = req.user._id;

  Vocabulary.create(newVocabulary)
    .then((items) => res.send(items))
    .catch((err) => res.send(err));
});
router.get("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  Vocabulary.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

router.put("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  const update = req.body;

  Vocabulary.updateOne({ _id }, { $set: update })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

router.get("/delete/:_id", async (req, res) => {
  const { _id } = req.params;

  Vocabulary.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;

  Vocabulary.deleteOne({ _id })
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
      Vocabulary.findByIdAndUpdate(
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
