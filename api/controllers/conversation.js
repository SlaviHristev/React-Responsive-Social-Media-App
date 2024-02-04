import { db } from '../connectDb.js';

export const addConversation = (req, res) => {

    const q = `INSERT INTO conversation (members) VALUES (JSON_ARRAY(?, ?)) ON DUPLICATE KEY UPDATE members = members`;

    const { senderId, recieverId } = req.body;

    db.query(q, [senderId, recieverId], (err, result) => {
        if (err) {
            console.error('Error creating conversation', err);
            return res.status(500).json('Internal server error!')
        };

        const conversationId = result.insertId || result.info;

        res.status(200).json({ conversationId });
    })
}

export const getConversation = (req, res) => {
    const q = `SELECT id,members,created_at,updated_at FROM conversation WHERE JSON_CONTAINS(members,JSON_ARRAY(?), '$') > 0`;

    const userId = req.params.userId;

    console.log(userId);
    db.query(q, [userId], (err, data) => {
        if (err) {
            console.error('Error fetching user conversations', err);
            return res.status(500).json('Internal server error!')
        }

        return res.status(200).json(data);
    })
}

export const findOrCreateConversation = (req, res) => {
    const firstUserId = req.params.firstUserId;
    const secondUserId = req.params.secondUserId;

    const checkConversationQuery = `
        SELECT * FROM conversation
        WHERE JSON_CONTAINS(members, CAST(JSON_ARRAY(CAST(? AS CHAR), CAST(? AS CHAR)) AS JSON)) = 1
    `;

    db.query(checkConversationQuery, [firstUserId, secondUserId], async (err, data) => {
        if (err) {
            console.error('Error checking conversation:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (data.length > 0) {
            const conversation = data[0];
            return res.status(200).json(conversation);
        } else {
            const createConversationQuery = `
                INSERT INTO conversation (members) VALUES (?)
            `;
            const newConversation = [JSON.stringify([firstUserId, secondUserId])];

            db.query(createConversationQuery, [newConversation], (err, result) => {
                if (err) {
                    console.error('Error creating conversation:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                const createdConversationId = result.insertId;
                const getConversationQuery = `
                    SELECT * FROM conversation WHERE id = ?
                `;

                db.query(getConversationQuery, [createdConversationId], (err, newData) => {
                    if (err) {
                        console.error('Error fetching created conversation:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    const createdConversation = newData[0];
                    return res.status(200).json(createdConversation);
                });
            });
        }
    });
};