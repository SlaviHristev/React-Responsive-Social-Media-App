
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import NavBar from '../Layouts/Main/Navbar/NavBar'
import styles from './Messenger.module.css'
import Conversations from './Conversations/Conversations';
import Message from './Message/Message';
import Online from './Online/Online';
import { AuthContext } from '../../contexts/AuthContext';
import { useQuery } from 'react-query';
import { makeRequest } from '../../axios';

export default function Messenger(){
    const { currentUser } = useContext(AuthContext)
    const { darkMode } = useContext(DarkModeContext);

    const { isLoading, error, data } = useQuery(['conversation'], () =>
    makeRequest.get("/conversations/"+currentUser.id).then((res) =>{
        return res.data
    })
    )
    
    return(
        <>
        <NavBar/>
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
        <div className={styles.messenger}>
            <div className={styles.chatMenu}>
                <div className={styles.chatMenuWrapper}>
                    <input placeholder='Search for friends' className={styles.chatMenuInput}/>
                    {error ? "Something went wrong!" : 
                    isLoading
                    ? "Loading"
                    : data.map(conversation =>(
                        <Conversations key={conversation.id} conversation={conversation} currentUser={currentUser}/>
                    ))}
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