import mongoose from "mongoose";
import User from "../models/user.js";
import Tourguide from "../models/tourguideProfile.js";
import Commentaries from "../models/commentaries.js";
import TourguideInfo from "../models/tourguideInfo.js";
import Trips from "../models/trips.js"
import Tours from "../models/tours.js";
import Sites from "../models/singleSites.js";
import Message from "../models/Message.js";

import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";


export const test = (req, res) => {
  res.json("test is working");
};

// Signup Endpoint
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email) {
      return res.json("請輸入有效的帳號");
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json("此帳號已存在");
    }

    if (!password || password.length < 8) {
      return res.json({ error: "請輸入包含8個字母或數字的有效密碼" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// Login Endpoint
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "帳號不存在" });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (passwordMatch) {
      jwt.sign(
        { email: user.email, id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          // Set a cookie named 'token' with the value token
          // Send a JSON response containing the user object back to the client.
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production" ? true : false, // 本地環境不啟用 secure
              sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 避免跨域問題
            })
            .json(user);
        }
      );
      return res.status(200).json({
        message: "配對成功",
        user: {
          email: user.email,
          id: user._id,
          username: user.username,
        },
      });
    }

    if (!passwordMatch) {
      return res.json("登入失敗! 帳號密碼有誤");
    }
  } catch (error) {
    console.log(error);
  }
};

// Get Profile Endpoint
export const getProfile = (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

// Logout Endpoint

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.json({ message: "已成功登出" });
};

// Edit Profile Endpint
export const editProfile = async (req, res) => {
  try {
    console.log("收到的請求資料:", req.body); // 確保前端有傳來資料
    const { email, username, name, tel, isTourist, isGuide } = req.body;

    if (!email || !username || !name) {
      return res
        .status(400)
        .json({ error: "缺少必要欄位: email, username, name" });
    }

    const convertedIsTourist = isTourist === "on" ? true : false;

    const updatedUser = await User.findOneAndUpdate(
      { email: email }, // 根據 email 找到使用者
      { username, name, tel, isTourist:convertedIsTourist, isGuide }, // 更新欄位
      { new: true, runValidators: true } // 回傳更新後的資料
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "使用者不存在" });
    }

    res.status(200).json({ message: "編輯成功", user: updatedUser });

    // 建立新使用者
    // const newUser = new User({
    //   username: req.body.username,
    //   name: req.body.name,
    //   email: req.body.email,
    //   tel: req.body.tel,
    //   isTourist: isTourist,
    //   isGuide: req.body.isGuide,
    // });

    // 將資料存入 MongoDB
    // await newUser.save();
    // res.status(200).json({ message: "使用者資料已成功儲存", data: newUser });
  } catch (error) {
    console.error("❌ 儲存使用者資料失敗:", error);
    res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
  }
};


export const getTourguideProfile = async(req, res) => {
  try {
    const tourguides = await Tourguide.find();
    res.json(tourguides);
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error })
  }
}

export const getCommentaries = async(req, res) => {
  try {
    
    const commentaries = await Commentaries.find();
    res.json(commentaries);
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error })
  }
}

export const getTourguideInfo= async(req, res) => {
  try {
    
    // const tourguideInfo = await TourguideInfo.findOne( {id:1} );

     const tourguideInfo = await TourguideInfo.find( {} );
    // const {id} = req.params;
    
    if(!tourguideInfo) {
      return res.status(404).json({ message: "導遊資料未找到" });

    }
    // res.json(tourguideInfo.profile);
    // console.log(tourguideInfo.profile)
    res.status(200).json({ success: true, data: tourguideInfo });

  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error })
  }
}

export const getTrips = async(req, res) => {
  try {
    
    const trips = await Trips.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error })
  }
}

export const getTourguideInfoById = async(req, res)=> {

try {
  const {id} = req.params;
  console.log("🔍 查詢導遊 ID:", id); // 確保有拿到 id

  if (!id) {
    return res.status(400).json({ message: "請提供有效的導遊 ID" });
  }


  const tourguideById = await TourguideInfo.findOne( {id} );
 

 if (!tourguideById) {
  return res.status(404).json({ message: "導遊資料未找到", error });
 }
 return res.json(tourguideById);
} catch (error) {
  console.error("❌ 查詢導遊資料失敗:", error);

  if (!res.headersSent) {
    return res.status(500).json({ message: "伺服器錯誤", error: error.message });
  }

}

}

export const getTours = async(req, res) => {
  try {
    
    const tours = await Tours.find();
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error })
  }
}


export const getSites = async(req, res) => {
  try {
    
    const sites = await Sites.find();
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: "伺服器錯誤", error })
  }
}


//   let { tourguideId, message} = req.body; 


//   export const sendMessages = async(req, res) => {
//   let { tourguideId, message} = req.body; 

// const db = client.db()

// //   if (!tourguideId || !message) {
// //     return res.status(400).json({error: "請提供導遊 ID 和留言內容"})
// //   }


// // try {


// //   if (!mongoose.Types.ObjectId.isValid(tourguideId)) {
// //     return res.status(400).json({ error: "無效的導遊 ID" });
// //   }


//   // const newMessage = new Message({tourguideId, message});


// //   res.json({ success: true, message: "留言已儲存！" });

