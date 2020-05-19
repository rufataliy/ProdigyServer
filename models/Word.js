const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  author: String,
  level: String,
  phrase: String,
  definition: String,
  topic: String,
  example: String,
  vocabularyId: { type: mongoose.SchemaTypes.ObjectId, ref: "Vocabulary" },
});

const Word = mongoose.model("Word", wordSchema);

module.exports = Word;
module.exports.wordSchema = wordSchema;
