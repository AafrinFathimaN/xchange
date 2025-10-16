// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcOX_jlulcizj7Ka_AK4UMnCuBYWynSks",
  authDomain: "mutualskillmatch.firebaseapp.com",
  projectId: "mutualskillmatch",
  storageBucket: "mutualskillmatch.firebasestorage.app",
  messagingSenderId: "853357085712",
  appId: "1:853357085712:web:bbd81240c72030b8877695",
  measurementId: "G-90QES6DV4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();