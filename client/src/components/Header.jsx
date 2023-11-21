import React, { useContext } from 'react';
import classes from "./Header.module.css";
import LoginContext from './login/login-context';

const Header = () => {
  const loginCtx = useContext(LoginContext);

  const MenuIcon = ()=>{
    return(
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="30px" height="30px" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
    )
  }

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
          <div className={classes.menuIconContainer}>
            <MenuIcon className={classes.menuIcon}/>
          </div>
          
          {/* <div className={classes['signout-container']}>
            <button onClick={onSignoutHandler} className={classes.btn}>
              Sign Out
            </button>
          </div> */}
        </>
    </div>
  );
}

export default Header;
