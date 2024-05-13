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

    return (
        <div className={classes.menuContainer}>
            <ul>
                <li onClick={onFriendsClick}>Friends</li>
                <li onClick={onConversationsClick}>Conversations</li>
            </ul>

            <div className={classes['signout-container']}>
                <button onClick={props.closeMenu} className={classes.btn}>Close Menu</button>
                <button onClick={loginCtx.logout} className={classes.btn}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default Menu;
