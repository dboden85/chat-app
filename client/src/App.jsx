import React,{ useState, useEffect, useReducer, useContext } from 'react'
import './App.css'
import Header from './components/Header'
import Conversation from './components/Conversation'
import ChatBox from './components/ChatBox'
import Login from './components/login/Login'

// let userObject = sessionStorage.getItem('currentUser') && JSON.parse(sessionStorage.getItem('currentUser'));

// const defaultLoginState = {
//   currentUser: {
//     id: userObject && userObject.id,
//     name: userObject && userObject.name
//   },
//   isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true' ? true : false,
// }

// const loginReducer = (state, action) =>{
//   if(action.type === 'LOGIN'){
//     sessionStorage.setItem('isLoggedIn', true);
//     sessionStorage.setItem('currentUser', JSON.stringify({id: action.data.id, name: action.data.name}))
//     return{
//       currentUser: {
//         id: action.data.id,
//         name: action.data.name
//       },
//       isLoggedIn: true
//     };
//   }

//   if(action.type === 'LOGOUT'){
//     sessionStorage.setItem('isLoggedIn', false);
//     userObject = {};
//     return {
//       currentUser: {
//         id: '',
//         name: ''
//       },
//       isLoggedIn: false
//     };
//   }

//   return defaultLoginState;
// }

function App() {
  // const [loginState, dispatchLoginAction] = useReducer(loginReducer, defaultLoginState);

  const [convo, setConvo] = useState([])
  const loginCtx = useContext(LoginContext);


  //add new to message to the conversation
  const messageClickHandler = message => {
    getChat();
  }

  //manages the events on login
  // const loginHandler = (data)=>{
  //   if(data.status){
  //     dispatchLoginAction({type: 'LOGIN', data: data});
  //   }
  // }

  //manages events on logout.
  // const logoutHandler = ()=>{
  //   dispatchLoginAction({type: 'LOGOUT'});
  // }

  //when a conversation is pulled from the database this will mark them as the current user's message or not
  const manageConversations = (chats)=>{
    if(loginCtx.loginState.currentUser){
      chats.map(chat => {
        chat.userid === loginCtx.loginState.currentUser.id ? chat.isUser = true : chat.isUser = false;
      })
      setConvo(chats);
    }
  }

  //will pull conversations from db when site loads or when currentUser state is changed.
  // useEffect(()=>{
  //   getChat();
  // },[loginState.currentUser]);

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
  
  // if(loginState.currentUser.id){
  //   setInterval(getChat(), 1000);
  // }
  
  
  return (
      <div className="app">
        {!loginState.isLoggedIn ? <Login setLogin={loginHandler} /> :
        <div className='app-container'>
          <Header setLogin={logoutHandler}/>
          <Conversation chats={convo}/>
          <ChatBox uid={loginState.currentUser.id} uname={loginState.currentUser.name} onSubmit={messageClickHandler}/>
        </div>
        }
        
      </div>
  )

  
}

export default App
