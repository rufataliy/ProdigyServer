const express = require("express");
const router = new express.Router();
const Chat = require("../models/Chat");

router.get("/", (req, res) => {
    const author = req.openid.user.sub;
    Chat.find({ participants: author })
        .populate("messages")
        .populate("participants")
        .then((chats) => {
            res.send(chats);
        })
        .catch((err) => console.log(err));
});
router.delete("/delete/:chatId", (req, res) => {
    const author = req.openid.user.sub;
    Chat.findByIdAndUpdate({ _id: req.params.chatId }, {
            $pull: { participants: author },
        })
        .then((chat) => {
            res.send({ chat });
        })
        .catch((err) => console.log(err));
});

module.exports = router;