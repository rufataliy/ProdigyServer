const express = require("express");
const router = new express.Router();
const Program = require("../models/Program");
const Section = require("../models/Section");

router.get("/", (req, res) => {
  const userId = req.user._id;
  console.log(userId);

  Program.find({ $or: [{ author: userId }, { studentList: userId }] })
    .populate({ path: "lessonList", select: "title" })
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
    $or: [{ author: userId }, { studentList: userId }],
  })
    .populate({ path: "lessonList", select: "title" })
    .then((item) => {
      res.status(200).json(item.lessonList);
    })
    .catch((err) => res.send(err));
});

router.get("/:programId/lessons/:lessonId/sections", (req, res) => {
  const userId = req.user._id;
  const { programId, lessonId } = req.params;
  Program.findOne({
    _id: programId,
    $or: [{ author: userId }, { studentList: userId }],
  })
    .populate({
      path: "lessonList",
      select: "sectionList",
      match: { _id: lessonId },
      populate: { path: "sectionList" },
    })
    .then((item) => {
      res.status(200).json(item.lessonList[0].sectionList);
    })
    .catch((err) => res.send(err));
});

router.get("/:_id", (req, res) => {
  const userId = req.user._id;
  const { _id } = req.params;
  console.log("new api", _id);

  Program.find({ _id, studentList: userId });
  populate({ path: "lessonList", select: "title" })
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
router.get("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  Program.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
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
router.get("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  Program.findOne({ _id })
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
router.post("/assignTo/:_id", async (req, res) => {
  const { _id } = req.params;
  const { klassId } = req.body;
  Klass.findById(klassId)
    .then((klass) => {
      Program.findByIdAndUpdate(
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
