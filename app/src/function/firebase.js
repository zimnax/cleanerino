import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAuth, listUsers } from "firebase/auth";
import { OAuthProvider, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyAJcUB2GySinmSTUx06hmTfkjYxcOuH0_k",
  authDomain: "cleanerino-cce9e.firebaseapp.com",
  projectId: "cleanerino-cce9e",
  storageBucket: "cleanerino-cce9e.appspot.com",
  messagingSenderId: "43708442046",
  appId: "1:43708442046:web:24009fedafe34125e585ef",
  measurementId: "G-9H0B0VH4R4",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
const analytics = getAnalytics(app);
