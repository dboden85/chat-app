import React, { useContext, useRef } from 'react';
import classes from './Login.module.css';
import LoginContext from './login-context';

const SignupForm = (props) => {
  const fnameRef = useRef();
  const lnameRef = useRef();
  const newuserRef = useRef();
  const newpassRef = useRef();
  const loginCtx = useContext(LoginContext);

  const onLoginHandler = async () => {
    const newuser = newuserRef.current.value;
    const newpass = newpassRef.current.value;

    if (!newuser || !newpass) {
      alert('Missing Info');
      return;
    }

    try {
      const response = await fetch(`https://${props.url}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pass: newpass, username: newuser }),
      });

      const data = await response.json();

      if (data.status) {
        loginCtx.login(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
      alert('An error occurred. Please contact Dave or Mark.');
    }
  };

  const onSignupHandler = async (e) => {
    e.preventDefault();

    const fname = fnameRef.current.value;
    const lname = lnameRef.current.value;
    const newuser = newuserRef.current.value;
    const newpass = newpassRef.current.value;

    if (!fname || !lname || !newuser || !newpass) {
      alert('Missing Info');
      return;
    }

    try {
      const response = await fetch(`https://${props.url}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newuser,
          fname,
          lname,
          pass: newpass
        }),
      });

      const data = await response.json();

      if (data.status) {
        onLoginHandler();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(`${error}\nLet Dave or Mark know`);
    }
  };

  const onClickHandler = () => {
    props.setSignup(false);
  };

  return (
    <>
      <h2>Signup</h2>
      <form className={classes.loginform} onSubmit={onSignupHandler}>
        <label htmlFor="fname">First Name</label>
        <input ref={fnameRef} type="text" id="fname" />
        <label htmlFor="lname">Last Name</label>
        <input ref={lnameRef} type="text" id="lname" />
        <label htmlFor="newuser">Username</label>
        <input ref={newuserRef} type="text" id="newuser" />
        <label htmlFor="newpass">Password</label>
        <input ref={newpassRef} type="password" id="newpass" />
        <button type="submit" className={classes.submit}>
          Submit
        </button>
      </form>
      <p>
        Have an account already?{' '}
        <span className={classes.link} onClick={onClickHandler}>
          Click Here!
        </span>
      </p>
    </>
  );
};

export default SignupForm;
