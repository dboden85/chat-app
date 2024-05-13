import React, {useContext} from "react";
import FriendsList from "../friendslist/FriendsList";
import ConversationList from "../conversation/ConversationList";
import LoginContext from "../login/login-context";
import Classes from './Sidebar.module.css'

const Sidebar = ()=>{
  const loginCtx = useContext(LoginContext);
    return(
        <div className={Classes.sidebar}>
            <ConversationList/>
            <FriendsList/>
            <div className={Classes.signoutContainer}>
                <button onClick={loginCtx.logout} className={Classes.btn}>
                    Sign Out
                </button>
            </div>
        </div>
    )

}

export default Sidebar;