const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
    },
    chatId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Chat",
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now(),
    },
}, { strict: false });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;