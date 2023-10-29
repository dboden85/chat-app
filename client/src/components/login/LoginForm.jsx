import React, { useRef, useContext } from 'react';
import classes from './Login.module.css';
import LoginContext from './login-context';

const LoginForm = (props) => {
  const userNameRef = useRef();
  const userPassRef = useRef();
  const loginCtx = useContext(LoginContext);

  const onLoginHandler = async (e) => {
    e.preventDefault();
    const userName = userNameRef.current.value;
    const userPass = userPassRef.current.value;

    if (!userName || !userPass) {
      alert('Missing Info');
      return;
    }

    try {
      const response = await fetch(`http://${props.url}:5000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pass: userPass, username: userName }),
      });

      const data = await response.json();

      if (data.status) {
        console.log(data.message);
        loginCtx.login(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error.message);
      alert('An error occurred. Please contact Dave or Mark.');
    }
  };

  const onClickHandler = () => {
    props.setSignup(true);
  };

  return (
    <>
      <h2>Login</h2>
      <form className={classes.loginform} onSubmit={onLoginHandler}>
        <label htmlFor="uname">Username</label>
        <input ref={userNameRef} type="text" id="uname" />
        <label htmlFor="pass">Password</label>
        <input ref={userPassRef} type="password" id="pass" />
        <button type="submit" className={classes.submit}>
          Submit
        </button>
      </form>
      <p>
        Need to sign up?{' '}
        <span className={classes.link} onClick={onClickHandler}>
          Click Here!
        </span>
      </p>
    </>
  );
};

export default LoginForm;
