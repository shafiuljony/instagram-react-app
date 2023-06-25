import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
    

// Here, you can import your seed file
// import { seedDatabase } from '../seed';


const config = {
    apiKey: "AIzaSyASp6nj1ObRlB__K0h80pqplaDX3jmM2NQ",
    authDomain: "instagram-react-app-9aea6.firebaseapp.com",
    projectId: "instagram-react-app-9aea6",
    storageBucket: "instagram-react-app-9aea6.appspot.com",
    messagingSenderId: "42710354994",
    appId: "1:42710354994:web:86c8cfdad1188a6bac002b"
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

const FieldValue = db.FieldValue;

// Here is where you can call the seed file (only ONCE)
// seedDatabase(db);
export { db, FieldValue};