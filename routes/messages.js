const express = require("express");
const router = new express.Router();
const Message = require("../models/Message");
const { io } = require("../server");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie");
const Chat = require("../models/Chat");
const ObjectId = require("mongoose").Types.ObjectId;
const { JWT_SECRET } = process.env;
io.on("connection", (socket) => {
    jwt.verify(
        cookieParser.parse(socket.request.headers.cookie).userid,
        JWT_SECRET,
        (err, userid) => {
            console.log("connected");
            socket.emit("connected", { connected: true });
            socket.emit("connect", { connected: true });
            socket.on(`message${userid}`, (msg) => {
                const chatId = msg.chatId ? msg.chatId : ObjectId();
                Message.create({ author: userid, content: msg.content, chatId })
                    .then((message) => {
                        Chat.findOneAndUpdate({ _id: chatId }, {
                            createdAt: Date.now(),
                            title: msg.title,
                            author: userid,
                            participants: msg.participants,
                            $push: { messages: message._id },
                        }, { upsert: true, useFindAndModify: true, new: true }).then((chat, a) => {
                            if (!msg.chatId) {
                                console.log("********NEW CHAT******");
                                chat.participants.map((participant) =>
                                    io.emit(`message${participant}`, { message, chat })
                                );
                                // io.emit(`message${userid}`, { message, chat });
                            } else {
                                console.log("********OLD CHAT******");
                                chat.participants.map((participant) =>
                                    io.emit(`message${participant}`, { message })
                                );
                                // io.emit(`message${userid}`, { message });
                            }
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