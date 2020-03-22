const mongoose = require("mongoose");

const klassSchema = new mongoose.Schema({
    author: String,
    studentList: [String],
    vocabularyList: [String],
    classType: String,
    origin: String,
    daysOfWeek: [String],
    title: String,
    level: String,
    end: String,
    endTime: String,
    start: String,
    startTime: String
}, { selectPopulatedPaths: true });
const Klass = mongoose.model("Klass", klassSchema);


module.exports = Klass;