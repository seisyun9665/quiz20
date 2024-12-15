// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHF3a57OwW6a8aey_O2A6y_gMsBtmjqgg",
  authDomain: "quiz20-a466c.firebaseapp.com",
  projectId: "quiz20-a466c",
  storageBucket: "quiz20-a466c.firebasestorage.app",
  messagingSenderId: "793984209305",
  appId: "1:793984209305:web:1b62b2519467e181908308",
  measurementId: "G-Z2T1816VYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);