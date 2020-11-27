const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  book_id: {
    type: mongoose.ObjectId,
    required: true,
  },
  pageNumber: {
    type: Number,
    min: 0,
    default: 0,
  },
  num: {
    type: Number,
    default: 1,
  },
  published: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("chapters", ChapterSchema);
