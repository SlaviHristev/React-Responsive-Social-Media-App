import  express  from "express";
import { addConversation,getConversation } from '../controllers/conversation.js'


const router = express.Router();

router.post('/', addConversation);
router.get('/:userId',getConversation);



export default router;