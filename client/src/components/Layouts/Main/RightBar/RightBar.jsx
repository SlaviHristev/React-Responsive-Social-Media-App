import { useContext } from 'react';
import { DarkModeContext } from '../../../../contexts/DarkModeContext';
import styles from './RightBar.module.css'
import LatestActivities from './Activity/Activity';
import { AuthContext } from '../../../../contexts/AuthContext';
import Suggestions from './Suggestions/Suggestions';

export default function RightBar() {
    const { darkMode } = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);
    
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.rightbar}>
                <div className={styles.container}>
                    {<Suggestions currentUser={currentUser} darkMode={darkMode}/>}
                    {<LatestActivities userId={currentUser.id} darkMode={darkMode}/>}
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