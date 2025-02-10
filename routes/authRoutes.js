import express from "express";
const router = express.Router();
import cors from "cors";
import { test, registerUser, loginUser, getProfile, logoutUser, editProfile } from "../controllers/authController.js";


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

export default router;