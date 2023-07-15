// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRquARwfa3AS3v0NwzI92Fe07WhzhkSZQ",
  authDomain: "animovix-8ac08.firebaseapp.com",
  databaseURL: "https://animovix-8ac08-default-rtdb.firebaseio.com",
  projectId: "animovix-8ac08",
  storageBucket: "animovix-8ac08.appspot.com",
  messagingSenderId: "247864058709",
  appId: "1:247864058709:web:3ecee239424662136945dc",
  measurementId: "G-7P6MV8WVMK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
