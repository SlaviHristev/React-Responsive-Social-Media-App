import { useEffect, useState } from 'react';
import styles from './Message.module.css';
import moment from 'moment'
import { makeRequest } from '../../../axios';

export default function Message({ message, own }) {
    const formattedTimestamp = moment(message.created_at).format('MMM D, YYYY [at] h:mm A');

    const [userInfo,setUserInfo] = useState([]);

    useEffect(() =>{
        const getInfo = async () => {
            try {
                let senderId;
                if (message.senderId !== undefined) {
                    senderId = message.senderId;
                } else if (message.sender !== undefined) {
                    senderId = parseInt(message.sender);
                }
                if (!isNaN(senderId)) {
                    const res = await makeRequest.get('/users/find/' + senderId);
                    setUserInfo(res.data);
                } else {
                    console.error('Invalid sender ID:', message.senderId || message.sender);
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };
        getInfo();
    }, [message.sender, message.senderId]);

    return (
        <div className={own ? styles.own : styles.message}>
            <div className={styles.messageTop}>
                <img className={styles.messageImg} src={`/upload/${userInfo.profilePic}`} alt="" />
                <p className={styles.messageText}>{message.text}</p>
            </div>
            <div className={styles.messageBottom}>
                {formattedTimestamp}
            </div>
        </div>
    );
}