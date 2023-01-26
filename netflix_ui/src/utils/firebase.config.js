// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB1D9BZGjYcTMPa_54juJyIitT-Td2SiEY",
  authDomain: "netflix-react-afcce.firebaseapp.com",
  projectId: "netflix-react-afcce",
  storageBucket: "netflix-react-afcce.appspot.com",
  messagingSenderId: "915148621593",
  appId: "1:915148621593:web:dc54d9bc3ff020556ea788"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth =getAuth(app);