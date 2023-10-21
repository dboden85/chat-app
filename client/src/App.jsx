import React,{ useState, useEffect, useReducer, useContext } from 'react'
import './App.css'
import Header from './components/Header'
import Conversation from './components/Conversation'
import ChatBox from './components/ChatBox'
import Login from './components/login/Login'
import LoginContext from './components/login/login-context'


function App() {
  const [convo, setConvo] = useState([])
  const loginCtx = useContext(LoginContext);


  //add new to message to the conversation
  const messageClickHandler = message => {
    getChat();
  }


  //when a conversation is pulled from the database this will mark them as the current user's message or not
  const manageConversations = (chats)=>{
    if(loginCtx.currentUser){
      chats.map(chat => {
        chat.userid === loginCtx.currentUser.id ? chat.isUser = true : chat.isUser = false;
      })
      setConvo(chats);
    }
  }

  //separated the fetch to retrieve convos from db because we might need to do this more than once.
  const getChat = ()=>{
    fetch('http://chat.david-boden.com:5000/api/chats')
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

  if(loginCtx.isLoggedIn){
    setInterval(getChat, 500);
  }
  
  
  return (
      <div className="app">
        {!loginCtx.isLoggedIn ? <Login /> :
        <div className='app-container'>
          <Header/>
          <Conversation chats={convo}/>
          <ChatBox uid={loginCtx.currentUser.id} uname={loginCtx.currentUser.name} onSubmit={messageClickHandler}/>
        </div>
        }
        
      </div>
  )

  
}

export default App
