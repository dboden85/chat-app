import React from 'react';

const LoginContext = React.createContext({
    currentUser: {
        id: '',
        name: ''
    },
    isLoggedIn: false,
    login: (data) => {},
    logout: ()=>{}
});

export default LoginContext;