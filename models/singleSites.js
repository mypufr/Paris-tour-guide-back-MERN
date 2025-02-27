import mongoose from "mongoose";
import { Schema } from "mongoose";

const siteSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  siteName: { type: String, required: true },
  imgUrl: { type: String, required: true },
  date: { type: Array, required: true }, // 可改為 [String] 以存多個日期
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  NumPeople: { type: Number, required: true },
  price: { type: Number, required: true }
});

const Site = mongoose.model("site", siteSchema, "single-site");

export default Site;
