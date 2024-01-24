import  Express  from "express";
import { getUser, updateUser, getNotFollowedUsers} from "../controllers/user.js";


const router = Express.Router();

router.get('/find/:userId',getUser);
router.put('/',updateUser);
router.get('/notfollowed/:userId', getNotFollowedUsers);

export default router;