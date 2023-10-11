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

  //set login state based on sessionStorage
  useEffect(()=>{
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
  },[]);

  //when the message text changes this will update the ref
  const messageChangeHandler = e =>{
    newMessage.current = e.target.value;
  }

  //add new to message to the conversation
  const messageClickHandler = e => {
    e.preventDefault();

    setConvo([...convo,{
      id: 'c3',
      name: 'David',
      message: newMessage.current,
      isUser: true
    }])
  }


  //manages the events on login
  const loginHandler = (data)=>{
    if(data.status){
      setIsLoggedIn(true);
      setCurrentUser({
        id: data.id,
        name: data.name
      });
      sessionStorage.setItem("isLoggedIn", true)
    }else{
      setIsLoggedIn(false);
    }
    
  }

  //when a conversation is pulled from the database this will mark them as the current user's message or not
  const manageConversations = (chats)=>{
    if(currentUser){
      chats.map(chat => {
        chat.userid === currentUser.id ? chat.isUser = true : chat.isUser = false;
      })
      setConvo(chats);
    }
  }

  //will pull conversations from db when site loads or when currentUser state is changed.
  useEffect(()=>{
    getChat();
  },[currentUser]);

  //separated the fetch to retrieve convos from db because we might need to do this more than once.
  const getChat = ()=>{
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
  }
  
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
