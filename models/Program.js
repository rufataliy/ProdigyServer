const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    klassList: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Klass",
      },
    ],
    lessonList: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Lesson",
      },
    ],
    studentList: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
  },
  { selectPopulatedPaths: true, strict: false }
);

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
