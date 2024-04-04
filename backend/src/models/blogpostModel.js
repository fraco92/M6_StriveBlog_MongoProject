const mongoose = require("mongoose");

const BlogpostSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    max: 255,
  },
  title: {
    type: String,
    required: true,
    max: 255,
  },
  cover: {
    type: String,
    required: true,
    max: 255,
  },
  readTime: {
    value: Number,
    unit: {
      type: String,
    },
  },
  author: {
    name: {
      type: String,
      required: true,
      max: 255,
    },
    avatar: {
      type: String,
      required: false,
      max: 255,
    },
  },
  content: {
    type: String,
    required: true,
    max: 255,
  },
});

module.exports = mongoose.model("blogpostModel", BlogpostSchema, "blogposts");
