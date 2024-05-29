import React, { useRef, useContext } from 'react';
import classes from './ChatBox.module.css';
import LoginContext from '../login/login-context';
import ConvoContext from './convo-context';
import plane from '../../assets/images/paper-plane.svg';

const ChatBox = () => {
  const messRef = useRef();
  const loginCtx = useContext(LoginContext);
  const convoCtx = useContext(ConvoContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const message = messRef.current.value;
    const userid = loginCtx.currentUser.id;
    const name = loginCtx.currentUser.name;
    const isUser = true;

    if(message){
      convoCtx.setNewMess({ message, userid, name, isUser });
    }
    messRef.current.value = '';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior of the Enter key in the textarea (adding a new line)
      onSubmitHandler(e); // Manually call the form's submit handler
    }
  };

  return (
    <div className={classes['chat-box']}>
      <form onSubmit={onSubmitHandler}>
        <div className={classes.text}>
          <textarea ref={messRef} placeholder="Enter Text Here." onKeyPress={handleKeyPress}></textarea>
        </div>
        <div className={classes['sendbutton-container']}>
          <input type="image" src={plane} width="30" height="30" alt="Send" />
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
