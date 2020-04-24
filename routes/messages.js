const express = require("express");
const router = new express.Router();
const Message = require("../models/Message");
const { io } = require("../server");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie");
const Chat = require("../models/Chat");
const ObjectId = require("mongoose").Types.ObjectId;
const { JWT_SECRET } = process.env;
Message.deleteMany();
io.on("connection", (socket) => {
    jwt.verify(
        cookieParser.parse(socket.request.headers.cookie).user,
        JWT_SECRET,
        (err, user) => {
            socket.emit("connected", { connected: true });
            socket.emit("connect", { connected: true });
            socket.on(`message${user._id}`, (msg) => {
                console.log(msg);

                const chatId = msg.chatId ? msg.chatId : ObjectId();
                Message.findOneAndUpdate({ _id: ObjectId() }, { author: user._id, content: msg.content, chatId }, {
                        upsert: true,
                        new: true,
                        populate: {
                            path: "author",
                            select: "name",
                        },
                    })
                    .then((message) => {
                        Chat.findOneAndUpdate({ _id: chatId }, {
                            createdAt: Date.now(),
                            title: msg.title,
                            author: user._id,
                            participants: msg.participants,
                            $push: { messages: message._id },
                        }, { upsert: true, useFindAndModify: true, new: true }).then((chat, a) => {
                            if (!msg.chatId) {
                                console.log("********NEW CHAT******");
                                chat.participants.map((participant) =>
                                    io.emit(`message${participant}`, { message, chat })
                                );
                            } else {
                                console.log(message);
                                console.log("********OLD CHAT******");
                                chat.participants.map((participant) =>
                                    io.emit(`message${participant}`, { message })
                                );
                            }
                        });
                    })
                    .catch((err) => console.log(err));
            });
        }
    );
});

module.exports = router;