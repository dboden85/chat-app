import React, { useState, useRef } from 'react'
import './App.css'
import Header from './components/Header'
import Conversation from './components/Conversation'
import ChatBox from './components/ChatBox'

function App() {
  const [dummyConvo, setDummyConvo] = useState([{
    id: 'c1',
    name: 'David',
    message: 'Hi Mark!',
    isUser: true
  }])

  const newMessage = useRef('');


  const messageChangeHandler = e =>{
    newMessage.current = e.target.value;
    console.log(newMessage);
  }

  const messageClickHandler = e => {
    e.preventDefault();

    setDummyConvo([...dummyConvo,{
      id: 'c2',
      name: 'David',
      message: newMessage.current,
      isUser: true
    }]);
  }
  console.log(dummyConvo);
  
  return (
      <div className="app">
        <div className='app-container'>
          <Header/>
          <Conversation chats={dummyConvo}/>
          <ChatBox onClick={messageClickHandler} newMess={messageChangeHandler}/>
        </div>
      </div>
  )
}

export default App
