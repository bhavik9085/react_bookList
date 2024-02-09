import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import  { getFirestore } from 'firebase/firestore';
import axios from "axios";

// var key;

const options = {
  method: 'GET',
  url: "http://localhost:8080",
}

var firebaseConfig = {};
var app = null; 
var auth1 = null; 
var db1 = null;

export async function declarations() {
  try{
    const response = await fetch("http://localhost:8080");
    const APIkey = await response.json();
    firebaseConfig = {
      apiKey: APIkey,
      authDomain: "books-list-ccc88.firebaseapp.com",
      projectId: "books-list-ccc88",
      storageBucket: "books-list-ccc88.appspot.com",
      messagingSenderId: "640204616007",
      appId: "1:640204616007:web:fece54bcce685054dadc62"
    };
    app = initializeApp(firebaseConfig);
    auth1 = getAuth(app);
    db1 = getFirestore(app);
    return {auth1, db1}
  } catch (err){
    console.log(err);
  }
}


// const app = initializeApp(firebaseConfig);


// const apiKey = import.meta.env.VITE_SOME_KEY;

