import Express from "express";
import { getPosts, addPosts ,deletePost} from "../controllers/post.js";


const router = Express.Router();

router.get('/', getPosts);
router.post('/', addPosts);
router.delete('/:id',deletePost);

export default router;