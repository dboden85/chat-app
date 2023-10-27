import React, { useRef, useContext } from 'react';
import classes from './ChatBox.module.css';
import LoginContext from '../login/login-context';
import plane from '../../assets/images/paper-plane.svg';

const ChatBox = (props) => {
  const messRef = useRef();
  const loginCtx = useContext(LoginContext);

  function onSubmitHandler(e) {
    e.preventDefault();

    fetch('http://' + props.url + ':5000/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mess: messRef.current.value, uid: loginCtx.currentUser.id, uname: loginCtx.currentUser.name }),
    })
      .then((response) => response.json())
      .then(() => {
        messRef.current.value = ''; // Clear the text area
      });
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
          <input type="image" src={plane} width="30" height="30" />
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
