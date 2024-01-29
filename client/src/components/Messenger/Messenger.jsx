
import { useContext, useEffect, useRef, useState } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import NavBar from '../Layouts/Main/Navbar/NavBar'
import styles from './Messenger.module.css'
import Conversations from './Conversations/Conversations';
import Message from './Message/Message';
import Online from './Online/Online';
import { AuthContext } from '../../contexts/AuthContext';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';

export default function Messenger(){
    const { currentUser } = useContext(AuthContext)
    const { darkMode } = useContext(DarkModeContext);
    const [currentChat,setCurrentChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef()

    const { isLoading, error, data } = useQuery(['conversation'], () =>
    makeRequest.get("/conversations/"+currentUser.id).then((res) =>{
        return res.data
    })
    )

    const { isLoading: isLoadingMessages, error:messagesError, data:messagesData } = useQuery(['message'], () =>
    makeRequest.get('/messages/' + currentChat?.id).then((res) =>{
        return res.data
    })
    )
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (message) => {
            return makeRequest.post("/messages", message);
        },
        {
            onSuccess: () => {
                
                queryClient.invalidateQueries(["message"]);
            },
        }
    );

    const handleSubmit = async (e) =>{
        e.preventDefault();
        mutation.mutate({
            sender:currentUser.id,
            text: newMessage,
            conversation_id:currentChat.id
        });
        setNewMessage('');
    }

    useEffect(() =>{
        scrollRef.current?.scrollIntoView({behavior:'smooth'});
    },[messagesData])

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
                        <div onClick={() => setCurrentChat(conversation)} key={conversation.id}>
                        <Conversations key={conversation.id} conversation={conversation} currentUser={currentUser}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.chatBox}>
                <div className={styles.chatBoxWrapper}>
                    {messagesData 
                    ?
                   <>
                    <div className={styles.chatBoxTop}>
                    {messagesError ? "Something went wrong!" : 
                    isLoadingMessages
                    ? "Loading..."
                    
                        :messagesData.map(message => (
                            <div ref={scrollRef} key={message.id}>

                            <Message message={message} key={message.id} own={String(message.sender) === String(currentUser.id)}/>
                            </div>
                            
                        ))}
                      
                    </div>
                    <div className={styles.chatBoxBottom}>
                        <textarea placeholder='Write Something...' className={styles.chatMessage} onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                        <button className={styles.chatSubmitButton} onClick={handleSubmit}>Send</button>
                    </div></> : <span className={styles.noConversation}>Open a conversation to start a chat.</span>}
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