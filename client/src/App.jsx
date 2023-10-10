import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Conversation from './components/Conversation'
import ChatBox from './components/ChatBox'

function App() {
  const [users, setUsers] = useState([{}]);
  const [dummyConvo, setDummyConvo] = useState([{
    id: 'c1',
    name: 'David',
    message: 'Hi Mark!',
    isUser: true
  },
  {
    id: 'c2',
    name: 'Mark',
    message: 'Hi Dave!',
    isUser: false
  }
])

  const newMessage = useRef('');

  const messageChangeHandler = e =>{
    newMessage.current = e.target.value;
  }

  const messageClickHandler = e => {
    e.preventDefault();

    setDummyConvo([...dummyConvo,{
      id: 'c3',
      name: 'David',
      message: newMessage.current,
      isUser: true
    }])
  }

  useEffect(()=>{
    fetch('http://192.168.0.121:5000/api/users')
    .then(
      response => response.json()
    )
    .then(
      data => {
        // console.log(data);
        setUsers(data);
        console.log('Users are set')
      }
    )
    .catch(
      err =>{
        alert(err  + '\nLet Dave or Mark know');
      }
    )
  },[])

  if(users.users){
    console.log(users)
  }
  
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
