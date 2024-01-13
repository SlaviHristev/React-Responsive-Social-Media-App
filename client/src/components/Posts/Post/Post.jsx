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

export default function Post({ post }) {
    const [commentOpen, setCommentOpen] = useState(false);
    const { darkMode } = useContext(DarkModeContext);


    const liked = false;
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.post}>
                <div className={styles.container}>

                    <div className={styles.user}>
                        <div className={styles.userInfo}>
                            <img src={post.profilePic} alt="" />
                            <div className={styles.details}>
                                <Link to={`/profile/${post.userId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <span className={styles.name}>{post.name}</span>
                                    <span className={styles.date}>2 minutes ago</span>
                                </Link>
                            </div>
                        </div>
                        <MoreHorizIcon />

                    </div>
                    <div className={styles.content}>
                        <p>{post.desc}</p>
                        <img src={"./upload/" + post.img} alt="" />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.item}>
                            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            20 likes
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
                    {commentOpen && <Comments />}
                </div>
            </div>
        </div>
    )
}