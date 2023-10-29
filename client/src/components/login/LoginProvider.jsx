import React, { useReducer, useEffect } from 'react';
import LoginContext from './login-context';

const defaultLoginState = {
  currentUser: {
    id: '',
    name: '',
  },
  isLoggedIn: false,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      sessionStorage.setItem('isLoggedIn', true);
      sessionStorage.setItem('currentUser', JSON.stringify(action.data));
      return {
        currentUser: { ...action.data },
        isLoggedIn: true,
      };
    case 'LOGOUT':
      sessionStorage.setItem('isLoggedIn', false);
      sessionStorage.removeItem('currentUser');
      return defaultLoginState;
    default:
      return state;
  }
};

const LoginProvider = (props) => {
  const [loginState, dispatchLoginAction] = useReducer(
    loginReducer,
    defaultLoginState
  );

  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      dispatchLoginAction({ type: 'LOGIN', data: userObject });
    }
  }, []);

  const loginHandler = (data) => {
    if (data.status) {
      dispatchLoginAction({ type: 'LOGIN', data });
    }
  };

  const logoutHandler = () => {
    dispatchLoginAction({ type: 'LOGOUT' });
  };

  const loginContext = {
    currentUser: loginState.currentUser,
    isLoggedIn: loginState.isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <LoginContext.Provider value={loginContext}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
