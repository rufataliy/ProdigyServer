const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    author: String,
    title: String,
    level: String,
    sectionType: String,
    text: String,
    lessonId: mongoose.SchemaTypes.ObjectId,
}, { selectPopulatedPaths: true, strict: false });

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;