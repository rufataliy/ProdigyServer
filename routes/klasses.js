const express = require("express");
const router = new express.Router();
const Klass = require("../models/Klass");
const Program = require("../models/Program");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;

router.get("/", (req, res) => {
  const author = req.user._id;
  console.log(author);

  // get all klasses for author or student : { $or: [{ author: authorId }, { studentList: studentId }] }
  Klass.find({ $or: [{ author }, { studentList: author }, { sample: true }] })
    .populate({ path: "studentList", select: "name" })
    .populate({ path: "programList", select: "title" })
    .then((items) => {
      console.log(items);

      res.send(items);
    })
    .catch((err) => res.send(err));
});

router.post("/", (req, res) => {
  const klass = req.body;
  klass.author = req.user._id;
  Klass.create(klass)
    .then((item) => {
      Program.updateMany(
        { _id: { $in: item.programList } },
        {
          $addToSet: {
            studentList: item.studentList,
            klassList: item._id,
          },
        }
      ).then((items) => res.send(items));
    })
    .catch((err) => res.send(err));
});

router.get("/addStudent/:email", (req, res) => {
  const { email } = req.params;

  User.findOne({ email })
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
});

router.get("/edit/:_id", async (req, res) => {
  //if authorId is author of the doc
  const { _id } = req.params;
  Klass.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

// if a student is removed it needs to be removed from program two
router.put("/edit/:_id", async (req, res) => {
  //if authorId is athor of the doc
  const { _id } = req.params;
  const update = req.body;

  if (req.user._id !== update.author) {
    return res.status(403).send();
  }

  const removedProgramsList = req.body.removedProgramsList
    ? Object.keys(req.body.removedProgramsList)
    : [];

  Klass.findByIdAndUpdate({ _id }, { $set: update })
    .then((item) => {
      //_id fields return from query are objects . Running new query with them as an array
      // of araays won't work.
      const klassId = item._id.toString();
      const studentList = item.studentList.map((id) => id.toString());

      Program.updateMany(
        { _id: { $in: removedProgramsList } },
        {
          $pull: { klassList: klassId },
          $pullAll: { studentList },
        },
        { multi: true }
      ).catch((err) => console.log(err));
      // if (removedProgramsList) {
      // }

      Program.updateMany(
        { _id: { $in: update.programList } },
        {
          $addToSet: {
            klassList: klassId,
            studentList,
          },
        },
        { multi: true }
      )
        .then((item) => res.send(item))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
router.get("/delete/:_id", async (req, res) => {
  //if authorId is athor of the doc
  const { _id } = req.params;
  Klass.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
router.delete("/delete/:_id", async (req, res) => {
  //if authorId is athor of the doc
  const { _id } = req.params;
  Klass.deleteOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
