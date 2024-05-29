import React, { useContext, useEffect, useState } from "react";
import classes from './FriendsList.module.css';
import LoginContext from "../login/login-context";
import ConvoContext from "../conversation/convo-context";

const FriendsList = (props) => {
    const [friends, setFriends] = useState([]);

    const loginCtx = useContext(LoginContext);
    const convoCtx = useContext(ConvoContext);

    const Close = () => {
        return (
            <svg onClick={props.closeMenu} xmlns="http://www.w3.org/2000/svg" height="50" width="50" fill="#fff" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
        )
    };

    const Icon = (style) => {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" className={classes.userIcon} height="17" width="17" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
        )
    }


    useEffect(() => {
        fetch('https://api.david-boden.com/api/friendslist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid: loginCtx.currentUser.id }),
        })
            .then(response => response.json())
            .then(
                data => {
                    setFriends(data.friends)
                }
            )
            .catch(err => console.log(`${err}\nLet Dave or Mark know`));
    }, []);

    const onFriendClick = (e) => {

        fetch('https://api.david-boden.com/api/startconvo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid: loginCtx.currentUser.id, friendid: e.target.dataset.userid })
        })
            .then(response => response.json())
            .then(
                data => {
                    if (data.status) {
                        convoCtx.switchToConvo(data.convoid, e.target.dataset.rname);
                        props.closeMenu();
                    }
                }

            )
    }

    return (
        <div className={classes.friendslist}>
            <div className={classes.friendshead}>
                <h2>Friends</h2>
                <Close />
            </div>

            <div className={classes.friends}>
                <ul>
                    {
                        friends.map(friend => (
                            <li onClick={onFriendClick} data-rname={friend.firstname + ' ' + friend.lastname} data-userid={friend.id} key={friend.id} className={classes.friend}><Icon />&nbsp;&nbsp;{friend.firstname + ' ' + friend.lastname}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
export default FriendsList;
