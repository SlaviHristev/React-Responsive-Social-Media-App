
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../../../../axios.js";
import styles from './Suggestions.module.css';

export default function Suggestions({currentUser,darkMode}){
    const userId = currentUser.id
    const { isLoading, error, data } = useQuery(['users',userId], () => {     
        return makeRequest.get(`/users/notfollowed/${userId}`).then((res) => {
          return res.data;
        });
      });

    
      const queryClient = useQueryClient();
    
      const mutation = useMutation(
        (followedUserId) => {
        console.log(followedUserId);
          if (followedUserId) 
          return makeRequest.post("/relationships",  {userId, followedUserId});
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["relationship"]);
          },
        }
      );
    
      const handleFollow = (followedUserId) => {
        mutation.mutate(followedUserId);
      };

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
                                <button onClick={() => handleFollow(suggestions.id)}>Follow</button>
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