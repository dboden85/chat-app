import React, { useEffect, useRef } from 'react';
import classes from './Conversation.module.css';

const Conversation = (props) => {
  const convoRef = useRef(null);

  // Scroll to the bottom of the conversation box whenever new messages are added
  useEffect(() => {
    if (convoRef.current) {
      convoRef.current.scrollTop = convoRef.current.scrollHeight;
    }
  }, [props.chats]);

  return (
    <div className={classes['convo-box']}>
      <div className={classes.convos} ref={convoRef}>
        {props.chats && 
          <ul>
            {props.chats.map(chat => (
              <li key={chat.id} className={chat.isUser ? classes.right : classes.left}>
                <p className={classes.message}>{chat.message}</p>
                <p className={classes.name}>{'-' + chat.name}</p>
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default Conversation;