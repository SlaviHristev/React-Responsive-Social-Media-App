import Express from "express";
import { getPosts } from "../controllers/post.js";


const router = Express.Router();

router.get('/', getPosts);

export default router;