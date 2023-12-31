import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
    

// Here, you can import your seed file
// import { seedDatabase } from '../seed';


const config = {
    //my firebase config
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

// Access FieldValue using firebase.firestore.FieldValue
const FieldValue = firebase.firestore.FieldValue;

// Here is where you can call the seed file (only ONCE)
// seedDatabase(db);
export { db, FieldValue};