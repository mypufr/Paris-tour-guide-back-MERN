import mongoose from 'mongoose';
import { Schema } from "mongoose";

const userSchema = new Schema({
  // username: String,
  // email: {
  //   type: String,
  //   unique: true
  // },
  // password: String,

  username: String ,
  name: String ,
  email: { type: String, required: true, unique: true },
  password: String,
  tel: String ,
  isTourist: { type: Boolean, default: false },
  isGuide: { type: Boolean, default: false },
})

const User = mongoose.model('User', userSchema)

export default User
