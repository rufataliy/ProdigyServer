const express = require("express");
const router = new express.Router();
const User = require("../models/User");

router.get("/:email", (req, res) => {
  const { email } = req.params;
  User.findOne({ email }, ["_id", "name"])
    .then((items) => {
      console.log(items);
      res.send(items);
    })
    .catch((err) => res.send(err));
});

router.post("/", (req, res) => {
  const user = req.body;

  User.create(user)
    .then((items) => res.send(items))
    .catch((err) => res.send(err));
});
router.get("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  User.findOne({ _id })
    .then((items) => {
      console.log(items);
      res.send(items);
    })
    .catch((err) => res.send(err));
});
router.post("/edit/:_id", async (req, res) => {
  const { _id } = req.params;
  const update = req.body;

  User.updateOne({ _id }, { $set: update })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
router.get("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  User.findOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;

  User.deleteOne({ _id })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => res.send(err));
});
module.exports = router;
