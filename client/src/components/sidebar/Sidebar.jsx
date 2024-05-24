import React from "react";
import FriendsList from "../friendslist/FriendsList";
import ConversationList from "../conversation/ConversationList";
import Classes from './Sidebar.module.css'

const Sidebar = ()=>{
    return(
        <div className={Classes.sidebar}>
            <ConversationList/>
            <FriendsList/>
        </div>
    )

}

export default Sidebar;