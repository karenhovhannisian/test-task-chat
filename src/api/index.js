import firebase from "../configs/firebase";
import {MESSAGES_COLLECTION, USERS_COLLECTION} from "../configs/constants";
const db = firebase.firestore();

class FirebaseApi {
    static sendMessage(message, from, to){
        return db.collection(MESSAGES_COLLECTION).add({
            message,
            createdAt: new Date(),
            from: from.email,
            to: to || "*"
        })
    }

    static listenCollection(collectionName, cb, orderBy = "createdAt", order = "asc"){
        db.collection(collectionName)
            .orderBy(orderBy, order)
            .onSnapshot({
                includeMetadataChanges: true
            }, querySnapshot => {
                const data = [];
                querySnapshot.forEach(function(doc) {
                    data.push(doc.data());
                });
                cb(data)
            });
    }

    static signUp(data){
            return new Promise((res, reject) => {
                firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                    .then(({user})  => {
                    console.log(user, "createdUser");
                    db.collection(USERS_COLLECTION).add({
                        email: user.email,
                        isOnline: true,
                        createdAt: new Date()
                    }).then(() => res("GOOD"))
                        .catch(err => reject(err))
                    })
                    .catch(e => reject(e))
        })
    }

    static signIn(data){
        return new Promise((res, reject) => {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then(({user}) => {
                    db.collection(USERS_COLLECTION).where("email", "==" , user.email).get().then(user => {
                        db.collection(USERS_COLLECTION).doc(user.docs[0].id).update({isOnline: true})
                    })
                })
                .catch(e => reject(e))
        })
    }

    static signOut(user){
        firebase.auth().signOut().then(() => {
                db.collection(USERS_COLLECTION).where("email", "==" , user.email).get().then(user => {
                    db.collection(USERS_COLLECTION).doc(user.docs[0].id).update({isOnline: false})
                })
            }
        )
    }
}

export default FirebaseApi;
