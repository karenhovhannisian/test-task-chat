import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAm4I8AGK2qMYdV71CiClzHV-flhaqDpPU",
    authDomain: "test-task-chat.firebaseapp.com",
    databaseURL: "https://test-task-chat.firebaseio.com",
    projectId: "test-task-chat",
    storageBucket: "test-task-chat.appspot.com",
    messagingSenderId: "1030154136967",
    appId: "1:1030154136967:web:177ef99ce63b377c14b722",
    measurementId: "G-7YFB3TGVBH"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
