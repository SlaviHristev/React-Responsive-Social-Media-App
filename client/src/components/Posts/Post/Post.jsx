import { Link } from 'react-router-dom';
import styles from './Post.module.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { useContext, useState } from 'react';
import Comments from '../Comments/Comments';
import moment from 'moment'
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../../axios";
import { AuthContext } from '../../../contexts/AuthContext';

export default function Post({ post }) {
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen,setMenuOpen] = useState(false);
    const { darkMode } = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);

    const {isLoading,error,data} =useQuery(["likes", post.id], () =>
        makeRequest.get("/likes?postId="+post.id).then((res) =>{
            return res.data;
        })
    )
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (liked) =>{
            if(liked) return makeRequest.delete("/likes?postId=" + post.id);
            return makeRequest.post("/likes", {postId:post.id});
        },
        {
            onSuccess: () => {
                
                queryClient.invalidateQueries(["likes"]);
              },
        }
    )
    const handleClick = () =>{
        mutation.mutate(data.includes(currentUser.id))
    }

    const deleteMutation = useMutation(
        (postId) =>{
            return makeRequest.delete("/posts/" + postId);
        },
        {
            onSuccess: () => {
                
                queryClient.invalidateQueries(["posts"]);
              },
        }
    )

    const handleDelete = () =>{
        deleteMutation.mutate(post.id)
    }
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.post}>
                <div className={styles.container}>

                    <div className={styles.user}>
                        <div className={styles.userInfo}>
                            <img src={"/upload/"+post.profilePic} alt="" />
                            <div className={styles.details}>
                                <Link to={`/profile/${post.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <span className={styles.name}>{post.name}</span>
                                    <span className={styles.date}>{moment(post.createdAt).fromNow()}</span>
                                </Link>
                            </div>
                        </div>
                        <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)}/>
                        {(menuOpen && post.userId === currentUser.id)  && <button onClick={handleDelete}>Delete</button>}
                    </div>
                    <div className={styles.content}>
                        <p>{post.desc}</p>
                        <img src={"./upload/" + post.img} alt="" />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.item}>
                            {isLoading ? "loading" : data.includes(currentUser.id)
                            ? <FavoriteIcon onClick={handleClick} style={{color:"red"}} />
                            : <FavoriteBorderIcon onClick={handleClick} />
                            }
                            {data === undefined ? 
                            '0'
                            :data.length} likes
                        </div>
                        <div className={styles.item} onClick={() => setCommentOpen(!commentOpen)}>
                            <TextsmsIcon />
                            2 comments
                        </div>
                        <div className={styles.item}>
                            <ShareIcon />
                            3 shares
                        </div>
                    </div>
                    {commentOpen && <Comments postId={post.id} />}
                </div>
            </div>
        </div>
    )
}