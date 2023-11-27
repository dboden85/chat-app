import React, { useEffect, useState } from "react";
import classes from './FriendsList.module.css';

const FriendsList = (props)=>{
    const [setFriends, friends] = useState([]);

    useEffect(()=>{
        fetch('http://chat.david-boden.com:5000/api/users')
        .then( response => response.json())
        .then(
            data => setFriends(data)
            )
        .catch(err => console.log(`${err}\nLet Dave or Mark know`));
    },[]);

useEffect(()=>{
console.log(friends)
},[friends])
}
    
return(
    <div className={classes.friendslist}>
        <div className={classes.friendshead}>
            <div className={classes.froption}>
                <h2>Friends</h2>
            </div>
            
        </div>
        <div className={classes.friends}>
            <ul>
                {
                    friends.map(friend =>(<li key={friend.id} className={classes.friend}>{friend.firstname + ' ' + friend.lastname}</li>))
                }
            </ul>
        </div>
    </div>
)

export default FriendsList;
