import express from "express";
import cors from "cors";
import { test, registerUser, loginUser, getProfile, logoutUser, editProfile, getTourguideProfile } from "../controllers/authController.js";

const router = express.Router();

router.use(
  cors({
    credentials:true,
    origin:'http://localhost:5173'
  })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)
router.post('/profile/edit', editProfile)


router.get('/tourguides', getTourguideProfile)

export default router;