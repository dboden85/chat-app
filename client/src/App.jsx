import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Conversation from './components/Conversation'
import ChatBox from './components/ChatBox'
import Login from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [convo, setConvo] = useState([])
  const [currentUser, setCurrentUser] = useState()
  const newMessage = useRef('');

  const messageChangeHandler = e =>{
    newMessage.current = e.target.value;
  }

  const messageClickHandler = e => {
    e.preventDefault();

    setConvo([...convo,{
      id: 'c3',
      name: 'David',
      message: newMessage.current,
      isUser: true
    }])
  }

  const loginHandler = (data)=>{
    if(data.status){
      setIsLoggedIn(true);
      setCurrentUser({
        id: data.id,
        name: data.name
      });
      
    }else{
      setIsLoggedIn(false);
    }
    
  }

  const manageConversations = (chats)=>{
    if(currentUser){
      chats.map(chat => {
        chat.userid === currentUser.id ? chat.isUser = true : chat.isUser = false;
      })
      setConvo(chats);
    }
  }

  useEffect(()=>{
    fetch('http://localhost:5000/api/chats')
      .then(
          response => response.json()
      )
      .then(
          data => {
            manageConversations(data);
          }
      )
      .catch(
          err =>{
          alert(err  + '\nLet Dave or Mark know');
          }
      )
  },[currentUser]);
  
  return (
      <div className="app">
        {!isLoggedIn ? <Login setLogin={loginHandler} /> :
        <div className='app-container'>
          <Header setLogin={loginHandler}/>
          <Conversation chats={convo}/>
          <ChatBox onClick={messageClickHandler} newMess={messageChangeHandler}/>
        </div>
        }
        
      </div>
  )
}

export default App
