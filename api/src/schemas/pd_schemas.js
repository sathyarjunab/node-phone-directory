let mongoose = require("mongoose");

const { Schema } = mongoose;

const directory = new Schema({
  name: String,
  phone_number: Number,
  work: String,
  email: String,
});

module.exports = mongoose.model("dir", directory);
