import { db } from '../connectDb.js';
import jwt from 'jsonwebtoken'
export const recordActivity = (userId, activityType, activityDetails) => {
    const q = `INSERT INTO useractivities (userId, activityType, activityDetails) VALUES = (?)`
    const values = [userId, activityType, activityDetails];

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

        const q = `SELECT ua.id AS activityId, ua.userId, ua.activityType, ua.activityDetails, ua.createdAt,
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
            console.log('Query result:', data);
            return res.status(200).json(data);

        })



    });
};