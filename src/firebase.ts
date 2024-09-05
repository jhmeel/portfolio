import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4tKNxXZk_mIr1thHnAEV4xDvizMwm_4k",
  authDomain: "urstrulyjhmeel.firebaseapp.com",
  projectId: "urstrulyjhmeel",
  storageBucket: "urstrulyjhmeel.appspot.com",
  messagingSenderId: "551574237672",
  appId: "1:551574237672:web:6ad24e4d8dd8795a41345d"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);