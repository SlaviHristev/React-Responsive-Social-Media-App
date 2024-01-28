import { db } from '../connectDb.js';

export const addConversation = (req,res) =>{

    const q = `INSERT INTO conversation (members) VALUES (JSON_ARRAY(?, ?)) ON DUPLICATE KEY UPDATE members = members`;

    const {senderId, recieverId} = req.body;

    db.query(q,[senderId,recieverId], (err,result) =>{
        if(err){
            console.error('Error creating conversation', err);
            return res.status(500).json('Internal server error!')
        };

        const conversationId = result.insertId || result.info;

        res.status(200).json({conversationId});
    })
}

export const getConversation = (req,res)=>{
     const q = `SELECT id,members,created_at,updated_at FROM conversation WHERE JSON_CONTAINS(members,JSON_ARRAY(?), '$') > 0`;
     
     const userId = req.params.userId;

     db.query(q, [userId], (err,data) =>{
        if(err){
            console.error('Error fetching user conversations',err);
            return res.status(500).json('Internal server error!')
        }

        return res.status(200).json(data);
     })
}