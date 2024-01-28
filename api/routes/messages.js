import  express  from "express";
import { addMessage,getMessagesByconversation_id } from "../controllers/message.js";

const router = express.Router();

router.post('/',addMessage);
router.get('/:conversation_id',getMessagesByconversation_id);



export default router;