import Bubbles from './Bubbles';
import classes from './Conversation.module.css';

const Conversation = () => {

  const DUMMYCONVO = [
    {
    id : 'c1',
    name : 'Mark',
    message : 'Hi Dave!',
    isUser : false
  },
  {
    id : 'c2',
    name : 'Dave',
    message : 'Hi Mark!',
    isUser : true
  }
]

  return (
    <div className={classes['convo-box']}>
      <div className={classes.convos}>
        <ul>
        {
          DUMMYCONVO.map(chat=>{
            return(
            <Bubbles id={chat.id} isUser={chat.isUser} mess={chat.message}/>
            )
          })
        }
        </ul>
      </div>
    </div>
  )
}

export default Conversation;