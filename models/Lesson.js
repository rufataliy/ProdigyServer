const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    author: String,
    title: String,
    level: String,
    vocabularyList: [mongoose.SchemaTypes.ObjectId],
    studentList: [mongoose.SchemaTypes.ObjectId],
    sectionList: [mongoose.SchemaTypes.ObjectId]
}, { selectPopulatedPaths: true });

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;