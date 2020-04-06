const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    title: String,
    author: {
        type: String,
        ref: "User",
    },
    participants: [{
        type: String,
        ref: "User",
    }, ],
    messages: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Message",
    }, ],
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now(),
    },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;