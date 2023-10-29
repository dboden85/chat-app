import React, { useRef } from 'react';
import classes from './Login.module.css';

const SignupForm = (props) => {
  const fnameRef = useRef();
  const lnameRef = useRef();
  const newuserRef = useRef();
  const newpassRef = useRef();

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
      const response = await fetch(`http://${props.url}:5000/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname,
          lname,
          username: newuser,
          pass: newpass,
        }),
      });

      const data = await response.json();

      if (data.status) {
        console.log(data);
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
