import React,{ useContext } from 'react'
import './App.css'
import Header from './components/Header'
import Conversation from './components/conversation/Conversation'
import Login from './components/login/Login'
import LoginContext from './components/login/login-context'
import logo from './assets/images/md-logo.png';

const url = 'chat.david-boden.com';
function App() {
  const loginCtx = useContext(LoginContext);
  
  return (
      <div className="app">
        
        {!loginCtx.isLoggedIn ?
        <>
          <img className="logo" src={logo} />
          <Login url={url} />
        </>
          :
        <div className='app-container'>
          <Header/>
          <Conversation url={url}/>
        </div>
        }
        
      </div>
  )

  
}

export default App
