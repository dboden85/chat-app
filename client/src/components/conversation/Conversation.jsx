import React, { useState, useEffect, useRef, useContext } from 'react';
import classes from './Conversation.module.css';
import ChatBox from './ChatBox';
import ConvoContext from './convo-context';



const Conversation = (props) => {
  const convoRef = useRef(null);
  const convoCtx = useContext(ConvoContext);

  useEffect(() => {
    if (convoRef.current) {
      convoRef.current.scrollTop = convoRef.current.scrollHeight;
    }
  }, [convoCtx.convos]);

  return (
    <div className={classes.convocontainer}>
      <div className={classes.roomName}>
        <p>{convoCtx.roomName}</p>
      </div>
      <div className={classes['convo-box']}>
        <div className={classes.convos} ref={convoRef}>
          {convoCtx.convos.length > 0 ? (
            <ul>
              {convoCtx.convos.map(chat => (
                <li key={chat.id} className={chat.isUser ? classes.right : classes.left}>
                  <p className={classes.message}>{chat.message}</p>
                  <p className={classes.name}>{chat.name} </p>
                </li>
              ))}
            </ul>
          ) : <p className={classes.nomessages}>No Messages</p>}
        </div>
      </div>
      <ChatBox url={props.url} />
    </div>
  );
}

export default Conversation;
