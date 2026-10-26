import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh5WDMu3jHoyQ3HzmBOnBaKBDVYusl7kw",
  authDomain: "kidjourney-3cc97.firebaseapp.com",
  databaseURL: "https://kidjourney-3cc97-default-rtdb.firebaseio.com",
  projectId: "kidjourney-3cc97",
  storageBucket: "kidjourney-3cc97.firebasestorage.app",
  messagingSenderId: "370542903917",
  appId: "1:370542903917:web:3b7319fce633575280b564",
  measurementId: "G-KJP4CCYTYW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
