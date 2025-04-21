import express from "express";
// import cors from "cors";
import { test, registerUser, loginUser, getProfile, logoutUser, editProfile, 
  getTourguideProfile, getCommentaries, getTourguideInfo, getTrips, getTourguideInfoById, getTours, getSites,

  sendMessages,
  sendPrivateOrders,
  getPrivateOrdersByUsername,
  getPopularTourguides,
  getTourguidesByDistrict,
  getSelectedGuidesByTheme

} from "../controllers/authController.js";

const router = express.Router();

// router.use(
//   cors({
//     credentials:true,
//     origin:'http://localhost:5173',
//   })
// )

router.get('/test', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)
router.post('/profile/edit', editProfile)


router.get('/tourguides', getTourguideProfile)
router.get('/commentaries', getCommentaries)
router.get('/tourguideInfo', getTourguideInfo)

router.get('/tourguideInfo/:id', getTourguideInfoById)
router.get('/trips', getTrips)
router.get('/tours', getTours)
router.get('/sites', getSites)


router.post('/messages', sendMessages)
router.post('/:username/private-orders', sendPrivateOrders)
router.get('/:userName/private-orders', getPrivateOrdersByUsername)


router.get('/popular-tourguides', getPopularTourguides);

router.get('/district/:district', getTourguidesByDistrict);

router.get('/guides', getSelectedGuidesByTheme)

export default router;