import React,{ useContext } from 'react'
import './App.css'
import Header from './components/Header'
import Conversation from './components/conversation/Conversation'
import Login from './components/login/Login'
import LoginContext from './components/login/login-context'

const url = 'chat.david-boden.com';
function App() {
  const loginCtx = useContext(LoginContext);
  
  return (
      <div className="app">
        <Header/>
        {!loginCtx.isLoggedIn ? <Login url={url} /> :
        <div className='app-container'>
          
          <Conversation url={url}/>
        </div>
        }
        
      </div>
  )

  
}

export default App
