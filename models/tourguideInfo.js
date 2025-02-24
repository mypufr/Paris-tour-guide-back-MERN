import mongoose from "mongoose";
import { Schema } from "mongoose";

const TourguideInfoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profile: { type: String, required: true },
  themes: [{ type: String, required: true }], // 陣列
  languages: [{ type: String, required: true }], // 陣列
  districts: [{ type: String, required: true }], // 陣列
  trips: [
    {
      id: { type: Number, required: true, unique: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  sites: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
    },
  ],
  available_slots: [
    {
      date: { type: String, required: true },
      time: { type: Array, required: true },
    },
  ],
  commentaries: [
    {
      user: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      date: { type: String, required: true },
      comment: { type: String, required: true },
    },
  ],
  price_adult: {type: Number, required: true},
  price_child: {type: Number, required: true},
  imgUrl:{ type: String, required: true }
});




const TourguideInfo = mongoose.model("TourguideInfo", TourguideInfoSchema, "tourguide-info");

export default TourguideInfo;