// // } catch (error) {
// //   console.error("留言儲存失敗", error);
// //   res.status(500).json({ error: "伺服器錯誤", details: error.message });
// // }

// try {

//   const newMessage = new Message({tourguideId, message});
//   const res = await db.Collection('message').insertOne(newMessage)
//   newMessage= res.insertedId;
// } catch (error) {

//   res.status(500).json({ error: "伺服器錯誤", details: error.message });
// }



// }

// const db = client.db()

// //   if (!tourguideId || !message) {
// //     return res.status(400).json({error: "請提供導遊 ID 和留言內容"})
// //   }


// // try {


// //   if (!mongoose.Types.ObjectId.isValid(tourguideId)) {
// //     return res.status(400).json({ error: "無效的導遊 ID" });
// //   }


//   // const newMessage = new Message({tourguideId, message});


// //   res.json({ success: true, message: "留言已儲存！" });

// // } catch (error) {
// //   console.error("留言儲存失敗", error);
// //   res.status(500).json({ error: "伺服器錯誤", details: error.message });
// // }

// try {

//   const newMessage = new Message({tourguideId, message});
//   const res = await db.Collection('message').insertOne(newMessage)
//   newMessage= res.insertedId;
// } catch (error) {

//   res.status(500).json({ error: "伺服器錯誤", details: error.message });
// }



// }



// export const sendMessages = async (req, res) => {
//   let { tourguideId, message } = req.body;

//   if (!tourguideId || !message) {
//     return res.status(400).json({ error: "請提供導遊 ID 和留言內容" });
//   }

//   try {
//     // ✅ 確保 tourguideId 是 ObjectId
//     if (!mongoose.Types.ObjectId.isValid(tourguideId)) {
//       return res.status(400).json({ error: "無效的導遊 ID" });
//     }

//     // ✅ 使用 Mongoose Model 來存資料
//     const newMessage = new Message({
//       tourguideId: new mongoose.Types.ObjectId(tourguideId),
//       message,
//     });

//     await newMessage.save(); // ✅ 正確儲存

//     res.json({ success: true, message: "留言已儲存！" });

//   } catch (error) {
//     console.error("留言儲存失敗", error);
//     res.status(500).json({ error: "伺服器錯誤", details: error.message });
//   }
// };

// export const sendMessages = async (req, res) => {
//   let { tourguideId, name, email, message } = req.body;

//   if (!tourguideId || !name || !email || !message) {
//     return res.status(400).json({ error: "請提供完整資訊" });
//   }

//   try {
//     if (!mongoose.Types.ObjectId.isValid(tourguideId)) {
//       return res.status(400).json({ error: "無效的導遊 ID" });
//     }

//     // 檢查 Email 是否已存在
//     const existingMessage = await Message.findOne({ email });
//     if (existingMessage) {
//       return res.status(400).json({ error: "該 Email 已經留言過" });
//     }

//     const newMessage = new Message({
//       tourguideName: new mongooseName.(tourguideId),
//       name,
//       email,
//       message,
//     });

//     await newMessage.save();

//     res.json({ success: true, message: "留言已儲存！" });

//   } catch (error) {
//     console.error("留言儲存失敗", error);
//     res.status(500).json({ error: "伺服器錯誤", details: error.message });
//   }
// };


// export const sendMessages = async (req, res) => {
//   let { tourguideName, name, email, message } = req.body;

//   // 確保所有欄位都有填寫
//   if (!tourguideName || !name || !email || !message) {
//     return res.status(400).json({ error: "請提供完整資訊" });
//   }

//   try {
//     // 檢查 Email 是否已經留言過
//     const existingMessage = await Message.findOne({ email, tourguideName });
//     if (existingMessage) {
//       return res.status(400).json({ error: "該 Email 已經留言過此導遊" });
//     }

//     // 建立新留言
//     const newMessage = new Message({
//       tourguideName, // ✅ 使用導遊名字而不是 ID
//       name,
//       email,
//       message,
//     });

//     // 儲存到資料庫
//     await newMessage.save();

//     res.json({ success: true, message: "留言已儲存！" });

//   } catch (error) {
//     console.error("留言儲存失敗", error);
//     res.status(500).json({ error: "伺服器錯誤", details: error.message });
//   }
// };

export const sendMessages = async (req, res) => {
  let { tourguideName, senderName, email, message } = req.body;

  if (!tourguideName || !senderName || !email || !message) {
    return res.status(400).json({ error: "請提供完整資訊" });
  }

  try {
    let existingMessage = await Message.findOne({ email });

    if (existingMessage) {
      // ✅ 如果 Email 存在，新增一條留言到 messages 陣列
      existingMessage.messages.push({ text: message });
      await existingMessage.save();
      return res.json({ success: true, message: "留言已新增！" });
    } else {
      // ✅ 如果 Email 不存在，建立新的留言紀錄
      const newMessage = new Message({
        tourguideName,
        senderName,
        email,
        messages: [{ text: message }],
      });
      await newMessage.save();
      return res.json({ success: true, message: "留言已儲存！" });
    }

  } catch (error) {
    console.error("留言儲存失敗", error);
    res.status(500).json({ error: "伺服器錯誤", details: error.message });
  }
};
