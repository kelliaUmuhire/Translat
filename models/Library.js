const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  books: {
    type: Array,
  },
  userId: {
    type: String,
    required: true,
  },
  translate: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("library", LibrarySchema);
