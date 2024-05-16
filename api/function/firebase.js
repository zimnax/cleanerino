const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  getAuth,
} = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const dotenv = require("dotenv");
dotenv.config();
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.FIREBASE_APP_ID,
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
