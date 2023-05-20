const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    name: { type: String },
    regNo: { type: String },
    courses: [{
        courseId: { type: String },
        grade: { type: String },
    }],
})

const Result = mongoose.model('result', resultSchema);

module.exports = Result;