import React, { useContext } from 'react';
import classes from "./Header.module.css";
import LoginContext from './login/login-context';

const Header = (props) => {
  const loginCtx = useContext(LoginContext);
  console.log(loginCtx)

  return (
    <div className={classes.header}>
      <div className={classes['signout-container']}>
        <button onClick={loginCtx.logout} className={classes.btn}>Sign Out</button>
      </div>
      <div className={classes['title-container']}>
        <h1>MD CHAT</h1>
      </div>
      
    </div>
  )
}

export default Header;