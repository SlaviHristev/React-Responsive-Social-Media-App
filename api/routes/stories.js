import  Express  from "express";
import { getStory } from "../controllers/story.js";


const router = Express.Router();

router.get('/', getStory);
// router.post('/', addStory);
// router.delete('/', deleteStory);

export default router;