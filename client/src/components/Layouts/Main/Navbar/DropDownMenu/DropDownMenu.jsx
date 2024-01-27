import { useContext } from "react";
import styles from "./DropDownMenu.module.css"
import { DarkModeContext } from "../../../../../contexts/DarkModeContext";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../../../../axios";



export default function DropDownMenu({userId}) {
    const { darkMode } = useContext(DarkModeContext);
    const navigate = useNavigate()

    const logout = async () =>{
        try {
            await makeRequest.post('/auth/logout/'+ userId);
            navigate('/login')
        } catch (error) {
            console.error('Logout failed', error);
        }
    }
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.container}>
                <span onClick={logout}>Logout</span>
                
            </div>
        </div>
    )

}