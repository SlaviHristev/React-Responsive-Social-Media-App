import { useContext } from 'react';
import { DarkModeContext } from '../../../../contexts/DarkModeContext';
import styles from './RightBar.module.css'
import LatestActivities from './Activity/Activity';
import { AuthContext } from '../../../../contexts/AuthContext';

export default function RightBar() {
    const { darkMode } = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
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
                    {<LatestActivities userId={currentUser.id}/>}
                    <div className={styles.item}>
                        <span>Online Friends</span>
                        <div className={styles.user}>
                            <div className={styles.userInfo}>
                                <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                                <div className={styles.online} />
                                <span>Sam Doe</span>
                            </div>
                        </div>
                        <div className={styles.user}>
                            <div className={styles.userInfo}>
                                <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                                <div className={styles.online} />
                                <span>Sam Doe</span>
                            </div>
                        </div>
                        <div className={styles.user}>
                            <div className={styles.userInfo}>
                                <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                                <div className={styles.online} />
                                <span>Sam Doe</span>
                            </div>
                        </div>
                        <div className={styles.user}>
                            <div className={styles.userInfo}>
                                <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg" alt="" />
                                <div className={styles.online} />
                                <span>Sam Doe</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}