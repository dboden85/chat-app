import React, { useState, useEffect, useRef, useContext } from 'react';
import classes from './Conversation.module.css';
import ChatBox from './ChatBox';
import LoginContext from '../login/login-context';
import io from 'socket.io-client';



const Conversation = (props) => {
  const [convo, setConvo] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const convoRef = useRef(null);
  const loginCtx = useContext(LoginContext);

  const socket = io.connect('http://chat.david-boden.com:5000');

  //use socket.io to send messages out.
  useEffect(() => {
    const sendMessageAndFetchChat = () => {
      if (newMessage.message && loginCtx.currentUser) {
        // Emit the message to the server
        socket.emit('send_message', newMessage);
        setConvo(prev => [...prev, newMessage]);
      }
    };
  
    sendMessageAndFetchChat();

  }, [newMessage]);
  
  //use socket.io to recieve messages.
  useEffect(() => {
    const handleReceivedMessage = (data) => {
      if (data.message && loginCtx.currentUser && data.userid !== loginCtx.currentUser.id) {
        data.isUser = data.userid === loginCtx.currentUser.id;
        setConvo((prev) => [...prev, data]);
      }
    };
  
    socket.on('receive_message', handleReceivedMessage);
  
    return () => {
      socket.off('receive_message', handleReceivedMessage);
    };
  }, [socket]);

  const getChat = async () => {
    // console.log('getChat ran')
    try {
      const response = await fetch(`http://${props.url}:5000/api/chats`);
      const data = await response.json();
      if (loginCtx.currentUser) {
        data.forEach(chat => {
        chat.isUser = chat.userid === loginCtx.currentUser.id;
      });
      setConvo(data);
    }
    } catch (err) {
      console.log(`${err}\nLet Dave or Mark know`);
    }
  };

  useEffect(()=>{
    getChat();
  }, [])

  useEffect(() => {
    if (convoRef.current) {
      convoRef.current.scrollTop = convoRef.current.scrollHeight;
    }
  }, [convo]);

  return (
    <div className={classes.convocontainer}>
      <div className={classes['convo-box']}>
        <div className={classes.convos} ref={convoRef}>
          {convo.length > 0 ? (
            <ul>
              {convo.map(chat => (
                <li key={chat.id} className={chat.isUser ? classes.right : classes.left}>
                  <p className={classes.message}>{chat.message}</p>
                  <p className={classes.name}>{chat.name}</p>
                </li>
              ))}
            </ul>
          ) : <p className={classes.nomessages}>No Messages</p>}
        </div>
      </div>
      <ChatBox url={props.url} setNewMessage={setNewMessage} />
    </div>
  );
}

export default Conversation;
