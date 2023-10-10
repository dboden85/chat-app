import React from "react";
import classes from './Login.module.css';


const Login =() => {
    return(
        <div className={classes['login-container']}>
            <h2>Chat Login</h2>
            <form className={classes.loginform} action="/">
                <label htmlFor="uname">Username</label>
                <input type="text" name="uname" />
                <label htmlFor="pass">Password</label>
                <input type="password" name="pass" />
            </form>
        </div>
    )
}
export default Login;