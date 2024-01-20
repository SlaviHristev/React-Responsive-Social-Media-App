import styles from './ViewStory.module.css'

export default function ViewStory({imageUrl, onClose}){

    return(
        <div className={styles.story}>
            <div className={styles.content}>
                <img src={imageUrl} alt="" />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}