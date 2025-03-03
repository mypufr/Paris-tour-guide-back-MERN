import mongoose from 'mongoose';
import { Schema } from "mongoose";

const newUserSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true
  },
  password: String,

  // username: String ,
  // name: String ,
  // email: { type: String, required: true, unique: true },
  // password: String,
  // // tel: String ,
  // // isTourist: { type: Boolean, default: false },
  // // isGuide: { type: Boolean, default: false },

})



const Newuser = mongoose.model('Newuser', newUserSchema, "new-users")

export default Newuser
