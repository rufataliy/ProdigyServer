const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    title: String,
    level: String,
    sectionType: String,
    text: String,
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    lessonIdList: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Lesson",
    },
    sample: Boolean,
  },
  { selectPopulatedPaths: true, strict: false }
);

// sectionSchema.post("remove", section => {
//     const { _id } = section
//     Lesson.updateMany({ _id: section.lessonIdList })
// })
const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
