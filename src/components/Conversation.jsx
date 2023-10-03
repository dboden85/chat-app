import Bubbles from './Bubbles';
import classes from './Conversation.module.css';

const Conversation = (props) => {
  return (
    <div className={classes['convo-box']}>
      <div className={classes.convos}>
        <Bubbles/>
      </div>
    </div>
  )
}

export default Conversation;