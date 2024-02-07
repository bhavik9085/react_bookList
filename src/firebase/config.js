import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import  { getFirestore } from 'firebase/firestore';

const apiKey = import.meta.env.VITE_SOME_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "books-list-ccc88.firebaseapp.com",
  projectId: "books-list-ccc88",
  storageBucket: "books-list-ccc88.appspot.com",
  messagingSenderId: "640204616007",
  appId: "1:640204616007:web:fece54bcce685054dadc62"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);