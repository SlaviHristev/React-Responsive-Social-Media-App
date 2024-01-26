import { useQuery } from "react-query";
import { makeRequest } from "../../../../../axios.js";
import styles from './OnlineFollowedUsers.module.css';

export default function OnlineFollowedUsers({darkMode, currentUser}) {
    const { isLoading, error, data } = useQuery(['users'], () => {     
        return makeRequest.get(`/users/onlineFollowed/`+ currentUser.id).then((res) => {
          return res.data;
        });
      });
      console.log(data);
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
        <div className={styles.item}>
            <span>Online Friends</span>
            {isLoading ? (
            'loading'
          ) : data ? (
            data.map((user) => (

            
            <div className={styles.user} key={user.id}>
                <div className={styles.userInfo}>
                    <img src={`/upload/` + user.profilePic} alt="" />
                    <div className={styles.online} />
                    <span>{user.username}</span>
                </div>
            </div>
              ))
              ):
              ("No online users")}
        </div>
        </div>
      
    )
}