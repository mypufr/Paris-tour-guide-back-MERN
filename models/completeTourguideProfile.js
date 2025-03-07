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
  isPopular: { type: Boolean, default: false }
});

const CompleteTourguideProfile = mongoose.model("CompleteTourguideProfile", TourguideSchema, "tourguide-profile-test");

export default CompleteTourguideProfile;
