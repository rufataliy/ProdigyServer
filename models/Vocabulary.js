const mongoose = require("mongoose");
const vocabularySchema = new mongoose.Schema({
    author: String,
    studentList: [String],
    klassList: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Klass" }],
    wordList: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Word" }],
    level: String,
    title: String,
    topic: String,
}, { selectPopulatedPaths: true });

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);

module.exports = Vocabulary;