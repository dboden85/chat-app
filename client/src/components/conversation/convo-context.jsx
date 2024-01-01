import React from 'react';

const ConvoContext = React.createContext({
    convos: [],
    roomName: '',
    setNewMess: () => { },
    getChat: () => { },
    switchToConvo: () => { }
});

export default ConvoContext;