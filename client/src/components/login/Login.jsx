import React, {useState, useEffect, useRef, useContext} from "react";
import classes from './Login.module.css';
import LoginContext from "./login-context";


const Login = (props) => {
    let userName = useRef();
    let userPass = useRef();
    const loginCtx = useContext(LoginContext);

    const userNameChangeHandler = (e)=>{
        setUserName(e.target.value);
    }

    const userPassChangeHandler = (e)=>{
        setUserPass(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        userName = userName.current.value;
        userPass = userPass.current.value;
        if(userName && userPass){
            console.log(userName + ' ' + userPass)
            getUsers();
        }else{
            alert('Missing Info')
        }
        
    }

    const getUsers = ()=>{
        fetch('http://localhost:5000/api/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'pass': userPass, 'username': userName})
        })
            .then(
                response => response.json()
            )
            .then(
                data => {
                if(data.status){
                    console.log('Data: ' + data.message)
                    loginCtx.login(data);
                }else{
                    alert('Please Check your login info and try again.');
                }
                }
            )
            .catch(
                err =>{
                console.log(err  + '\nLet Dave or Mark know');
                }
            )
    }


    return(
        <div className={classes['login-container']}>
            <h2>Chat Login</h2>
            <form className={classes.loginform} action="/" onSubmit={onSubmitHandler}>
                <label htmlFor="uname">Username</label>
                <input ref={userName} type="text" id="uname" />
                <label htmlFor="pass">Password</label>
                <input ref={userPass} type="password" id="pass" />
                <input className={classes.submit} type="submit" />
            </form>
        </div>
    )
}
export default Login;