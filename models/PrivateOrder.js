


import mongoose from "mongoose";
import { Schema } from "mongoose";

const tourguideInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  price_adult: { type: Number, required: true },
  price_child: { type: Number, required: true },
}, { _id: false });



const PrivateOrderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  selectedDate: { type: Date, required: true },
  selectedSlot: { type: String, required: true },
  selectedTheme: { type: String, required: true },
  tourguideInfo: { type: tourguideInfoSchema, required: true },
  privateOrderNumber: { type: String, unique: true }, // 🚨 不能用 default，改用 pre-save

}, {timestamps:true});

// ⭐ 使用 pre-save hook 來動態生成 privateOrderNumber
PrivateOrderSchema.pre("save", function (next) {
  if (!this.privateOrderNumber) {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    const namePart = this.userName ? this.userName.replace(/\s+/g, "").substring(0, 6) : "USER"; // 取 username 前 5 碼
    this.privateOrderNumber = `PO-${namePart}-${datePart}-${randomPart}`;
  }
  next();
});

const PrivateOrders = mongoose.model("PrivateOrders", PrivateOrderSchema, "private-orders");

export default PrivateOrders;
