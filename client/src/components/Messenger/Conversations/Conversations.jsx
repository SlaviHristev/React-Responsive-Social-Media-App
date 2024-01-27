import styles from './Conversations.module.css';


export default function Conversations(){

    return(
        <div className={styles.conversation}>
            <img className={styles.conversationImg} src='https://images.pexels.com/photos/19991875/pexels-photo-19991875/free-photo-of-sight-mate.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
            <span className={styles.conversationName}>Test</span>

        </div>
    )
}