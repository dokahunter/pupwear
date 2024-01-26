// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1ufXIFOcvfaHtj0f-y1OLUHqGu9C_l4M",
  authDomain: "csapat-10.firebaseapp.com",
  databaseURL: "https://csapat-10-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "csapat-10",
  storageBucket: "csapat-10.appspot.com",
  messagingSenderId: "551006749570",
  appId: "1:551006749570:web:64a85db9c526e03c8ec59b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);