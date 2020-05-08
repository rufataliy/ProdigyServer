const express = require("express");
const router = new express.Router();
const Klass = require("../models/Klass");
const request = require("request");
const refreshToken = require("../tools/getNewAuth0Token")
const Token = require("../models/Token")
router.get("/", (req, res) => {
    const author = req.user._id;
    // get all klasses for author or student : { $or: [{ author: authorId }, { studentList: studentId }] }
    Klass.find({ $or: [{ author }, { studentList: author }] })
        .then(items => {
            setTimeout(() => res.send(items), 1)
        })
        .catch(err => res.send(err));
});
router.post("/", (req, res) => {
    const klass = req.body;
    Klass.create(klass)
        .then(items => res.send(items))
        .catch(err => res.send(err));
});
router.get("/addStudent/byid/:idList", (req, res) => {
    const idList = req.params.idList.replace(/,/g, '" OR "');
    const query = ('user_id:("').concat(idList, '")')
    Token.findOne().then(token => {
        const options = {
            method: "GET",
            url: "https://prodigy-gate.auth0.com/api/v2/users",
            qs: {
                q: query,
                search_engine: 'v3'
            },
            headers: {
                authorization: `Bearer ${token.access_token}`
            }
        };
        request(options, function(error, response, users) {
            if (error) {
                console.log("error", error);
            }
            if (JSON.parse(users).error === "Unauthorized") {
                refreshToken()
                request(options, (error, response, users) => {
                    if (error) {
                        console.log("after refresh", users);
                    }
                    res.send(users)
                    return;
                })
            } else { res.send(users); }
        });
    }).catch(err => console.log(err))

});
router.get("/addStudent/byemail/:email", (req, res) => {
    const email = req.params
    Token.findOne().then(token => {
        const options = {
            method: "GET",
            url: "https://prodigy-gate.auth0.com/api/v2/users-by-email",
            qs: email,
            headers: {
                authorization: `Bearer ${token.access_token}`
            }
        };
        request(options, function(error, response, users) {
            if (error) {
                console.log(error);
            }
            if (JSON.parse(users).error === "Unauthorized") {
                refreshToken()
                request(options, (error, response, users) => {
                    if (error) {
                        console.log("after refresh", users);
                    }
                    res.send(users)
                    return;
                })
            } else { res.send(users); }
        });
    }).catch(err => console.log(err))

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