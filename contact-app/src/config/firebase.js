// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCwroXFOiSzZz5_d6YlcVab-1Q0jxIDUQ",
  authDomain: "contact-app-vite-57990.firebaseapp.com",
  projectId: "contact-app-vite-57990",
  storageBucket: "contact-app-vite-57990.firebasestorage.app",
  messagingSenderId: "734776331813",
  appId: "1:734776331813:web:f0d256423138135861f9cc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);