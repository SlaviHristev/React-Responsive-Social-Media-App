import  Express  from "express";
import { getUser, updateUser, getNotFollowedUsers, getFollowedUsers, } from "../controllers/user.js";

const router = Express.Router();

router.get('/find/:userId',getUser);
router.put('/',updateUser);
router.get('/notfollowed/:userId', getNotFollowedUsers);
router.get('/friends/:userId',getFollowedUsers)

export default router;