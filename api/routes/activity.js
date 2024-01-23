import Express from "express";
import { getLatestActivities, recordActivity } from "../controllers/activity.js";

const router = Express.Router();

router.get('/', getLatestActivities);
router.post('/', recordActivity)

export default router;