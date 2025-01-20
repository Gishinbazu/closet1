import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpcEnN02bVmy2Rfu6tXF_anlQjQGo2ymY",
  authDomain: "login-form-36290.firebaseapp.com",
  projectId: "login-form-36290",
  storageBucket: "login-form-36290.appspot.com",
  messagingSenderId: "555927709148",
  appId: "1:555927709148:web:86430050a6d79437fc5b19",
  measurementId: "G-Q3PW77BV2T",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only for browser environments)
export let analytics;
if (typeof window !== "undefined") {
  const { getAnalytics } = require("firebase/analytics");
  analytics = getAnalytics(app);
}
