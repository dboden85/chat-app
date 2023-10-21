import React, {useReducer} from 'react';
import LoginContext from './login-context';

let userObject = sessionStorage.getItem('currentUser') && JSON.parse(sessionStorage.getItem('currentUser'));

const defaultLoginState = {
    currentUser: {
        id: userObject && userObject.id,
        name: userObject && userObject.name
    },
    isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true' ? true : false,
}

const loginReducer = (state, action) =>{
    if(action.type === 'LOGIN'){
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('currentUser', JSON.stringify({id: action.data.id, name: action.data.name}))
        return{
        currentUser: {
            id: action.data.id,
            name: action.data.name
        },
        isLoggedIn: true
        };
    }

    if(action.type === 'LOGOUT'){
        sessionStorage.setItem('isLoggedIn', false);
        sessionStorage.setItem('currentUser', '')
        userObject = {};
        return {
        currentUser: {
            id: '',
            name: ''
        },
        isLoggedIn: false
        };
    }

    return defaultLoginState;
}

const LoginProvider = props => {

    const [loginState, dispatchLoginAction] = useReducer(loginReducer, defaultLoginState);

    const loginHandler = (data)=>{
        if(data.status){
          dispatchLoginAction({type: 'LOGIN', data: data});
        }
      }
    
      //manages events on logout.
      const logoutHandler = ()=>{
        dispatchLoginAction({type: 'LOGOUT'});
      }

    const loginContext = {
        currentUser: {
            id: loginState.currentUser.id,
            name: loginState.currentUser.name
        },
        isLoggedIn: loginState.isLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }


    return (
        <LoginContext.Provider value={loginContext}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginProvider
