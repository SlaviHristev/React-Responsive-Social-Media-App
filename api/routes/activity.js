import Express from "express";
import { getLatestActivities } from "../controllers/activity.js";

const router = Express.Router();

router.get('/', getLatestActivities);

export default router;