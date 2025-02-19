import mongoose from "mongoose";
import { Schema } from "mongoose";

const TourguideSchema = new Schema({
  // username: String,
  // email: {
  //   type: String,
  //   unique: true
  // },
  // password: String,

  name: String,
  img: String,
  speciality1: String,
  speciality2: String,
  speciality3: String,
  id: String,
  price: String,
});

const Tourguide = mongoose.model("Tourguide", TourguideSchema, "tourguide-profile");

export default Tourguide;
