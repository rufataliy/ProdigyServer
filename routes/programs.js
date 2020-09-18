const express = require("express");
const router = new express.Router();
const Program = require("../models/Program");

router.get("/", (req, res) => {
  const userId = req.user._id;

  Program.find({
    $or: [{ author: userId }, { studentList: userId }, { sample: true }],
  })
    .populate({ path: "lessonList", select: ["title", "author"] })
    .lean()
    .then((items) => res.status(200).json({ extendable: true, items: items }))
    .catch((err) => res.send(err));
});

router.get("/:_id", (req, res) => {
  const userId = req.user._id;
  const { _id } = req.params;

  Program.find({ _id, $or: [{ sample: true }, { studentList: userId }] });
  populate({ path: "lessonList", select: "title" })
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => res.send(err));
});

router.get("/:programId/lessons", (req, res) => {
  const userId = req.user._id;
  const { programId } = req.params;

  Program.findOne({
    _id: programId,
    $or: [{ author: userId }, { studentList: userId }, { sample: true }],
  })
    .populate({
      path: "lessonList",
      select: ["title", "author", "level"],
      populate: { path: "sectionList", select: "title" },
    })
    .then((item) => {
      res.status(200).json({
        extendable: userId.toString() === item.author.toString(),
        items: item.lessonList,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/:programId/lessons/:lessonId/sections", (req, res) => {
  const userId = req.user._id;
  const { programId, lessonId } = req.params;

  Program.findOne({
    _id: programId,
    $or: [{ author: userId }, { studentList: userId }, { sample: true }],
  })
    .populate({
      path: "lessonList",
      select: "sectionList",
      match: { _id: lessonId },
      populate: { path: "sectionList" },
    })
    .then((item) => {
      res.status(200).json({
        extendable: userId.toString() === item.author.toString(),
        sections: item.lessonList[0].sectionList,
      });
    })
    .catch((err) => res.send(err));
});

router.post("/", (req, res) => {
  const newProgram = req.body;
  newProgram.author = req.user._id;

  Program.create(newProgram)
    .then((items) => res.send(items))
    .catch((err) => res.send(err));
});

router.put("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  const update = req.body;

  Program.updateOne({ _id }, { $set: update })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;

  Program.deleteOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
