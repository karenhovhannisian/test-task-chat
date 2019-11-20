import React, {useEffect} from "react";
import {MESSAGES_COLLECTION, USERS_COLLECTION} from "../configs/constants";
import FirebaseApi from "../api";

export function useChat() {
    const [loading, setLoading] = React.useState(true);
    const [messages, setMessages] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    useEffect(
        () => {
            FirebaseApi.listenCollection(MESSAGES_COLLECTION, data => {
                setMessages(data);
                setLoading(false);
            })
            FirebaseApi.listenCollection(USERS_COLLECTION, data => {
                setUsers(data);
                setLoading(false);
            }, "isOnline", "desc")
        },
        []
    )

    return {
        loading,
        messages,
        users
    }
}
