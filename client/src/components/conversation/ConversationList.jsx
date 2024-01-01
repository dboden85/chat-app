import React, { useEffect, useState, useContext } from "react";
import classes from './ConversationList.module.css';
import LoginContext from '../login/login-context';
import ConvoContext from './convo-context';

const ConversationList = (props) => {
    const [conversations, setConversation] = useState([]);
    const loginCtx = useContext(LoginContext);
    const convoCtx = useContext(ConvoContext);

    // console.log(convoCtx.convos)

    const Close = () => {
        return (
            <svg onClick={props.closeConvos} xmlns="http://www.w3.org/2000/svg" height="50" width="50" fill="#fff" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        )
    };

    useEffect(() => {
        fetch('http://chat.david-boden.com:5000/api/convo-list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: loginCtx.currentUser.id }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    setConversation(data.results);
                }
            })
            .catch(err => {
                console.log(err + '\nLet Mark or Dave know');
            })
    }, []);

    const convoClickHandler = (e) => {
        // console.log(e.target.dataset.convoid);

        convoCtx.switchToConvo(e.target.dataset.convoid, e.target.dataset.rname);
        props.closeConvos();
    }

    return (
        <div className={classes.conversationlist}>
            <div className={classes.conversationhead}>
                <h2>Conversations</h2>
                <Close />
            </div>
            <div className={classes.conversations}>
                <ul>
                    <li data-convoid="1" data-rname="Lobby" key='lobby' className={classes.conversation} onClick={convoClickHandler}>Lobby</li>
                    {
                        conversations.map(conversation => (
                            <li data-convoid={conversation.id} data-rname={conversation.firstname + ' ' + conversation.lastname} key={conversation.id} className={classes.conversation} onClick={convoClickHandler}>{conversation.firstname + ' ' + conversation.lastname}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
export default ConversationList;
