import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import  { getFirestore } from 'firebase/firestore';
import axios from "axios";

// var key;

const options = {
  method: 'GET',
  url: "http://localhost:8080",
}

async function key() {
  try{
    const response = await fetch("http://localhost:8080");
    const APIkey = await response.json();
    return APIkey;
  } catch (err){
    console.log(err);
  }
}

const newVar = await key();
const firebaseConfig = {
  apiKey: newVar,
  authDomain: "books-list-ccc88.firebaseapp.com",
  projectId: "books-list-ccc88",
  storageBucket: "books-list-ccc88.appspot.com",
  messagingSenderId: "640204616007",
  appId: "1:640204616007:web:fece54bcce685054dadc62"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// const apiKey = import.meta.env.VITE_SOME_KEY;

