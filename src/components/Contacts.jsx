import React from "react";
import {NO_AVATAR_IMAGE} from "../configs/constants";
import FirebaseApi from "../api";
import { FaSignOutAlt } from "react-icons/fa";

const Contacts = ({users, messages, currentUser}) => {

    const lastMessage = messages.length ? messages[messages.length -1]: {}
    return (
        <div id="sidepanel">
            <div id="profile">
                <div className="wrap">
                    <img id="profile-img" src={NO_AVATAR_IMAGE} className="online"
                         alt=""/>
                    <p>{currentUser && currentUser.email.slice(0,20)}</p>
                </div>
            </div>
            <div id="contacts">
                <ul>
                    <li className="contact active">
                        <div className="wrap">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBVq-hofdbTwIhneviHhPJbSV70_X3Ei68hAbZWROIwcKOocr1&s" alt=""/>
                            <div className="meta">
                                <p className="name">General Chat</p>
                                <p className="preview">{lastMessage.message}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className={"online-now"}>
                    <span name="online">Users</span>
                    <ul>
                    {users.map(user => (
                        <li className="contact" key={user.email}>
                            <div className="wrap">
                                <span className={`contact-status ${user.isOnline ? "online": "offline"}`}></span>
                                <img src={user.imgUrl || NO_AVATAR_IMAGE}  alt=""/>
                                <div className="meta">
                                    <p className="name">{user.email}</p>
                                    <p className="preview"></p>
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            {currentUser && <div onClick={() => FirebaseApi.signOut(currentUser)} className={"log-out"}>
                Log Out <FaSignOutAlt style={{marginLeft: 5}}/>
            </div>}
        </div>
    )
}

export default Contacts;
