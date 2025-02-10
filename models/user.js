import mongoose from 'mongoose';
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
})

const User = mongoose.model('User', userSchema)

export default User
