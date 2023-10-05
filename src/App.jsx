import React from 'react'
import './App.css'
import Header from './components/Header'
import Conversation from './components/Conversation'
import ChatBox from './components/ChatBox'

function App() {
  
  return (
      <div className="app">
        <div className='app-container'>
          <Header/>
          <Conversation/>
          <ChatBox/>
        </div>
      </div>
  )
}

export default App
