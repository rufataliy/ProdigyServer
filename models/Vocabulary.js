const mongoose = require("mongoose");
const vocabularySchema = new mongoose.Schema({
    author: String,
    studentList: [String],
    klassList: [],
    wordList: [String],
    level: String,
    name: String,
    topic: String
});

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);

module.exports = Vocabulary;