const mongoose = require("mongoose");

const klassSchema = new mongoose.Schema({
    author: String,
    title: String,
    level: String,
    classType: String,
    origin: String,
    daysOfWeek: [String],
    start: String,
    end: String,
    endTime: String,
    startTime: String,
    vocabularyList: [String],
    studentList: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
    programList: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Program" }],
}, { selectPopulatedPaths: true });

const Klass = mongoose.model("Klass", klassSchema);

module.exports = Klass;