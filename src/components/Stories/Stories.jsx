import { useContext } from 'react'
import styles from './Stories.module.css'
import { AuthContext} from '../../contexts/AuthContext'


const stories = [
    {
        id: 1,
        name: 'John Doe',
        img: 'https://images.pexels.com/photos/6605273/pexels-photo-6605273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 2,
        name: 'John Doe',
        img: 'https://images.pexels.com/photos/6605273/pexels-photo-6605273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 3,
        name: 'John Doe',
        img: 'https://images.pexels.com/photos/6605273/pexels-photo-6605273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 4,
        name: 'John Doe',
        img: 'https://images.pexels.com/photos/6605273/pexels-photo-6605273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
   
]

export default function Stories() {
    const {currentUser} = useContext(AuthContext)
    return (

        <div className={styles.stories}>
            <div className={styles.story}>
                    <img src={currentUser.profilePic} alt="" />
                    <span>{currentUser.name}</span>
                    <button>+</button>
                </div>
            {stories.map(story => (
                <div className={styles.story} key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>

            ))}
        </div>
    )
}