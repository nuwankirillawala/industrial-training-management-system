const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "notice title is required"]
    },
    body: {
        type: String,
        required: [true, "notice body is required"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Admin,
        required: [true, "notice author is required"]
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    editLog: [{
        status: {
            type: String,
            enum:['created', 'edited'],
            required: true
        },
        title: {
            type: String,
            required: [true, "notice title is required"]
        },
        body: {
            type: String,
            required: [true, "notice body is required"]
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Admin,
            required: [true, "notice author is required"]
        },
        editDate: {
            type: Date,
            required: true
        }
    }]
});

noticeSchema.post('save', function (doc, next) {
    console.log('new notice is created', doc);
    next();
})

const Notice = new mongoose.model('notice', noticeSchema);

module.exports = Notice;