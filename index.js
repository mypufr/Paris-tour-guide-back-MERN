import express from 'express';
import authRoutes from "./routes/authRoutes.js";
// ES6
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import mongoose from 'mongoose';
// import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser' ;

const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Database connected'))
.catch((err)=>console.log('Database not connected, err'))

// middleware : parse req.body for express

app.use(
  cors({
    origin: "http://localhost:5173", // 前端網址
    credentials: true, // 允許前端攜帶 cookie
  })
);
app.use(express.json())
app.use(cookieParser())
// Parse or decode data that has been submitted using the URL-encoded format within an HTTP request.
app.use(express.urlencoded({extended: false}))

app.use("/api", authRoutes)

 
// app.use(router);


const port = 8000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`))