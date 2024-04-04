const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 255,
    },
    surname: {
      type: String,
      required: true,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      max: 255,
    },
    birthdate: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("authorModel", AuthorSchema, "authors");
