import User from "../models/user.js";
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
      return res.json("配對成功", token);
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
export const editProfile = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "請求 body 為空，請確認前端是否正確傳遞資料" });
  }
  console.log("收到的請求資料:", req.body)
  res.status(200).json({message:"edit profile ok", data: req.body} )
} 