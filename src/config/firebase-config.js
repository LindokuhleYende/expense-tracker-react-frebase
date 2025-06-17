// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBaEUKlfc2DyhrtI_LyhCk3nTw69LGX4-8",
    authDomain: "expense-tracker-eaebf.firebaseapp.com",
    projectId: "expense-tracker-eaebf",
    storageBucket: "expense-tracker-eaebf.firebasestorage.app",
    messagingSenderId: "869295357480",
    appId: "1:869295357480:web:e7ca64b2ebc029c26abf1d",
    measurementId: "G-2FHM65J1XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//authentication
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);

//firebase login
//firebase init
//firebase deploy