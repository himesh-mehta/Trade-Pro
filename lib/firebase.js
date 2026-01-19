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
  apiKey: "AIzaSyC1Yys-0XECxGEygGkfmlfswHyHtcqNjxc",
  authDomain: "tradepro-704ef.firebaseapp.com",
  projectId: "tradepro-704ef",
  storageBucket: "tradepro-704ef.firebasestorage.app",
  messagingSenderId: "208628226916",
  appId: "1:208628226916:web:c6f8cf5293fa7f12267871",
  measurementId: "G-9WSFD4N7ZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);