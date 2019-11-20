import React from "react";
import firebase from "../configs/firebase"

export const useAuth = () => {
    const [state, setState] = React.useState(() => {
        const user = firebase.auth().currentUser;
        return { initializing: !user, user } })
    function onChange(user) {
        setState({ initializing: false,  user })
    }
    React.useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
        return () => unsubscribe()
    }, [])

    return state
}
