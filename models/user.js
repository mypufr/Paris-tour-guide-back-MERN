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
  // tel: String ,
  // isTourist: { type: Boolean, default: false },
  // isGuide: { type: Boolean, default: false },

})

// Mongoose 自動產生 _id 和虛擬屬性 id（如果需要可以設定）
// userSchema.set("toObject", { virtuals: true });
// userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model('User', userSchema)

export default User
