import React, {useState, useEffect} from "react";
import classes from './Login.module.css';


const Login =() => {
    const [users, setUsers] = useState([{}]);

    useEffect(()=>{
        fetch('http://localhost:5000/api/users')
        .then(
            response => response.json()
        )
        .then(
            data => {
            // console.log(data);
            setUsers(data);
            console.log('Users are set')
            }
        )
        .catch(
            err =>{
            alert(err  + '\nLet Dave or Mark know');
            }
        )
        },[])

        if(users.users){
        console.log(users)
        }

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