// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tripbuddy-51fc0.firebaseapp.com",
  projectId: "tripbuddy-51fc0",
  storageBucket: "tripbuddy-51fc0.firebasestorage.app",
  messagingSenderId: "649827020771",
  appId: "1:649827020771:web:2e79852546b9855ed73ad6",
  measurementId: "G-P9MVMCLMKJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);