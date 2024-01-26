
import {db} from '../connectDb.js';
import  jwt  from 'jsonwebtoken';

export const getUser = (req,res) =>{
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE id = ? "

    db.query(q,[userId], (err,data) =>{
        if(err) return res.status(500).json(err);
        const {password, ...info} = data[0];
        return res.json(info)
    })

};

export const updateUser = (req,res) =>{
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "verySecretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "UPDATE users SET `name`=?, `city`=?,`profilePic`=?, `coverPic`=? WHERE id=?";

        db.query(q,[
            req.body.name,
            req.body.city,
            req.body.coverPic,
            req.body.profilePic,
            userInfo.id
        ],(err,data) =>{
            if(err) return res.status(500).json(err);
            if(data.affectedRows > 0) return res.json("updated");
            return res.status(403).json("You can update only your post!")
        })
    })

};

export const getNotFollowedUsers = (req,res) =>{
    const userId = req.params.userId;

    const q = `
    SELECT users.*
    FROM users
    WHERE users.id <> ?  -- Exclude the current user
    AND users.id NOT IN (
        SELECT followedUserId
        FROM relationships
        WHERE followerUserId = ?
    );
`;

        db.query(q,[userId,userId], (err,data) =>{
            if(err) return res.status(500).json(err);
            res.status(200).json(data);
        })
}

export const getOnlineFollowedUsers = (req,res) =>{
const userId = req.params.userId;


const q = `SELECT users.* FROM users JOIN relationships ON users.id = relationships.followedUserId WHERE relationships.followerUserId = ? AND users.isOnline = true`;

db.query(q,[userId], (err,data) =>{
    if(err){
        console.log('Error fetching online followed users:',err);
        return res.status(500).json({error: 'Internal Server Error'})
    };

    return res.status(200).json(data);
})
}