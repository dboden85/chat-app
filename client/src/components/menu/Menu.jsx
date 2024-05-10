import React, { useContext } from 'react';
import classes from './Menu.module.css';
import LoginContext from '../login/login-context';

const Menu = (props) => {
    const loginCtx = useContext(LoginContext);

    const onFriendsClick = ()=>{
        props.closeMenu();
        props.openFriends();
    }

    const onConversationsClick = ()=>{
        props.closeMenu();
        props.openConvos();
    }

    const onSignoutHandler = (props) => {
        //fetch('https://api.david-boden.com/api/signout', {
          //  method: 'POST',
            //headers: {
              //  'Content-Type': 'application/json',
            //},
            //body: JSON.stringify({ id: loginCtx.currentUser.id }),
        //})
          //  .then(response => response.json())
          //  .then(data => {
            //    if (data.status) {
              //      loginCtx.logout();
                //} else {
                  //  console.log(data);
                //}
            //})
            //.catch(err => {
              //  console.log(err);
            //})
        loginCtx.logout();
    }

    return (
        <div className={classes.menuContainer}>
            <ul>
                <li onClick={onFriendsClick}>Friends</li>
                <li onClick={onConversationsClick}>Conversations</li>
            </ul>

            <div className={classes['signout-container']}>
                <button onClick={props.closeMenu} className={classes.btn}>Close Menu</button>
                <button onClick={onSignoutHandler} className={classes.btn}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default Menu;
