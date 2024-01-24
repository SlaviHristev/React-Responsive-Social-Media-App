
import { useQuery } from "react-query";
import { makeRequest } from "../../../../../axios.js";
import styles from './Suggestions.module.css';

export default function Suggestions({userId,darkMode}){
    
    const { isLoading, error, data } = useQuery(['users',userId], () => {     
        return makeRequest.get(`/users/notfollowed/${userId}`).then((res) => {
          return res.data;
        });
      });

    return(
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
        <div className={styles.item}>
                    <span>Suggestions For You</span>
                    {isLoading ? (
                    'loading'
                    ) : data ? ( 
                        data.map((suggestions =>(
                            <div className={styles.user} key={suggestions.id}>
                                <div className={styles.userInfo}>
                                    <img src={`/upload/`+suggestions.profilePic} alt=""/>
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
        </div>
    )
}