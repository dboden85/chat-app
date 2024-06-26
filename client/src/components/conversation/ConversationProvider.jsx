import React, { useState, useContext, useEffect } from 'react';
import ConvoContext from './convo-context';
import io from 'socket.io-client';
import LoginContext from '../login/login-context';

const socket = io.connect('https://api.david-boden.com');

const sRoomNum = sessionStorage.getItem('roomNumber');

const sRoomName = sessionStorage.getItem('roomName');

console.log('rnum: ' + sRoomNum + '\n rname: ' + sRoomName)

const defaultRoom = sRoomNum ? sRoomNum : 1;
const defaultRoomName = sRoomName ? sRoomName : 'Lobby';


const ConversationProvider = (props) => {
  const [convo, setConvo] = useState([]);
  const [room, setRoom] = useState(defaultRoom);
  const [roomName, setRoomName] = useState(defaultRoomName);
  const [newMessage, setNewMessage] = useState({});
  const loginCtx = useContext(LoginContext);

  const joinRoom = () => {
    socket.emit("join_room", { room });
  }

  useEffect(() => {
    joinRoom();
  }, [room])

  const switchToConvo = (rnum, rname) => {
    setRoom(rnum);
    setRoomName(rname);

    sessionStorage.setItem('roomNumber', rnum);

    sessionStorage.setItem('roomName', rname);
  }

  //use socket.io to send messages out.
  useEffect(() => {
    const sendMessageAndFetchChat = () => {
      joinRoom();
      if (newMessage.message && loginCtx.currentUser) {
        // Emit the message to the server
        socket.emit('send_message', { newMessage, room });
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
      const response = await fetch(`https://api.david-boden.com/api/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ room: room }),
      });
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

  useEffect(() => {
    getChat();
  }, [room])

  const convoContext = {
    convos: convo,
    roomName: roomName,
    getChat: getChat,
    setNewMess: setNewMessage,
    switchToConvo: switchToConvo
  };

  return (
    <ConvoContext.Provider value={convoContext}>
      {props.children}
    </ConvoContext.Provider>
  );
}

export default ConversationProvider;
