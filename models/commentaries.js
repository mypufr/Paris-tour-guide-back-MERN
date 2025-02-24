import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentariesSchema = new Schema({


  id: Number,
  name: String,
  userImg: String,

  date: String,
  commentaryText: String,
});

const Commentaries = mongoose.model("Commentaries", commentariesSchema, "commentaries");

export default Commentaries;
