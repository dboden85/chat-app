import React, {useRef} from 'react';
import classes from './ChatBox.module.css';


const ChatBox = (props) => {
  const messRef = useRef()


function onSubmitHandler(e) {

  e.preventDefault();

  getChat();

  console.log(messRef.current.value)
}

const keyDownHandler = e=>{
  if(e.keyCode === 13){
    getChat();
  }
}

const getChat = ()=>{
  fetch('http://localhost:5000/api/chats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'mess': messRef.current.value, uid: props.uid, uname: props.uname})
  })
  .then(
      response => response.json()
  )
  .then(
    data => {
      props.onSubmit()
      console.log(data);
    }
  )
}

  return (
    <div className={classes['chat-box']}>
      <form action="/" onSubmit={onSubmitHandler}>
        <div className={classes.text}>
          <textarea onKeyDown={keyDownHandler} ref={messRef} placeholder='Enter Text Here.'></textarea>
        </div>
        <div className={classes['sendbutton-container']}>
          <input type="submit" value="Send"/>
        </div>
      </form>      
    </div>
  )
}

export default ChatBox;