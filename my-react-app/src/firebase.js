import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG-UGICOAXPovubhECEcg20754i8vP4xk",
  authDomain: "trainmate-cac91.firebaseapp.com",
  projectId: "trainmate-cac91",
  storageBucket: "trainmate-cac91.firebasestorage.app",
  messagingSenderId: "650311217588",
  appId: "1:650311217588:web:9d37129a957259cc1d82e1",
  measurementId: "G-NVSK1QD0HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app); // Dodajemy db


// Eksportuj Firebase, jeśli chcesz używać go w innych częściach aplikacji
export {db, app, analytics,auth };
