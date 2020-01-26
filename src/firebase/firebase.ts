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

const checkValidArr = (a: any) => {
    a.forEach((b : any) => {
        if (!b)
           return false;
    });
    return true;
}

export const addUserData = async (data: any, speaker: string) => {
    console.log("Add User Data");

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    const personModel: any = {
        name: speaker,
        date: dateTime,
        transcript: {
            CONSUMER_GOOD: [],
            LOCATION: [],
            PERSON: [],
            ORGANIZATION: [],
            OTHER: []
        }
    };
    
    // Check for new Person
    var collection = db.collection("people");
    var docRef = collection.doc(personModel.name);
    var doc = await docRef.get();
    if (!doc.exists) {
        console.log("New Person");
        docRef.set(personModel);
    }

    // Insert it
    if (parseFloat(data.score) > 0.75) {
        console.log("Inserting");
        if (data && data.keyPhrase) {
            console.log("Insertion Valid: " + JSON.stringify(data.keyPhrase));
            data.keyPhrase.forEach((phrase: any) => {
                if (phrase && (phrase.type == "CONSUMER_GOOD"
                 || phrase.type == "LOCATION"
                 || phrase.type == "PERSON"
                 || phrase.type == "ORGANIZATION"
                 || phrase.type == "OTHER") && phrase.phrase) {
                    console.log(phrase.type + "now has" + phrase.phrase);
                    personModel.transcript[phrase.type].push(phrase.phrase);
                 }
            });
        }
    }
    if (personModel && personModel.transcript) {
        if (personModel.transcript.CONSUMER_GOOD.length > 0 && checkValidArr(personModel.transcript.CONSUMER_GOOD))
            await docRef.update({
                "transcript.CONSUMER_GOOD": firebase.firestore.FieldValue.arrayUnion(...personModel.transcript.CONSUMER_GOOD)
            })
        if (personModel.transcript.LOCATION.length > 0 && checkValidArr(personModel.transcript.LOCATION))
            await docRef.update({
                "transcript.LOCATION": firebase.firestore.FieldValue.arrayUnion(...personModel.transcript.LOCATION)
            })
        if (personModel.transcript.PERSON.length > 0 && checkValidArr(personModel.transcript.PERSON))
            await docRef.update({
                "transcript.PERSON": firebase.firestore.FieldValue.arrayUnion(...personModel.transcript.PERSON)
            })
        if (personModel.transcript.ORGANIZATION.length > 0 && checkValidArr(personModel.transcript.ORGANIZATION))
            await docRef.update({
                "transcript.ORGANIZATION": firebase.firestore.FieldValue.arrayUnion(...personModel.transcript.ORGANIZATION)
            })
        if (personModel.transcript.OTHER.length > 0 && checkValidArr(personModel.transcript.OTHER))
            await docRef.update({
                "transcript.OTHER": firebase.firestore.FieldValue.arrayUnion(...personModel.transcript.OTHER)
            })
    }
}
