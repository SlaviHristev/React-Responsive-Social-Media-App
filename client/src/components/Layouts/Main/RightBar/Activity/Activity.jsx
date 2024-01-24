
import { useQuery } from "react-query";
import { makeRequest } from "../../../../../axios.js";
import moment from "moment";
import styles from './Activity.module.css';


export default function LatestActivities({userId, darkMode}){
    const { isLoading, error, data } = useQuery(['useractivities'], () => {     
        return makeRequest.get(`/activities`).then((res) => {
          return res.data;
        });
      });
    
    return (
      <div className={darkMode ? styles.lightMode : styles.darkMode}>
        <div className={styles.item}>
          <span>Latest Activities</span>
          {isLoading ? (
            'loading'
          ) : data ? (
            data.map((activity) => (
              <div className={styles.user} key={activity.activityId}>
                <div className={styles.userInfo}>
                  <img src={'/upload/' + activity.profilePic} alt="" />
                  <p>
                    <span>{activity.userName}</span>
                    {activity.activityDetails}
                  </p>
                </div>
                <span>{moment(activity.createdAt).fromNow()}</span>
              </div>
            ))
          ) : (
            'No activities found'
          )}
        </div>
        </div>
      );
}