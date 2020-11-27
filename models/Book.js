const mongoose = require("mongoose");
// require('mongoose-type-url');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  bookURL: {
    type: String,
    required: true,
  },
  bookCover: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  uploaded: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  published: {
    type: Boolean,
    default: false,
  },
});

// // Instance methods
// BookSchema.methods.add = function(name, callback){
//     this.name = name;
//     return this.save(callback);
// }

module.exports = mongoose.model("books", BookSchema);
