import React, { useState, useEffect, useRef, useContext } from 'react';
import classes from './Conversation.module.css';
import ChatBox from './ChatBox';
import LoginContext from '../login/login-context';

const Conversation = (props) => {
  const [convo, setConvo] = useState([]);
  const convoRef = useRef(null);
  const userScrolledUp = useRef(false);
  const loginCtx = useContext(LoginContext);

  const manageConversations = (chats) => {
    if (loginCtx.currentUser) {
      chats.forEach(chat => {
        chat.isUser = chat.userid === loginCtx.currentUser.id;
      });
      setConvo(chats);
    }
  }

  const getChat = () => {
    fetch(`http://${props.url}:5000/api/chats`)
      .then(response => response.json())
      .then(data => manageConversations(data))
      .catch(err => console.log(`${err}\nLet Dave or Mark know`));
  }

  const handleScroll = () => {
    if (convoRef.current && convoRef.current.scrollTop < convoRef.current.scrollHeight - convoRef.current.clientHeight) {
      userScrolledUp.current = true;
    } else {
      userScrolledUp.current = false;
    }
  };

  useEffect(() => {
    convoRef.current.addEventListener('scroll', handleScroll);

    return () => {
      if (convoRef.current) {
        convoRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (convoRef.current && !userScrolledUp.current) {
      convoRef.current.scrollTop = convoRef.current.scrollHeight;
    }

    getChat();
  }, [convo]);

  return (
    <React.Fragment>
      <div className={classes['convo-box']}>
        <div className={classes.convos} ref={convoRef}>
          {convo.length > 0 && (
            <ul>
              {convo.map(chat => (
                <li key={chat.id} className={chat.isUser ? classes.right : classes.left}>
                  <p className={classes.message}>{chat.message}</p>
                  <p className={classes.name}>{'-' + chat.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ChatBox url={props.url} />
    </React.Fragment>
  );
}

export default Conversation;
