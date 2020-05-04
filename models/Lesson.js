const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    author: String,
    title: String,
    level: String,
    vocabularyList: [{ type: [mongoose.SchemaTypes.ObjectId], ref: "Vocabulary" }],
    studentList: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    sectionList: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Section"
    }]
}, { selectPopulatedPaths: true });

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;