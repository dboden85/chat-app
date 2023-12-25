import React from 'react';

const ConvoContext = React.createContext({
    convos: [],
    setNewMess: ()=>{},
    getChat: ()=>{}
});

export default ConvoContext;