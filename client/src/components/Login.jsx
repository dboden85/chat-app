import React, {useState, useEffect, useRef} from "react";
import classes from './Login.module.css';


const Login = (props) => {
    const [userName, setUserName] = useState(null);
    const [userPass, setUserPass] = useState(null);

    const userNameChangeHandler = (e)=>{
        setUserName(e.target.value);
    }

    const userPassChangeHandler = (e)=>{
        setUserPass(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(userName && userPass){
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
                    props.setLogin(data);
                }else{
                    alert('Please Check your login info and try again.');
                }
                }
            )
            .catch(
                err =>{
                alert(err  + '\nLet Dave or Mark know');
                }
            )
    }

    // const getUsers = ()=>{
    //     fetch('http://localhost:5000/api/users')
    //         .then(
    //             response => response.json()
    //         )
    //         .then(
    //             data => {
    //             // console.log(data);
    //             console.log(data)
    //             }
    //         )
    //         .catch(
    //             err =>{
    //             alert(err  + '\nLet Dave or Mark know');
    //             }
    //         )
    // }


    return(
        <div className={classes['login-container']}>
            <h2>Chat Login</h2>
            <form className={classes.loginform} action="/" onSubmit={onSubmitHandler}>
                <label htmlFor="uname">Username</label>
                <input onChange={userNameChangeHandler} type="text" id="uname" />
                <label htmlFor="pass">Password</label>
                <input onChange={userPassChangeHandler} type="password" id="pass" />
                <input className={classes.submit} type="submit" />
            </form>
        </div>
    )
}
export default Login;