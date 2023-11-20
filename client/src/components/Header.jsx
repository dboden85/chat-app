import React, { useContext } from 'react';
import classes from "./Header.module.css";
import LoginContext from './login/login-context';

const Header = () => {
  const loginCtx = useContext(LoginContext);

  const onSignoutHandler = () => {
    fetch('http://chat.david-boden.com:5000/api/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: loginCtx.currentUser.id }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          console.log(data.message);
          loginCtx.logout();
        } else {
          console.log(data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className={classes.header}>
        <>
          <div className={classes.usergreet}>
            <p>Hello {loginCtx.currentUser.name}!</p>
          </div>
          
          <div className={classes['signout-container']}>
            <button onClick={onSignoutHandler} className={classes.btn}>
              Sign Out
            </button>
          </div>
        </>
    </div>
  );
}

export default Header;
