import mongoose from "mongoose";
import { Schema } from "mongoose";

const tripsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  tripName: { type: String, required: true },
  imgUrl: { type: String, required: true },
  date: { type: String, required: true }, // 可改為 [String] 以存多個日期
  sites: { 
    site1: { type: String, required: true },
    site2: { type: String, required: true },
    site3: { type: String, required: true },
    site4: { type: String, required: true },
    site5: { type: String, required: true },
  },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  NumPeople: { type: Number, required: true },
  price: { type: Number, required: true }
});

const Trips = mongoose.model("trips", tripsSchema, "trips");

export default Trips;
