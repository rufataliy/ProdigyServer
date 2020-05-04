const express = require("express");
const router = new express.Router();
const Chat = require("../models/Chat");

router.get("/", (req, res) => {
    Chat.find({ participants: req.user._id })
        .populate({ path: "participants", select: "name" })
        .populate({
            path: "messages",
            populate: { path: "author", select: "name" },
        })
        .then((chats) => {
            res.send(chats);
        })
        .catch((err) => console.log(err));
});
router.delete("/delete/:chatId", (req, res) => {
    const author = req.user._id
    Chat.findByIdAndUpdate({ _id: req.params.chatId }, {
            $pull: { participants: author },
        })
        .then((chat) => {
            res.send({ chat });
        })
        .catch((err) => console.log(err));
});

module.exports = router;