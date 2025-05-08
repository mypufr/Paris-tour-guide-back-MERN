import mongoose from "mongoose";
const { Schema } = mongoose;


const MultiLangString = {
  en: { type: String, required: true },
  zh: { type: String, required: true },
  fr: { type: String, required: true },
};

const TourguideInfoTransSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: MultiLangString, required: true },
  profile: { type: MultiLangString, required: true },
  themes: [{ type: MultiLangString, required: true }], 
  languages: [{ type: MultiLangString, required: true }], 

  districts: { type: [String], required: true }, 

  trips: [
    {
      id: { type: Number, required: true },
      title: { type: MultiLangString, required: true },
      description: { type: MultiLangString, required: true },
    },
  ],

  sites: [
    {
      id: { type: Number, required: true },
      name: { type: MultiLangString, required: true },
    },
  ],

  available_slots: [
    {
      date: { type: String, required: true },
      time: { type: [String], required: true },
    },
  ],

  commentaries: [
    {
      user: { type: MultiLangString, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      date: { type: String, required: true },
      comment: { type: MultiLangString, required: true },
    },
  ],

  price_adult: { type: Number, required: true },
  price_child: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  isPopular: { type: Boolean, default: false },
});

const TourguideInfoTrans = mongoose.model("TourguideInfoTrans", TourguideInfoTransSchema, "tourguide-info-trans");

export default TourguideInfoTrans;
