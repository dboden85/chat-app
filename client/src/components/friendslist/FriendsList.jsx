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


    useEffect(() => {
        fetch('http://chat.david-boden.com:5000/api/friendslist', {
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

        fetch('http://chat.david-boden.com:5000/api/startconvo', {
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
                            <li onClick={onFriendClick} data-rname={friend.firstname + ' ' + friend.lastname} data-userid={friend.id} key={friend.id} className={classes.friend}>{friend.firstname + ' ' + friend.lastname}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
export default FriendsList;
