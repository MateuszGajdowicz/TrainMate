import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBG-UGICOAXPovubhECEcg20754i8vP4xk",
  authDomain: "trainmate-cac91.firebaseapp.com",
  projectId: "trainmate-cac91",
  storageBucket: "trainmate-cac91.appspot.com", 
  messagingSenderId: "650311217588",
  appId: "1:650311217588:web:9d37129cc1d82e1",
  measurementId: "G-NVSK1QD0HC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { db, app, analytics, auth, messaging };


