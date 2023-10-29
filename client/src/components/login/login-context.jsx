import React from 'react';

const LoginContext = React.createContext({
    currentUser: {
        id: '',
        name: ''
    },
    isLoggedIn: false,
    login: () => {},
    logout: ()=>{}
});

export default LoginContext;