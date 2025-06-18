// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPPErFzRfwmdER241dxyX8-FL_q_u0W7I",
  authDomain: "netflixgpt-c2b80.firebaseapp.com",
  projectId: "netflixgpt-c2b80",
  storageBucket: "netflixgpt-c2b80.firebasestorage.app",
  messagingSenderId: "999805223005",
  appId: "1:999805223005:web:a6f62ff436a5a1753f0db4",
  measurementId: "G-6RD1ZKSPDZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);