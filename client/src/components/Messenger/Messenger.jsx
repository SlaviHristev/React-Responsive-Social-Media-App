
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import NavBar from '../Layouts/Main/Navbar/NavBar'
import styles from './Messenger.module.css'
import Conversations from './Conversations/Conversations';
import Message from './Message/Message';

export default function Messenger(){
    const { darkMode } = useContext(DarkModeContext);
    return(
        <>
        <NavBar/>
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
        <div className={styles.messenger}>
            <div className={styles.chatMenu}>
                <div className={styles.chatMenuWrapper}>
                    <input placeholder='Search for friends' className={styles.chatMenuInput} />
                    <Conversations/>
                </div>
            </div>
            <div className={styles.chatBox}>
                <div className={styles.chatBoxWrapper}>
                    <div className={styles.chatBoxTop}>
                        <Message/>
                        <Message own={true}/>
                        <Message/>
                    </div>
                    <div className={styles.chatBoxBottom}>

                    </div>
                </div>
            </div>
            <div className={styles.chatOnline}>
                <div className={styles.chatOnlineWrapper}>
                    online
                </div>
            </div>
        </div>
        </div>
        </>
    )
}