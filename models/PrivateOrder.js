// import mongoose from "mongoose";
// import { Schema } from "mongoose";

// // const privateOrderSchema = new mongoose.Schema({
// //   adultCount: { type: Number, required: true },
// //   childCount : { type: Number, required: true },
// //   selectedDate : { type: Date, required: true },
// //   selectedSlot : { type: String, required: true },
// //   selectedTheme : { type: String, required: true },
// //   tourguideInfo: { type: mongoose.Schema.Types.Mixed, required: true }, 
// // });

// // const PrivateOrders = mongoose.model("PrivateOrders", privateOrderSchema, "private-orders");

// // export default PrivateOrders;



// const tourguideInfoSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   imgUrl: { type: String, required: true },
//   price_adult: { type: Number, required: true },
//   price_child: { type: Number, required: true },
//   // 可以根據需求擴充其他欄位
// }, { _id: false });

// const PrivateOrderSchema = new mongoose.Schema({
//   adultCount: { type: Number, required: true },
//   childCount: { type: Number, required: true },
//   selectedDate: { type: Date, required: true },
//   selectedSlot: { type: String, required: true },
//   selectedTheme: { type: String, required: true },
//   tourguideInfo: { type: tourguideInfoSchema, required: true },
//   privateOrderNumber: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     default: function () { 
//       const datePart = new Date().toISOString().slice(0,10).replace(/-/g, "");
//       const randomPart = Math.floor(Math.random()* 10000).toString().padStart(4, "0");
//       return `PO-${datePart}-${randomPart}`; 
//     }
// })


// // PrivateOrderSchema.pre("save", function(next){
// //   if(!this.privateOrderNumber) {
// //     const datePart = new Date().toISOString().slice(0,10).replace(/-/g, "");
// //     const randomPart = Math.floor(Math.random()* 10000).toString().padStart(4, "0");
// //     this.privateOrderNumber=`PO-${datePart}-${randomPart}`; 
// //   }
// //   next();
// // });


// const PrivateOrders = mongoose.model("PrivateOrders", PrivateOrderSchema, "private-orders");
// export default PrivateOrders;


import mongoose from "mongoose";
import { Schema } from "mongoose";

const tourguideInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  price_adult: { type: Number, required: true },
  price_child: { type: Number, required: true },
}, { _id: false });

// const PrivateOrderSchema = new mongoose.Schema({
//   userName: { type: String, required: true },
//   userEmail: { type: String, required: true },
//   adultCount: { type: Number, required: true },
//   childCount: { type: Number, required: true },
//   selectedDate: { type: Date, required: true },
//   selectedSlot: { type: String, required: true },
//   selectedTheme: { type: String, required: true },
//   tourguideInfo: { type: tourguideInfoSchema, required: true },
//   privateOrderNumber: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     default: function () { 
//       const datePart = new Date().toISOString().slice(0,10).replace(/-/g, "");
//       const randomPart = Math.floor(Math.random()* 10000).toString().padStart(4, "0");
//       const namePart = this.userName ? this.userName.replace(/\s+/g, "").substring(0, 5) : "USER"; // 取 username 前 5 碼
//       this.privateOrderNumber = `PO-${namePart}-${datePart}-${randomPart}`;
//       return `PO-${datePart}-${randomPart}`; 
//     }
//   }
// });

// // 確保 `privateOrderNumber` 唯一
// PrivateOrderSchema.pre("validate", async function (next) {
//   if (!this.privateOrderNumber) {
//     let orderNumber;
//     let isUnique = false;

//     while (!isUnique) {
//       const datePart = new Date().toISOString().slice(0,10).replace(/-/g, "");
//       const randomPart = Math.floor(Math.random()* 10000).toString().padStart(4, "0");
//       orderNumber = `PO-${datePart}-${randomPart}`;

//       const existingOrder = await mongoose.model("PrivateOrders").findOne({ privateOrderNumber: orderNumber });
//       if (!existingOrder) {
//         isUnique = true;
//       }
//     }
    
//     this.privateOrderNumber = orderNumber;
//   }
//   next();
// });

// const PrivateOrders = mongoose.model("PrivateOrders", PrivateOrderSchema, "private-orders");
// export default PrivateOrders;


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
});

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
