const mongoose = require("mongoose");

const klassSchema = new mongoose.Schema({
    author: String,
    studentList: [String],
    vocabularyList: [String],
    classType: String,
    origin: String,
    title: String,
    Schedule: {
        dayOfWeek: [String],
        end: String,
        endTime: String,
        start: String,
        startTime: String
    }
});

const Klass = mongoose.model("Klass", klassSchema);

module.exports = Klass;