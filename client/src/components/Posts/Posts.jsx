import Post from './Post/Post'
import styles from './Posts.module.css'
import { useQuery } from 'react-query'
import { makeRequest } from '../../axios'



export default function Posts() {

    const { isLoading, error, data } = useQuery('posts', () =>
        makeRequest.get("/posts").then((res) =>{
            return res.data
        })
  
    )
    return (

        <div className={styles.posts}>
            {error ? "Something went wrong!" : 
            isLoading 
            ? "Loading"
            : data.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}
