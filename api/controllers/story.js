import moment from 'moment/moment.js';
import {db} from '../connectDb.js';
import  jwt  from 'jsonwebtoken';


export const getStory = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "verySecretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = `SELECT s.*, name FROM stories AS s JOIN users AS u ON (u.id = s.userId)
    LEFT JOIN relationships AS r ON (s.userId = r.followedUserId AND r.followerUserId= ?) LIMIT 4`;


        const values = userId !== undefined ? [userId] : [userInfo.id, userInfo.id];

       

        db.query(q, values, (err, data) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json(err);
            }
            return res.status(200).json(data);
        });
    });
};

export const addStory = (req,res) =>{
    const token = req.cookies.accessToken;
    
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "verySecretKey",(err,userInfo) =>{
        if(err) return res.status(403).json("Token is not valid!")

        const q = "INSERT INTO stories (`img`, `userId`) VALUES (?)";

        const values = [
            req.body.img,
            userInfo.id
        ]

        db.query(q,[values], (err,data) =>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Story has been created!");
        })
    });
}

export const deleteStory = (req,res) =>{
    const token = req.cookies.accessToken;
        
            if(!token) return res.status(401).json("Not logged in!");
        
            jwt.verify(token, "verySecretKey",(err,userInfo) =>{
                if(err) return res.status(403).json("Token is not valid!")
        
                const q = "DELETE FROM stories WHERE `id`=? AND `userId`=?";

                db.query(q,[req.params.id,userInfo.id], (err,data) =>{
                    if(err) return res.status(500).json(err);
                    if(data.affectedRows > 0) return res.status(200).json("Story has been deleted!");
                    return res.status(403).json('You can delete only your story!')
                })
            });
}