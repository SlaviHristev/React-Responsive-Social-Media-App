import { useQuery } from "react-query";
import { makeRequest } from "../../../../../axios.js";
import styles from './OnlineFollowedUsers.module.css';
import { Link } from "react-router-dom";

export default function OnlineFollowedUsers({darkMode, currentUser}) {
    const { isLoading, error, data } = useQuery(['users'], () => {     
        return makeRequest.get(`/users/onlineFollowed/`+ currentUser.id).then((res) => {
          return res.data;
        });
      });
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error loading data: {error.message}</div>;
      }
      
      return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
          <div className={styles.item}>
            <span>Online Friends</span>
            {data && Array.isArray(data) && data.length > 0 ? (
              data.map((user) => (
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
              <div>No online users</div>
            )}
          </div>
        </div>
      );
}