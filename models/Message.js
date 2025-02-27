import mongoose from "mongoose";
import { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema({
  tourguideName: { type: String, required: true },
  senderName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // ✅ Email 仍然是唯一的
  messages: [
    {
      text: { type: String, required: true }, // 留言內容
      createdAt: { type: Date, default: Date.now }, // 留言時間
    },
  ],
});

const Message = mongoose.model("Message", MessageSchema, "messageTest");

export default Message;
