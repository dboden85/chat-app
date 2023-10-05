import React from 'react';
import classes from './ChatBox.module.css';

const ChatBox = (props) => {
  return (
    <div className={classes['chat-box']}>
      <div className={classes.text}>
        <textarea placeholder='Enter Text Here.'></textarea>
      </div>
      <div className={classes['sendbutton-container']}>
        <button>Send</button>
      </div>
      
    </div>
  )
}

export default ChatBox;