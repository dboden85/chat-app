import React, {useRef, useContext} from 'react';
import classes from './Login.module.css';
import LoginContext from "./login-context";


const LoginForm = (props)=>{
    //login info
    let userName = useRef();
    let userPass = useRef();

    const loginCtx = useContext(LoginContext);

    const onLoginHandler = (e) => {
        e.preventDefault();
        userName = userName.current.value;
        userPass = userPass.current.value;
        if(userName && userPass){
            getUsers();
        }else{
            alert('Missing Info')
        }
        
    }

    const getUsers = ()=>{
        fetch('http://' + props.url + ':5000/api/login',{
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
                    console.log(data.message);
                    loginCtx.login(data);
                }else{
                    alert(data.message);
                }
                }
            )
            .catch(
                err =>{
                console.error(err  + '\nLet Dave or Mark know');
                }
            )
    }

    const onClickHandler = ()=>{
        props.setSignup(true)
    }

    return(
        <>
        <h2>Login</h2>
        <form className={classes.loginform} action="/" onSubmit={onLoginHandler}>
            <label htmlFor="uname">Username</label>
            <input ref={userName} type="text" id="uname" />
            <label htmlFor="pass">Password</label>
            <input ref={userPass} type="password" id="pass" />
            <input className={classes.submit} type="submit" />
        </form>
        <p>Need to sign up? <span className={classes.link} onClick={onClickHandler}>Click Here!</span></p>
        </>
    )
}

export default LoginForm;