import React, { useEffect, useState } from "react";
import classes from './FriendsList.module.css';

const FriendsList = (props)=>{
    const [friends, setFriends] = useState([])

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
                <div className={classes.froption}>
                    <h2>Ongoing</h2>
                </div>
                <div className={classes.froption}>
                    <h2>Friends</h2>
                </div>
               
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