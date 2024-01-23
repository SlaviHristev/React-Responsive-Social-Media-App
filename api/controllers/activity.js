import { db } from '../connectDb.js';
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const recordActivity = (req,res) => {
    const q = `INSERT INTO useractivities (userId,createdAt,activityDetails) VALUES (?,?,?)`
    const values = [
        req.body.userId,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        req.body.activityDetails
    ];
    

    db.query(q, values, (err, data) => {
        if (err) {
            console.error('Error recording activity:', err);
        }
    })
};

export const getLatestActivities = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "verySecretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = `SELECT ua.id AS activityId, ua.userId, ua.activityDetails, ua.createdAt,
        u.id AS userId, u.username, u.profilePic
 FROM useractivities ua
 JOIN users u ON ua.userId = u.id
 ORDER BY ua.createdAt DESC
 LIMIT 5`;
        const values = userId !== undefined ? [userId] : [userInfo.id];

        db.query(q, values, (err, data) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal Server Error', details: err.message });
            }
            
            return res.status(200).json(data);

        })



    });
};