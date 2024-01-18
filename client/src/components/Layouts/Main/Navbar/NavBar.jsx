
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GridViewIcon from '@mui/icons-material/GridView';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightModeIcon from '@mui/icons-material/LightMode';

import styles from './NavBar.module.css'
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { DarkModeContext } from '../../../../contexts/DarkModeContext';
import { AuthContext } from '../../../../contexts/AuthContext';
import DropDownMenu from './DropDownMenu/DropDownMenu';



export default function NavBar() {
    const { darkMode } = useContext(DarkModeContext);
    const { toggle } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);
    const [dropDown,setDropDown] = useState(false);


   
    
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
           
                <div className={styles.navbar}>
                    <div className={styles.left}>
                        <Link to={'/'} style={{ textDecoration: 'none' }}>
                            <span>Socical Media App</span>
                        </Link>
                        <HomeIcon />
                        {darkMode ? <DarkModeIcon onClick={toggle} />
                            : <LightModeIcon onClick={toggle} />}
                        <GridViewIcon />
                        <div className={styles.search}>
                            <SearchIcon />
                            <input type="text" placeholder='Search' />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <PersonIcon style={{cursor:"pointer"}} onClick={() => setDropDown(!dropDown)}/>
                        {dropDown && <DropDownMenu/>}
                        <EmailIcon />
                        <NotificationsIcon />
                        <div className={styles.user}>
                            <img src={"/upload/"+currentUser.profilePic} alt="" />
                            <span>{currentUser.name}</span>
                        </div>
                    </div>
                </div>
           
        </div>
    )
}