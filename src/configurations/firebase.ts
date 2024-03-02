// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVbEuy1EhyRJUFR975b8IhsQj34yStntw",
  authDomain: "social-media-12581.firebaseapp.com",
  projectId: "social-media-12581",
  storageBucket: "social-media-12581.appspot.com",
  messagingSenderId: "193268344363",
  appId: "1:193268344363:web:9d5c895c550e5aec65ac6e",
  measurementId: "G-1GKS96EC53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
