const express = require("express");
const router = new express.Router();
const Message = require("../models/Message");
const { io } = require("../server");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie");
const Chat = require("../models/Chat");
const ObjectId = require("mongoose").Types.ObjectId;
io.on("connection", (socket) => {
    jwt.verify(
        cookieParser.parse(socket.request.headers.cookie).userid,
        "lululu",
        (err, userid) => {
            socket.emit("connected", { msg: "you are connected" });
            socket.on(`message${userid}`, (msg) => {
                console.log(msg);

                const _id = msg.chatId ? msg.chatId : ObjectId();
                Message.create({ author: userid, content: msg.content })
                    .then((message) => {
                        Chat.findOneAndUpdate({ _id }, {
                            createdAt: Date.now(),
                            author: userid,
                            participants: msg.participants,
                            $push: { messages: message._id },
                        }, { upsert: true, useFindAndModify: true, new: true }).then((item) => {
                            console.log(item);

                            console.log("********MESSAGE******");
                            if (!message.chatId) {
                                message.chatId = item._id;
                                message.save();
                            }
                            io.emit(`message${userid}`, message);
                        });
                    })
                    .catch((err) => console.log(err));
            });
        }
    );
});
router.get("/", (req, res) => {
    console.log("hit");
});

module.exports = router;