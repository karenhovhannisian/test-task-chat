import React from "react";
import Contacts from "./Contacts";
import Content from "./Content";
import {useChat} from "../hooks/useChat";
import {useAuth} from "../hooks/useAuth";

const Chat = () => {
    const { messages, users } = useChat();
    const { user } = useAuth();
    return (
        <div id="frame">
            <Contacts users={users} currentUser={user} messages={messages} />
            <Content messages={messages} currentUser={user} />
        </div>
    )
};

export default Chat;
