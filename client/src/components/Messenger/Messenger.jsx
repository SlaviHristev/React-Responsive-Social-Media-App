
import { useContext, useEffect, useRef, useState } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import NavBar from '../Layouts/Main/Navbar/NavBar'
import styles from './Messenger.module.css'
import Conversations from './Conversations/Conversations';
import Message from './Message/Message';
import Online from './Online/Online';
import { AuthContext } from '../../contexts/AuthContext';
import { makeRequest } from '../../axios';
import { io } from 'socket.io-client';


export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers,setOnlineUsers] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { darkMode } = useContext(DarkModeContext);
  const socket = useRef();
  const scrollRef = useRef();



  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        created_at: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser.id);
    socket.current.on('getUsers', users => {
      setOnlineUsers(users)
    })
  }, [currentUser])


  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await makeRequest.get("/conversations/" + currentUser.id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser.id]);


  useEffect(() => {
    socket.current.on("newMessage", (data) => {
      
      const isCurrentChat =
        currentChat &&
        currentChat.members.includes(String(data.senderId)) &&
        currentChat.members.includes(String(data.recieverId));
        
      if (isCurrentChat) {
        setMessages((prev) => [...prev, data]);
      }
    });
  }, [currentChat]);


  useEffect(() => {
    const getMessages = async () => {
      try {

        const res = await makeRequest.get("/messages/" + currentChat?.id);
        setMessages(res.data);

      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser.id,
      text: newMessage,
      conversation_id: currentChat.id,
    };
    const recieverData = currentChat.members.find(member => String(member) !== String(currentUser.id));

      socket.current.emit("sendMessage", {
        senderId: currentUser.id,
        recieverId: recieverData,
        text: newMessage,

      })
      try {
        const res = await makeRequest.post("/messages", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
        console.log(messages);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    return (
      <>
        <NavBar />
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
          <div className={styles.messenger}>
            <div className={styles.chatMenu}>
              <div className={styles.chatMenuWrapper}>
                <input placeholder='Search for friends' className={styles.chatMenuInput} />
                {Array.isArray(conversations) && conversations.map(conversation => (
                  <div onClick={() => setCurrentChat(conversation)} key={conversation.id}>
                    <Conversations conversation={conversation} currentUser={currentUser} />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.chatBox}>
              <div className={styles.chatBoxWrapper}>
                {currentChat ? (
                  <>
                    <div className={styles.chatBoxTop}>
                      {messages.map((message,index) => (
                        <div ref={scrollRef} key={index}>
                          <Message message={message}  own={String(message.sender) === String(currentUser.id)} />
                        </div>
                      ))}
                    </div>
                    <div className={styles.chatBoxBottom}>
                      <textarea placeholder='Write Something...' className={styles.chatMessage} onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                      <button className={styles.chatSubmitButton} onClick={handleSubmit}>Send</button>
                    </div></>) : <span className={styles.noConversation}>Open a conversation to start a chat.</span>}
              </div>
            </div>
            <div className={styles.chatOnline}>
              <div className={styles.chatOnlineWrapper}>
                <Online onlineUsers={onlineUsers} currentUserId={currentUser.id} setCurrentChat={setCurrentChat}/>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }