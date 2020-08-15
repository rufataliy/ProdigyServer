const express = require("express");
const router = new express.Router();
const Word = require("../models/Word");
const Vocabulary = require("../models/Vocabulary");

router.get("/:vocabularyId", (req, res) => {
  const { vocabularyId } = req.params;

  Word.find({ vocabularyId })
    .then((items) => res.send({ items }))
    .catch((err) => res.send(err));
});

router.post("/:vocabularyId", (req, res) => {
  const word = req.body;
  word.author = req.user._id;
  const { vocabularyId: _id } = req.params;
  word.vocabularyId = _id;

  Word.create(word)
    .then((word) => {
      Vocabulary.findByIdAndUpdate(
        { _id },
        {
          $push: {
            wordList: word._id,
          },
        }
      ).catch((err) => console.log(err));

      res.send(word);
    })
    .catch((err) => console.log(err));
});

router.get("/edit/:_id", async (req, res) => {
  const { _id } = req.params;

  Word.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

router.put("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  const update = req.body;

  Word.updateOne({ _id }, { $set: update })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

router.get("/delete/:_id", async (req, res) => {
  const { _id } = req.params;

  Word.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;

  Word.deleteOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
module.exports = router;
