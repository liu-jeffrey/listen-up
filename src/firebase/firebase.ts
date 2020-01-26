// Initialize Cloud Firestore through Firebase
import * as firebase from "firebase";
import IPersonDataModel from '../models/PeopleModels';

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

export const addUserData = async (personData: IPersonDataModel) => {
    var collection = db.collection("people");
    var docRef = collection.doc(personData.name);

    var doc = await docRef.get();
    if (doc.exists) {
        if (personData && personData.transcript) {
            docRef.update({
                "transcript.CONSUMER_GOOD": firebase.firestore.FieldValue.arrayUnion(personData.transcript.CONSUMER_GOOD),
                "transcript.LOCATION": firebase.firestore.FieldValue.arrayUnion(personData.transcript.LOCATION),
                "transcript.PERSON": firebase.firestore.FieldValue.arrayUnion(personData.transcript.PERSON),
                "transcript.ORGANIZATION": firebase.firestore.FieldValue.arrayUnion(personData.transcript.ORGANIZATION),
                "transcript.OTHER": firebase.firestore.FieldValue.arrayUnion(personData.transcript.OTHER)
            })
        }
    } else {
        docRef.set(personData);
    }
}
