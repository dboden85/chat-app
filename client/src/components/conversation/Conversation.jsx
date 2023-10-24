import React, { useState, useEffect, useRef, useContext } from 'react';
import classes from './Conversation.module.css';
import ChatBox from './ChatBox';
import LoginContext from '../login/login-context';

const Conversation = (props) => {
  const [convo, setConvo] = useState([])
  const convoRef = useRef(null);
  const loginCtx = useContext(LoginContext);

  //add new to message to the conversation
  const messageClickHandler = () => {
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

  const getChat = ()=>{
    fetch('http://' + props.url + ':5000/api/chats')
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

  // Scroll to the bottom of the conversation box whenever new messages are added
  useEffect(() => {
    if (convoRef.current) {
      convoRef.current.scrollTop = convoRef.current.scrollHeight;
    }
  }, [convo]);

  useEffect(()=>{
    setInterval(getChat(), 1000);
  },[]);

  return (
    <React.Fragment>
    <div className={classes['convo-box']}>
      <div className={classes.convos} ref={convoRef}>
        {convo && 
          <ul>
            {convo.map(chat => (
              <li key={chat.id} className={chat.isUser ? classes.right : classes.left}>
                <p className={classes.message}>{chat.message}</p>
                <p className={classes.name}>{'-' + chat.name}</p>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
    <ChatBox url={props.url} onSubmit={messageClickHandler}/>
    </React.Fragment>
  );
}

export default Conversation;