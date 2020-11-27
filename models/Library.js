const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  books: {
    type: Array,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("library", LibrarySchema);
