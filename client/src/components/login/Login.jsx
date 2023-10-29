import React, { useState } from "react";
import classes from './Login.module.css';
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Login = (props) => {
  const [signup, setSignup] = useState(false);

  return (
    <div className={classes['login-container']}>
      {signup ? <SignupForm url={props.url} setSignup={setSignup} /> : <LoginForm url={props.url} setSignup={setSignup} />}
    </div>
  );
};

export default Login;
