import React, { useState } from "react";
import classes from './FriendsList.module.css';

const FriendsList = (props)=>{
    const [friends, setFriends] = useState([
        {
            id: 1,
            name: 'Mark Noesen',
            userid: 1,
            online: true
        },
        {
            id: 2,
            name: 'Talan Ferugson-Boden',
            userid: 2,
            online: false
        },
        {
            id: 3,
            name: 'Derek Grantham',
            userid: 3,
            online: true
        },
        {
            id: 4,
            name: 'Dave Poopyface',
            userid: 4,
            online: false
        }
    ])

    const onClass = classes.friend + ' ' + classes.online;
    const offClass = classes.friend;

    return(
        <div className={classes.friendslist}>
            <div className={classes.friendshead}>
                <h2>Friends</h2>
            </div>
            <div className={classes.friends}>
                <ul>
                {
                    friends.map(friend =>(
                        <li key={friend.id} className={friend.online ? onClass : offClass}>{friend.name}</li>
                    ))
                }
                </ul>
            </div>
        </div>
    )
}
export default FriendsList;