
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import NavBar from '../Layouts/Main/Navbar/NavBar'
import styles from './Messenger.module.css'

export default function Messenger(){
    const { darkMode } = useContext(DarkModeContext);
    return(
        <>
        <NavBar/>
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
        <div className={styles.messenger}>
            <div className={styles.chatMenu}>
                <div className={styles.chatMenuWrapper}>

                </div>
            </div>
            <div className={styles.chatBox}>
                <div className={styles.chatBoxWrapper}>

                </div>
            </div>
            <div className={styles.chatOnline}>
                <div className={styles.chatOnlineWrapper}>
                    
                </div>
            </div>
        </div>
        </div>
        </>
    )
}