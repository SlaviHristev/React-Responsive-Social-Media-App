import { useQuery } from 'react-query';
import styles from './Conversations.module.css';
import { makeRequest } from '../../../axios';


export default function Conversations({conversation, currentUser}){

    const friendId = conversation.members.find((member) => String(member) !== String(currentUser.id));
    const { isLoading, error, data } = useQuery(['users'], () =>
    makeRequest.get("/users/find/"+ friendId).then((res) =>{
        return res.data
    })
    )
    

    return(
        <div className={styles.conversation}>
            <img className={styles.conversationImg} src={`/upload/`+data.profilePic} alt=''/>
            <span className={styles.conversationName}>{data.username}</span>

        </div>
    )
}