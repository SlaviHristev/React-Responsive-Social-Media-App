import styles from './Online.module.css'

export default function Online(){

    return(
        <div className={styles.online}>
            <div className={styles.onlineFriend}>
                <div className={styles.onlineFriendImgContainer}>
                    <img src="https://images.pexels.com/photos/19991875/pexels-photo-19991875/free-photo-of-sight-mate.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
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