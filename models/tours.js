import mongoose from "mongoose";
import { Schema } from "mongoose";

const toursSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  tourName: { type: String, required: true },
  imgUrl: { type: String, required: true },
  date: { type: Array, required: true }, // 可改為 [String] 以存多個日期
  sites: { type: Array, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  NumPeople: { type: Number, required: true },
  price: { type: Number, required: true }
});

const Tours = mongoose.model("tours", toursSchema, "tours");

export default Tours;
