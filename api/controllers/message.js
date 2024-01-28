import { db } from '../connectDb.js';

export const addMessage = (req, res) => {
    const { conversation_id, sender, text } = req.body;
  
    const q = `INSERT INTO message (conversation_id, sender, text) VALUES (?, ?, ?)`;
  
    db.query(q, [conversation_id, sender, text], (err, result) => {
      if (err) {
        console.error('Error adding a new message', err);
        return res.status(500).json('Internal server error!');
      }
  
      const newMessageId = result.insertId;
  
      
      const selectQuery = `SELECT * FROM message WHERE id = ?`;
  
      db.query(selectQuery, [newMessageId], (selectErr, data) => {
        if (selectErr) {
          console.error('Error retrieving the added message', selectErr);
          return res.status(500).json('Internal server error!');
        }
  
        const addedMessage = data[0];
        return res.status(200).json(addedMessage);
      });
    });
  };
  

  export const getMessagesByconversation_id = (req,res) =>{
      const q = `SELECT * FROM message WHERE conversation_id = ? ORDER BY created_at ASC`
      const conversation_id = req.params.conversation_id;

      db.query(q, [conversation_id], (err, data) => {
        if (err) {
          console.error('Error fetching messages by conversation ID', err);
          return res.status(500).json('Internal server error!');
        }
    
        return res.status(200).json(data);
    });
  }