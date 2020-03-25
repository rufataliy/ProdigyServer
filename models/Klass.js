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
    studentList: [String]
}, { selectPopulatedPaths: true });
const Klass = mongoose.model("Klass", klassSchema);

module.exports = Klass;