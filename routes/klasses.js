const express = require("express");
const router = new express.Router();
const Klass = require("../models/Klass");
const request = require("request");
const refreshToken = require("../tools/getNewAuth0Token");
const Token = require("../models/Token");
const Program = require("../models/Program");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
router.get("/", (req, res) => {
    const author = req.user._id;
    // get all klasses for author or student : { $or: [{ author: authorId }, { studentList: studentId }] }
    Klass.find({ $or: [{ author }, { studentList: author }] })
        .then((items) => res.send(items))
        .catch((err) => res.send(err));
});
router.post("/", (req, res) => {
    const klass = req.body;
    Klass.create(klass)
        .then((item) => {
            Program.updateMany({ _id: { $in: item.programList } }, {
                $addToSet: {
                    studentList: item.studentList,
                    klassList: item._id,
                },
            }).then((items) => res.send(items));
        })
        .catch((err) => res.send(err));
});
router.get("/addStudent/:email", (req, res) => {
    const { email } = req.params;

    User.findOne({ email })
        .then((user) => res.send(user))
        .catch((err) => console.log(err));
});
router.get("/addStudent/byid/:idList", (req, res) => {
    const idList = req.params.idList.replace(/,/g, '" OR "');
    const query = 'user_id:("'.concat(idList, '")');
    Token.findOne()
        .then((token) => {
            const options = {
                method: "GET",
                url: "https://prodigy-gate.auth0.com/api/v2/users",
                qs: {
                    q: query,
                    search_engine: "v3",
                },
                headers: {
                    authorization: `Bearer ${token.access_token}`,
                },
            };
            request(options, function(error, response, users) {
                if (error) {
                    console.log("error", error);
                }
                if (JSON.parse(users).error === "Unauthorized") {
                    refreshToken();
                    request(options, (error, response, users) => {
                        if (error) {
                            console.log("after refresh", users);
                        }
                        res.send(users);
                        return;
                    });
                } else {
                    res.send(users);
                }
            });
        })
        .catch((err) => console.log(err));
});
router.get("/addStudent/byemail/:email", (req, res) => {
    const email = req.params;
    Token.findOne()
        .then((token) => {
            const options = {
                method: "GET",
                url: "https://prodigy-gate.auth0.com/api/v2/users-by-email",
                qs: email,
                headers: {
                    authorization: `Bearer ${token.access_token}`,
                },
            };
            request(options, function(error, response, users) {
                if (error) {
                    console.log(error);
                }
                if (JSON.parse(users).error === "Unauthorized") {
                    refreshToken();
                    request(options, (error, response, users) => {
                        if (error) {
                            console.log("after refresh", users);
                        }
                        res.send(users);
                        return;
                    });
                } else {
                    res.send(users);
                }
            });
        })
        .catch((err) => console.log(err));
});

router.get("/edit/:_id", async(req, res) => {
    //if authorId is author of the doc
    const { _id } = req.params;
    Klass.findOne({ _id })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.put("/edit/:_id", async(req, res) => {
    //if authorId is athor of the doc
    const { _id } = req.params;
    const update = req.body;
    const removedProgramsList = req.body.removedProgramsList ?
        Object.keys(req.body.removedProgramsList) :
        [];

    Klass.findByIdAndUpdate({ _id }, { $set: update })
        .then((item) => {
            //_id fields return from query are objects . Running new query with them as an array
            // of araays won't work.
            const klassId = item._id.toString();
            const studentList = item.studentList.map((id) => id.toString());

            Program.updateMany({ _id: { $in: removedProgramsList } }, {
                $pull: { klassList: klassId },
                $pullAll: { studentList },
            }, { multi: true }).catch((err) => console.log(err));
            // if (removedProgramsList) {
            // }

            Program.updateMany({ _id: { $in: update.programList } }, {
                    $addToSet: {
                        klassList: klassId,
                        studentList,
                    },
                }, { multi: true })
                .then((item) => res.send(item))
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
});
router.get("/delete/:_id", async(req, res) => {
    //if authorId is athor of the doc
    const { _id } = req.params;
    Klass.findOne({ _id })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});
router.delete("/delete/:_id", async(req, res) => {
    //if authorId is athor of the doc
    const { _id } = req.params;
    Klass.deleteOne({ _id })
        .then((items) => {
            res.send(items);
        })
        .catch((err) => res.send(err));
});

module.exports = router;