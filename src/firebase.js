import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC1jobt2H-NKTvdWAx3Yv6gFHCMYTsbLHg",
    authDomain: "react-app-fca28.firebaseapp.com",
    projectId: "react-app-fca28",
    storageBucket: "react-app-fca28.appspot.com",
    messagingSenderId: "50410625718",
    appId: "1:50410625718:web:4f913322e04ae0d711e417",
    measurementId: "G-B06GESD5E4"
  };


  export const app = initializeApp(firebaseConfig);
  export const storage =  getStorage(app);