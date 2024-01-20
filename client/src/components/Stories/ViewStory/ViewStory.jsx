import styles from './ViewStory.module.css'

export default function ViewStory({ story, onClose, currentUser,onDelete }) {
    const isOwner = story.userId === currentUser.id
    return (
        <div className={styles.story}>
            <div className={styles.content}>
                <img src={"/upload/" + story.img} alt="" />
                {isOwner && (
                    <button className={styles.delete} onClick={() => onDelete(story.id)}>
                        Delete
                    </button>
                )}
                <button className={styles.close} onClick={onClose}>Close</button>
            </div>
        </div>
    )
}