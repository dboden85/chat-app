import React, { useRef } from 'react';
import classes from './ChatBox.module.css';

const ChatBox = (props) => {
  const messRef = useRef();

  function onSubmitHandler(e) {
    e.preventDefault();

    fetch('http://192.168.1.183:5000/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mess: messRef.current.value, uid: props.uid, uname: props.uname }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.onSubmit();
        console.log(data);
        messRef.current.value = ''; // Clear the text area
      });

    console.log(messRef.current.value);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior of the Enter key in the textarea (adding a new line)
      onSubmitHandler(e); // Manually call the form's submit handler
    }
  }

  return (
    <div className={classes['chat-box']}>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.text}>
          <textarea ref={messRef} placeholder="Enter Text Here." onKeyPress={handleKeyPress}></textarea>
        </div>
        <div className={classes['sendbutton-container']}>
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
