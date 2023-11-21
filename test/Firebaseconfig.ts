// firebase.js
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase Config here
  apiKey: "AIzaSyCy5uHIPDBYNwvlNkZcHKGae58iBSjUo6A",
  authDomain: "coffee-selling-react-app.firebaseapp.com",
  projectId: "coffee-selling-react-app",
  storageBucket: "coffee-selling-react-app.appspot.com",
  messagingSenderId: "839903476869",
  appId: "1:839903476869:web:44313301810b8e492bbdec",
  measurementId: "G-VFW8TGLMWE"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);