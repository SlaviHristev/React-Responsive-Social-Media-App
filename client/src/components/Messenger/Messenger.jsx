
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import NavBar from '../Layouts/Main/Navbar/NavBar'
import styles from './Messenger.module.css'
import Conversations from './Conversations/Conversations';
import Message from './Message/Message';
import Online from './Online/Online';

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
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                    </div>
                    <div className={styles.chatBoxBottom}>
                        <textarea placeholder='Write Something...' className={styles.chatMessage}></textarea>
                        <button className={styles.chatSubmitButton}>Send</button>
                    </div>
                </div>
            </div>
            <div className={styles.chatOnline}>
                <div className={styles.chatOnlineWrapper}>
                    <Online/>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}