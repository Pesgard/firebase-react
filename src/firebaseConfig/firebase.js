// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBK3YF60kLgRcnFFQ84j6fH1mYh8nchLtA",
  authDomain: "fir-react-1-c94c4.firebaseapp.com",
  projectId: "fir-react-1-c94c4",
  storageBucket: "fir-react-1-c94c4.appspot.com",
  messagingSenderId: "748481991283",
  appId: "1:748481991283:web:8c9db4958ecc0f71569006",
  measurementId: "G-91511TD195"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)