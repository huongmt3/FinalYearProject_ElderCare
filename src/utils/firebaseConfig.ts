import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4y26k7ENZtv90CkGB95Hm4r2gAFw0hQE",
  authDomain: "eldercare-9d926.firebaseapp.com",
  databaseURL: "https://eldercare-9d926-default-rtdb.firebaseio.com",
  projectId: "eldercare-9d926",
  storageBucket: "eldercare-9d926.firebasestorage.app",
  messagingSenderId: "516083903595",
  appId: "1:516083903595:web:937a648460c1ad4441952e",
  measurementId: "G-06WB47EG1X"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export const FIREBASE_DB = database;
export const FIREBASE_AUTH = auth;
export const FIREBASE_ANALYTICS = analytics;
export const FIREBASE_APP = app;
export const FIREBASE_FIRESTORE = firestore;