const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    book_id: {
        type: mongoose.ObjectId,
        required: true
    },
    pageNumber: {
        type: Number,
        default: 0
    },
    num: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('chapters', ChapterSchema)