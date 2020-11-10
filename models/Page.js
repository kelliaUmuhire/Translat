const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  chapter_id: {
    type: mongoose.ObjectId,
    required: true,
  },
  book_id: {
    type: mongoose.ObjectId,
    required: true,
  },
  num: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("pages", PageSchema);
