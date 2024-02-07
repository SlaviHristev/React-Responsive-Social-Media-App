import { useQuery } from 'react-query';
import styles from './Conversations.module.css';
import { makeRequest } from '../../../axios';
import { useEffect, useState } from 'react';


export default function Conversations({conversation, currentUser}){
    const [user, setUser] = useState(null);
    useEffect(() => {
        const friendId = conversation.members.find((member) => String(member) !== String(currentUser.id));
    
        const getUser = async () => {
          try {
            const res = await makeRequest("/users/find/" + friendId);
            setUser(res.data);
            console.log(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, [currentUser, conversation]);


    return(
        <div className={styles.conversation}>
            <>
            <img className={styles.conversationImg} src={`/upload/${user?.profilePic}`} alt=''/>
            <span className={styles.conversationName}>{user?.username}</span>
            </>

        </div>
    )
}