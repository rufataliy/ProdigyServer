const express = require("express");
const router = new express.Router();
const Klass = require("../models/Klass");
const request = require("request");
const { warning } = require("../tools/chalk");
router.get("/", (req, res) => {
    const author = req.openid.user.sub;
    console.log(author);

    // get all klasses for author or student : { $or: [{ author: authorId }, { studentList: studentId }] }
    Klass.find({ $or: [{ author }, { studentList: author }] })
        .then(items => {
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.post("/", (req, res) => {
    console.log(req.body);

    const klass = req.body;
    Klass.create(klass)
        .then(items => res.send(items))
        .catch(err => res.send(err));
});
router.get("/addStudent/:email", (req, res) => {
    const { email } = req.params;
    const options = {
        method: "GET",
        url: "https://prodigy-gate.auth0.com/api/v2/users-by-email",
        qs: { email },
        headers: {
            authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
    };
    request(options, function(error, response, user) {
        if (error) {
            console.log(error);
        }
        console.log(user);

        res.send(user);
    });
});
router.get("/edit/:_id", async(req, res) => {
    //if authorId is athor of the doc
    const { _id } = req.params;
    Klass.findOne({ _id })
        .then(items => {
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.put("/edit/:_id", async(req, res) => {
    //if authorId is athor of the doc
    const { _id } = req.params;
    const update = req.body;
    console.log(_id, update);

    Klass.updateOne({ _id }, { $set: update })
        .then(items => {
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.get("/delete/:_id", async(req, res) => {
    //if authorId is athor of the doc
    const { _id } = req.params;
    Klass.findOne({ _id })
        .then(items => {
            res.send(items);
        })
        .catch(err => res.send(err));
});
router.delete("/delete/:_id", async(req, res) => {
    //if authorId is athor of the doc
    const { _id } = req.params;
    Klass.deleteOne({ _id })
        .then(items => {
            console.log(items);
            res.send(items);
        })
        .catch(err => res.send(err));
});

module.exports = router;