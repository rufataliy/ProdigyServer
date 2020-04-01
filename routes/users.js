const express = require("express");
const router = new express.Router();
const User = require("../models/User");
router.get("/", (req, res) => {
    User.find()
        .then(items => res.send(items))
        .catch(err => res.send(err));
});

router.post("/", (req, res) => {
    const user = req.body;
    console.log(req.body);

    User.create(user)
        .then(items => res.send(items))
        .catch(err => res.send(err));
});
router.get("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    User.findOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.post("/edit/:_id", async(req, res) => {
    const { _id } = req.params;
    const update = req.body;
    console.log(_id, update);

    User.updateOne({ _id }, { $set: update })
        .then(items => {
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.get("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    User.findOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.delete("/delete/:_id", async(req, res) => {
    const { _id } = req.params;
    console.log(_id);

    User.deleteOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});
module.exports = router;