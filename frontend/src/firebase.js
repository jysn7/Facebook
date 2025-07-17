// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3yJk9V4lL_zfVgUsFsaEBbrOfYDDyKF0",
  authDomain: "facebook-clone-6a6f3.firebaseapp.com",
  projectId: "facebook-clone-6a6f3",
  storageBucket: "facebook-clone-6a6f3.firebasestorage.app",
  messagingSenderId: "563770098174",
  appId: "1:563770098174:web:19ea27fe555dfb48c340af",
  measurementId: "G-RDP09JGQ1T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;