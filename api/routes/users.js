import  Express  from "express";
import { getUser, updateUser, getNotFollowedUsers, getOnlineFollowedUsers} from "../controllers/user.js";
import  {updateUserActivity}  from "../middlewares/setOnline.js";
const router = Express.Router();

router.get('/find/:userId', updateUserActivity,getUser);
router.put('/', updateUserActivity,updateUser);
router.get('/notfollowed/:userId', updateUserActivity, getNotFollowedUsers);
router.get('/onlineFollowed/:userId', updateUserActivity, getOnlineFollowedUsers)

export default router;