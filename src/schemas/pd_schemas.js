import mongoose from "mongoose";

const { Schema } = mongoose;

const directory = new Schema({
  name: String,
  phone_number: Number,
  work: String,
  email: String,
});

export default mongoose.model("dir", directory);
