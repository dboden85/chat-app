import React from 'react';
import classes from "./Header.module.css";

const Header = (props) => {

  return (
    <div className={classes.header}>
      <div className={classes['signout-container']}>
        <button onClick={props.setLogin} className={classes.btn}>Sign Out</button>
      </div>
      <div className={classes['title-container']}>
        <h1>MD CHAT</h1>
      </div>
      
    </div>
  )
}

export default Header;