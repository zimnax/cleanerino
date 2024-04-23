import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAuth, listUsers } from "firebase/auth";
import { OAuthProvider, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyADSMKz_NFBoaQX76yLwEYezmmGrLcpQgg",
  authDomain: "cleanerio-b080f.firebaseapp.com",
  projectId: "cleanerio-b080f",
  storageBucket: "cleanerio-b080f.appspot.com",
  messagingSenderId: "546830628956",
  appId: "1:546830628956:web:224344e1a0bf7bfa644e99",
  measurementId: "G-EN68PDV2Q6",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const googleAuthProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
const analytics = getAnalytics(app);
