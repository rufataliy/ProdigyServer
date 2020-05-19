const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    author: String,
    level: String,
    phrase: String,
    definition: String,
    topic: String,
    example: String,
    vocabularyId: mongoose.SchemaTypes.ObjectId
});

const Word = mongoose.model("Word", wordSchema);

module.exports = Word;
module.exports.wordSchema = wordSchema;