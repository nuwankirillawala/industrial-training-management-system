const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const noticeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "notice title is required"]
    },
    body: {
        type: String,
        required: [true, "notice body is required"]
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Admin,
        required: [true, "notice author is required"]
    },
    publishedDate:{
        type: Date,
        required: [true, "published date is required"]
    }
})

const Notice = new mongoose.model('notice', noticeSchema);

module.exports = Notice;