import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
});


export const userModel = mongoose.model(userCollection, userSchema);
