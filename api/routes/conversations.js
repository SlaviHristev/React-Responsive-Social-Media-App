import  express  from "express";
import { addConversation,findOrCreateConversation,getConversation } from '../controllers/conversation.js'


const router = express.Router();

router.post('/', addConversation);
router.get('/:userId',getConversation);
router.get('/find/:firstUserId/:secondUserId', findOrCreateConversation)



export default router;