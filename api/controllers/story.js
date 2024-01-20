import moment from 'moment/moment.js';
import {db} from '../connectDb.js';
import  jwt  from 'jsonwebtoken';


export const getStory = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "verySecretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = userId
        ? `SELECT id, img, userId FROM stories WHERE userId = ?`
        : `SELECT id, img, userId FROM stories LEFT JOIN relationships ON stories.userId = relationships.followedUserId
           WHERE relationships.followerUserId = ? OR stories.userId = ?`;

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

export const deleteStory = () =>{
    
}