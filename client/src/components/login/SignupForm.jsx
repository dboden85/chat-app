import React, {useRef} from 'react';
import classes from './Login.module.css';


const SignupForm = (props)=>{
    //signup info
    let fname = useRef();
    let lname = useRef();
    let newuser = useRef();
    let newpass = useRef();

    const onSignupHandler = (e)=>{
        e.preventDefault();

        fname = fname.current.value;
        lname = lname.current.value;
        newuser = newuser.current.value;
        newpass = newpass.current.value;

        if(fname && lname && newuser && newpass){
            setUser();
        }else{
            alert('Missing Info');
        }
    }

    const setUser = ()=>{
        fetch('http://' + props.url + ':5000/api/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'fname': fname, 'lname': lname, 'username': newuser, 'pass': newpass})
        })
            .then(
                response => response.json()
            )
            .then(
                data => {
                if(data.status){
                    console.log(data)
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
        props.setSignup(false)
    }

    return(
        <>
        <h2>Chat Signup</h2>
        <form className={classes.loginform} onSubmit={onSignupHandler}>
            <label htmlFor="fname">First Name</label>
            <input ref={fname} type="text" id="fname" />
            <label htmlFor="lname">Last Name</label>
            <input ref={lname} type="text" id="lname" />
            <label htmlFor="newuser">Username</label>
            <input ref={newuser} type="text" id="newuser" />
            <label htmlFor="newpass">Password</label>
            <input ref={newpass} type="password" id="newpass" />
            <input className={classes.submit} type="submit" />
        </form>
        <p>Have an account already? <span className={classes.link} onClick={onClickHandler}>Click Here!</span></p>
        </>
    )
}

export default SignupForm;