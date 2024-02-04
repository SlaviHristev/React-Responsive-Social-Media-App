import  Express  from "express";
import { getUser, updateUser, getNotFollowedUsers, getFollowedUsers, } from "../controllers/user.js";
import  {updateUserActivity}  from "../middlewares/setOnline.js";
const router = Express.Router();

router.get('/find/:userId', updateUserActivity,getUser);
router.put('/', updateUserActivity,updateUser);
router.get('/notfollowed/:userId', updateUserActivity, getNotFollowedUsers);

router.get('/friends/:userId',getFollowedUsers)

export default router;