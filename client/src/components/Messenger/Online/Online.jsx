import { useEffect, useState } from 'react'
import styles from './Online.module.css'
import { makeRequest } from '../../../axios';

export default function Online({onlineUsers, currentUserId, setCurrentChat}){

    const [friends,setFriends] = useState([]);
    const [onlineFriends,setOnlineFriends] = useState([]);

    useEffect(() =>{
        const getFriends = async () =>{
            const res = await makeRequest.get('/users/friends/' + currentUserId)
            setFriends(res.data);
        }
        getFriends()
    },[currentUserId]);
    console.log(friends);
    return(
        <div className={styles.online}>
            <div className={styles.onlineFriend}>
                <div className={styles.onlineFriendImgContainer}>
                    <img src="" alt="" />
                    <div className={styles.onlineBadge}>

                    </div>
                </div>
                <span className={styles.onlineUsername}>
                    Test
                </span>
            </div>
        </div>
    )
}