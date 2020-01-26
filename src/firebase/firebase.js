// Initialize Cloud Firestore through Firebase
import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyArkvEPIK6_QC3otybxIxEZNiKR9iPu9gw",
    authDomain: "listenup-266222.firebaseapp.com",
    projectId: "listenup-266222",
    storageBucket: "listenup-266222.appspot.com",
    messagingSenderId: "398076292858",
    appId: "1:398076292858:web:a2d3ea69494f73126b6343",
    measurementId: "G-B0PG58EYWT"
};

firebase.initializeApp(
    firebaseConfig
);

export const db = firebase.firestore();

export const addUserData = (personData) => {
    db.collection("people").doc(personData.id).set(personData, { merge:true })
}
