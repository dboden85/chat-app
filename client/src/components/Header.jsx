import React, { useContext } from 'react';
import classes from "./Header.module.css";
import LoginContext from './login/login-context';

const Header = () => {
  const loginCtx = useContext(LoginContext);

  return (
    <div className={classes.header}>
      <div className={classes['title-container']}>
        <h1>MD CHAT</h1>
      </div>
      <div className={classes['signout-container']}>
        <button onClick={loginCtx.logout} className={classes.btn}>Sign Out</button>
      </div>     
    </div>
  )
}

export default Header;