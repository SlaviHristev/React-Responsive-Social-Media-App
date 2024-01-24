
import { useQuery } from "react-query";
import { makeRequest } from "../../../../../axios.js";
import styles from './Suggestions.module.css';

export default function Suggestions({userId,darkMode}){
    
    const { isLoading, error, data } = useQuery(['users'], () => {     
        return makeRequest.get(`/users/notfollowed`).then((res) => {
          return res.data;
        });
      });

      console.log(data);
    return(
        <div className={styles.item}>
                    <span>Suggestions For You</span>
                    {isLoading ? (
                    'loading'
                    ) : data ? ( 
                        data.map((suggestions =>(
                            <div className={styles.user}>
                                <div className={styles.userInfo}>
                                    <img src={`/upload/`+suggestions.profilePic} alt="" />
                                    <span>{suggestions.username}</span>
                                </div>
                                <div className={styles.buttons}>
                                    <button>Follow</button>
                                    <button>Dismiss</button>
                                </div>
                            </div>
                        ))
                        )): (
                            'No suggestions found!'
                          )}
        </div>       
    )
}