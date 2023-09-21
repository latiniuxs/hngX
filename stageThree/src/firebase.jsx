import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL87k1qJjE36apYHlzDxBAVL6YX5yrgzA",
  authDomain: "img-gallery-app.firebaseapp.com",
  projectId: "img-gallery-app",
  storageBucket: "img-gallery-app.appspot.com",
  messagingSenderId: "224580404212",
  appId: "1:224580404212:web:53c1bb6e8e645671daefa1",
  measurementId: "G-HB1GVMF9CL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth,createUserWithEmailAndPassword, signInWithEmailAndPassword };