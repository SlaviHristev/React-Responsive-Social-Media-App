import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import styles from './Home.module.css'
import Stories from '../Stories/Stories';
import Posts from '../Posts/Posts';
import Share from '../Share/Share';

export default function Home() {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.home}>
               <Stories/>
               <Share />
               <Posts/>
            </div>
        </div>
    )
}