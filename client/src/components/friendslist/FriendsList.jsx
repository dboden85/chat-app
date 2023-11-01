import React, { useEffect, useState } from "react";
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

    useEffect(()=>{
        fetch('http://chat.david-boden.com:5000/api/users')
        .then( response => response.json())
        .then(
            data => setFriends(data)
            )
        .catch(err => console.log(`${err}\nLet Dave or Mark know`));
    },[]);

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
                        <li key={friend.id} className={friend.isonline ? onClass : offClass}>{friend.firstname + ' ' + friend.lastname}</li>
                    ))
                }
                </ul>
            </div>
        </div>
    )
}
export default FriendsList;