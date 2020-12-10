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
  phoneNumber: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});

module.exports = mongoose.model("profiles", ProfileSchema);
