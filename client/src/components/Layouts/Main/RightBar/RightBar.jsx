import { useContext, useEffect, useRef, useState } from 'react';
import { DarkModeContext } from '../../../../contexts/DarkModeContext';
import styles from './RightBar.module.css'
import LatestActivities from './Activity/Activity';
import { AuthContext } from '../../../../contexts/AuthContext';
import Suggestions from './Suggestions/Suggestions';
import OnlineFollowedUsers from './OnlineFollowedUsers/OnlineFollowedUsers';
import { io } from 'socket.io-client';
import { makeRequest } from '../../../../axios';

export default function RightBar() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { darkMode } = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
   
      }, [])
    

    useEffect(() => {
        socket.current.emit("addUser", currentUser.id);
        const fetchFollowedFriends = async () => {
        const res = await makeRequest.get('/users/friends/'+currentUser.id);
        const followedFriends = res.data
        socket.current.on('getUsers', users => {
          setOnlineUsers(followedFriends.filter((f) => users.some(u=>u.userId === f.id)))
          
        })
        }
        fetchFollowedFriends()
      }, [currentUser])
    
    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.rightbar}>
                <div className={styles.container}>
                    {<Suggestions currentUser={currentUser} darkMode={darkMode}/>}
                    {<LatestActivities userId={currentUser.id} darkMode={darkMode}/>}
                    {<OnlineFollowedUsers currentUser={currentUser} darkMode={darkMode} onlineUsers={onlineUsers}/>}
                </div>

            </div>
        </div>
    )
}