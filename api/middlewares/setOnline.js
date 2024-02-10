// import {db} from '../connectDb.js';

// export const updateUserActivity = (req, res, next) => {
    
//     const userId = req.params.userId; 
  
  
//     const q = `UPDATE users SET isOnline = true WHERE id = ?`;
//     db.query(q, [userId], (err, result) => {
//       if (err) {
//         console.error('Error updating user activity:', err);
        
//       }
  
      
//       next();
//     });
//   };