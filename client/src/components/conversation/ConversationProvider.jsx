import React, {useState, useContext, useEffect} from 'react';
import ConvoContext from './convo-context';
import io from 'socket.io-client';
import LoginContext from '../login/login-context';

const ConversationProvider = (props)=>{
    const [convo, setConvo] = useState([]);
    const [room, setRoom] = useState(0);
    const [newMessage, setNewMessage] = useState([]);
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
    try {
      const response = await fetch(`http://chat.david-boden.com:5000/api/chats`);
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

  const convoContext = {
    convos: convo,
    getChat: getChat,
    setNewMess: setNewMessage
  };

  return (
    <ConvoContext.Provider value={convoContext}>
      {props.children}
    </ConvoContext.Provider>
  );
}

export default ConversationProvider;