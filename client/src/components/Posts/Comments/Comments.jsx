import { useContext, useState } from 'react';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import styles from './Comments.module.css'
import {AuthContext} from '../../../contexts/AuthContext'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../../axios';
import moment from 'moment';

export default function Comments({postId}) {
    const [desc,setDesc] = useState("")
    const { darkMode } = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext)

    const {isLoading,error,data} = useQuery(["comments"],() =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
        return res.data;
    })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post("/comments", newComment);
        },
        {
            onSuccess: () => {
                
                queryClient.invalidateQueries(["comments"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId});
        setDesc("");
    };

    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.comments}>
                <div className={styles.write}>
                    <img src={'/upload/' + currentUser.profilePic} alt="" />
                    <input type="text" placeholder='Write a comment' value={desc} onChange={e => setDesc(e.target.value)}/>
                    <button onClick={handleClick}>Send</button>
                </div>
                {isLoading 
                ?"loading"
                : data.map(comment => (
                    <div className={styles.comment} key={comment.id}>
                        <img src={'/upload/' + comment.profilePic} alt="" />
                        <div className={styles.info}>
                            <span>{comment.name}</span>
                            <p>{comment.desc}</p>
                        </div>
                        <span className={styles.date}>{moment(comment.createdAt).fromNow()}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}