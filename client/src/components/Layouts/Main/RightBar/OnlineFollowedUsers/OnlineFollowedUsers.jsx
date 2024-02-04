import { useQuery } from "react-query";
import { makeRequest } from "../../../../../axios.js";
import styles from './OnlineFollowedUsers.module.css';
import { Link } from "react-router-dom";

export default function OnlineFollowedUsers({darkMode, currentUser , onlineUsers}) {
  const fetchFriends = async (currentUserId) => {
    const res = await makeRequest.get('/users/friends/' + currentUser.id);
    return res.data;
  };
  const { data: friends, isError } = useQuery(['friends', currentUser.id], () => fetchFriends(currentUser.id));

  const onlineFriends = friends?.filter(friend => onlineUsers.some(onlineUser => onlineUser.id === friend.id)) || [];
      
      return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
          <div className={styles.item}>
            <span>Online Friends</span>
            {onlineFriends && Array.isArray(onlineFriends) && onlineFriends.length > 0 ? (
              onlineFriends.map((user) => (
                <div className={styles.user} key={user.id}>
                  <div className={styles.userInfo}>
                    <Link to={`/profile/` + user.id} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <img src={`/upload/` + user.profilePic} alt="" />
                      <div className={styles.online} />
                      <span>{user.username}</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div>No online friends</div>
            )}
          </div>
        </div>
      );
}