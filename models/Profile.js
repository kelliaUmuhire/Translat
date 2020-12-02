const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
  hobbies: {
    type: Array,
  },
  handle: {
    type: String,
    required: true,
  },
  isTranslator: {
    type: Boolean,
    default: false,
  },
  resume: {
    type: String,
  },
  names: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("profiles", ProfileSchema);
