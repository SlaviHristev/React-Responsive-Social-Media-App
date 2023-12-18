import styles from './RightBar.module.css'

export default function RightBar() {
    return (
        <div className={styles.rightbar}>
            <div className={styles.container}>
                <div className={styles.item}>
                    <span>Suggestions For You</span>
                    <div className={styles.user}>
                        <div className={styles.userInfo}>
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                            <span>Sam Doe</span>
                        </div>
                        <div className={styles.buttons}>
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                    <div className={styles.user}>
                        <div className={styles.userInfo}>
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                            <span>Sam Doe</span>
                        </div>
                        <div className={styles.buttons}>
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <span>Latest Activities</span>
                    <div className={styles.user}>
                        <div className={styles.userInfo}>
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                            <p>
                                <span>Sam Doe</span>  Changed their cover picture.
                            </p>
                        </div>
                        <span>2 minutes ago</span>
                    </div>

                    <div className={styles.user}>
                        <div className={styles.userInfo}>
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                            <p>
                                <span>Sam Doe</span>   Changed their cover picture.
                            </p>
                        </div>
                        <span>2 minutes ago</span>
                    </div>
                    <div className={styles.user}>
                        <div className={styles.userInfo}>
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                            <p>
                                <span>Sam Doe</span>  Changed their cover picture.
                            </p>
                        </div>
                        <span>2 minutes ago</span>
                    </div>
                </div>
                <div className={styles.item}>
                    <span>Online Friends</span>
                    <div className={styles.user}>
                        <div className={styles.userInfo}>
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                            <div className={styles.online}/>
                            <span>Sam Doe</span>
                        </div>
                    </div>
                    <div className={styles.user}>
                        <div className={styles.userInfo}>
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                            <div className={styles.online}/>
                            <span>Sam Doe</span>
                        </div>
                    </div>
                    <div className={styles.user}>
                        <div className={styles.userInfo}>
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                            <div className={styles.online}/>
                            <span>Sam Doe</span>
                        </div>
                    </div>
                    <div className={styles.user}>
                        <div className={styles.userInfo}>
                            <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                            <div className={styles.online}/>
                            <span>Sam Doe</span>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    )
}