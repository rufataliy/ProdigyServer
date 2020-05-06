const mongoose = require("mongoose");
const vocabularySchema = new mongoose.Schema({
    author: String,
    studentList: [String],
    klassList: [Object],
    wordList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Word" }],
    level: String,
    title: String,
    topic: String,
});

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);

module.exports = Vocabulary;