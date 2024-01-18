import { useContext } from "react";
import styles from "./DropDownMenu.module.css"
import { DarkModeContext } from "../../../../../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";



export default function DropDownMenu() {
    const { darkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();

    const logout = () =>{
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.container}>
                <span onClick={logout}>Logout</span>
                
            </div>
        </div>
    )

}