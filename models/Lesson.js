const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    author: String,
    title: String,
    level: String,
    vocabularyList: [
      { type: mongoose.SchemaTypes.ObjectId, ref: "Vocabulary" },
    ],
    sectionList: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Section",
      },
    ],
  },
  { selectPopulatedPaths: true }
);

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
