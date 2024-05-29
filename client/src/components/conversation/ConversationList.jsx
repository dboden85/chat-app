import React, { useEffect, useState, useContext } from "react";
import classes from './ConversationList.module.css';
import LoginContext from '../login/login-context';
import ConvoContext from './convo-context';

const ConversationList = (props) => {
    const [conversations, setConversation] = useState([]);
    const loginCtx = useContext(LoginContext);
    const convoCtx = useContext(ConvoContext);

    const Close = () => {
        return (
            <svg onClick={props.closeConvos} xmlns="http://www.w3.org/2000/svg" height="50" width="50" fill="#fff" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        )
    };

    const Icon = () => {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" height="17" width="17"  className={classes.userIcon} viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
        )
    }

    const LobbyIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" height="17" width="17" className={classes.userIcon} viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>
        )
    }

    useEffect(() => {
        fetch('https://api.david-boden.com/api/convo-list', {
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
                    <li data-convoid="1" data-rname="Lobby" key='lobby' className={classes.conversation} onClick={convoClickHandler}><LobbyIcon />&nbsp;&nbsp;Lobby</li>
                    {
                        conversations.map(conversation => (
                            <li data-convoid={conversation.id} data-rname={conversation.firstname + ' ' + conversation.lastname} key={conversation.id} className={classes.conversation} onClick={convoClickHandler}><Icon />&nbsp;&nbsp;{conversation.firstname + ' ' + conversation.lastname}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
export default ConversationList;
