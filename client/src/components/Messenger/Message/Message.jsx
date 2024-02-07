import { useEffect, useState } from 'react';
import styles from './Message.module.css';
import moment from 'moment'
import { makeRequest } from '../../../axios';

export default function Message({ message, own }) {
    const formattedTimestamp = moment(message.created_at).format('MMM D, YYYY [at] h:mm A');

    const [userInfo,setUserInfo] = useState([]);

    useEffect(() =>{
        const getInfo =async() =>{
            const res = await makeRequest.get('/users/find/' +Number(message.sender));
            setUserInfo(res.data);
        }
        getInfo()
    }, [])

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