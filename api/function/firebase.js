const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  getAuth,
} = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAJcUB2GySinmSTUx06hmTfkjYxcOuH0_k",
  authDomain: "cleanerino-cce9e.firebaseapp.com",
  projectId: "cleanerino-cce9e",
  storageBucket: "cleanerino-cce9e.appspot.com",
  messagingSenderId: "43708442046",
  appId: "1:43708442046:web:24009fedafe34125e585ef",
  measurementId: "G-9H0B0VH4R4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider("apple.com");
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth(app);

module.exports = {
  firebaseConfig,
  app,
  db,
  facebookProvider,
  appleProvider,
  googleAuthProvider,
  auth,
};
