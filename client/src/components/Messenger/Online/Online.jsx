import { useEffect, useState } from 'react'
import styles from './Online.module.css'
import { makeRequest } from '../../../axios';

export default function Online({onlineUsers, currentUserId, setCurrentChat}){

    const [friends,setFriends] = useState([]);
    const [onlineFriends,setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await makeRequest.get('/users/friends/' + currentUserId);
                setFriends(res.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };
    
        getFriends();
    }, [currentUserId]);
    
    useEffect(() => {

        const filterOnlineFriends = () => {
            setOnlineFriends(friends.filter(friend => onlineUsers.some(onlineUser => onlineUser.id === friend.id)));
        };
    

        filterOnlineFriends();
    }, [friends, onlineUsers]);


    const handleClick = async (user) =>{
        try {
            const res = await makeRequest(`/conversations/find/${currentUserId}/${user.id}`);
            setCurrentChat(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div className={styles.online}>
            {onlineFriends.map(friend =>(

                <div className={styles.onlineFriend} key={friend.id} onClick={() => handleClick(friend)}>
                <div className={styles.onlineFriendImgContainer}> 
                    <img src={'/upload/' + friend.profilePic} alt="" />
                    <div className={styles.onlineBadge}>

                    </div>
                </div>
                <span className={styles.onlineUsername}>
                    {friend.username}
                </span>
            </div>
                ))}
        </div>
    )
}