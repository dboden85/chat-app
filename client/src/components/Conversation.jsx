import React from 'react';
import classes from './Conversation.module.css';

const Conversation = (props) => {

  return (
    <div className={classes['convo-box']}>
      <div className={classes.convos}>
        {props.chats && 
          <ul>
          {
            props.chats.map(chat=>{
              return(
                <li key={chat.id} className={chat.isUser ? classes.right : classes.left}>
                  <p className={classes.message}>{chat.message}</p>
                  <p className={classes.name}>{'-'+chat.name}</p>
                </li>
              )
            })
          }
          </ul>
        }
      </div>
    </div>
  )
}

export default Conversation;