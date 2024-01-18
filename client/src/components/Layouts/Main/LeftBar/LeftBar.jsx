import styles from './LeftBar.module.css';
import controller from '../../../../assets/controller.png'
import events from '../../../../assets/events.png'
import friends from '../../../../assets/friends.png'
import gallery from '../../../../assets/gallery.png'
import groups from '../../../../assets/groups.png'
import mail from '../../../../assets/mail.png'
import marketplace from '../../../../assets/marketplace.png'
import memories from '../../../../assets/memories.png'
import videos from '../../../../assets/videos.png'
import watch from '../../../../assets/watch.png'
import { useContext } from 'react';
import { DarkModeContext } from '../../../../contexts/DarkModeContext';
import { AuthContext } from '../../../../contexts/AuthContext';



export default function LeftBar() {
    const { darkMode } = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);

    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.leftbar}>
                <div className={styles.container}>
                    <div className={styles.menu}>
                        <div className={styles.user}>
                            <img src={"/upload/"+currentUser.profilePic} alt="" />
                            <span>{currentUser.name}</span>
                        </div>
                        <div className={styles.item}>
                            <img src={friends} alt="" />
                            <span>Friends</span>
                        </div>
                        <div className={styles.item}>
                            <img src={groups} alt="" />
                            <span>Groups</span>
                        </div>
                        <div className={styles.item}>
                            <img src={marketplace} alt="" />
                            <span>Marketplace</span>
                        </div>
                        <div className={styles.item}>
                            <img src={watch} alt="" />
                            <span>Watch</span>
                        </div>
                        <div className={styles.item}>
                            <img src={memories} alt="" />
                            <span>Memories</span>
                        </div>
                        <hr />
                        <div className={styles.menu}>
                            <span>Your Shortcuts</span>
                            <div className={styles.item}>
                                <img src={events} alt="" />
                                <span>Events</span>
                            </div>
                            <div className={styles.item}>
                                <img src={controller} alt="" />
                                <span>Gaming</span>
                            </div>
                            <div className={styles.item}>
                                <img src={gallery} alt="" />
                                <span>Gallery</span>
                            </div>
                            <div className={styles.item}>
                                <img src={videos} alt="" />
                                <span>Videos</span>
                            </div>
                            <div className={styles.item}>
                                <img src={mail} alt="" />
                                <span>Messages</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}