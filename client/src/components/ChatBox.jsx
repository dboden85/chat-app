import React from 'react';
import classes from './ChatBox.module.css';

const ChatBox = (props) => {
  return (
    <div className={classes['chat-box']}>

      <div className={classes.text}>
        <textarea onChange={props.newMess} placeholder='Enter Text Here.'></textarea>
      </div>
      <div className={classes['sendbutton-container']}>
        <button onClick={props.onClick}>Send</button>
      </div>
      
    </div>
  )
}

export default ChatBox;