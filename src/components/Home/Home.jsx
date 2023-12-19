import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import styles from './Home.module.css'

export default function Home() {
    const { darkMode } = useContext(DarkModeContext);
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.home}>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
            </div>
        </div>
    )
}