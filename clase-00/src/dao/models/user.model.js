import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  }
});

export const userModel = mongoose.model(userCollection, userSchema);

