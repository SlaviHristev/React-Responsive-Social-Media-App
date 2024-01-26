import { useContext } from 'react';
import { DarkModeContext } from '../../../../contexts/DarkModeContext';
import styles from './RightBar.module.css'
import LatestActivities from './Activity/Activity';
import { AuthContext } from '../../../../contexts/AuthContext';
import Suggestions from './Suggestions/Suggestions';
import OnlineFollowedUsers from './OnlineFollowedUsers/OnlineFollowedUsers';

export default function RightBar() {
    const { darkMode } = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);
    
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.rightbar}>
                <div className={styles.container}>
                    {<Suggestions currentUser={currentUser} darkMode={darkMode}/>}
                    {<LatestActivities userId={currentUser.id} darkMode={darkMode}/>}
                    {<OnlineFollowedUsers currentUser={currentUser} darkMode={darkMode}/>}
                </div>

            </div>
        </div>
    )
}