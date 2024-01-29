import styles from './Online.module.css'

export default function Online(){

    return(
        <div className={styles.online}>
            <div className={styles.onlineFriend}>
                <div className={styles.onlineFriendImgContainer}>
                    <img src="" alt="" />
                    <div className={styles.onlineBadge}>

                    </div>
                </div>
                <span className={styles.onlineUsername}>
                    Test
                </span>
            </div>
        </div>
    )
}