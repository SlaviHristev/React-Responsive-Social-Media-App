import  Express  from "express";
import { getStory, addStory,deleteStory } from "../controllers/story.js";


const router = Express.Router();

router.get('/', getStory);
router.post('/', addStory);
router.delete('/:id', deleteStory);

export default router;