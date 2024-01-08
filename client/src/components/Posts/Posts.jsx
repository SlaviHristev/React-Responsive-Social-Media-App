import Post from './Post/Post'
import styles from './Posts.module.css'



export default function Posts() {
    return (

        <div className={styles.posts}>
           {posts.map(post =>(
            <Post key={post.id} post={post}/>
           ))}
        </div>
    )
}
