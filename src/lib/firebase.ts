// Firebase (database) config
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, browserLocalPersistence } from "firebase/auth";

// Validate environment variables
if (!process.env.YOUR_PRIVATE_VARIABLE) {
  throw new Error("Missing Firebase environment variables");
}

/*Call variables from your .env file*/
const firebaseConfig = {
  apiKey: process.env.YOUR_PRIVATE_VARIABLE,
  authDomain: process.env.YOUR_PRIVATE_VARIABLE,
  projectId: process.env.YOUR_PRIVATE_VARIABLE,
  storageBucket: process.env.YOUR_PRIVATE_VARIABLE,
  messagingSenderId: process.env.YOUR_PRIVATE_VARIABLE,
  appId: process.env.YOUR_PRIVATE_VARIABLE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Set persistence to local
auth.setPersistence(browserLocalPersistence);

// Debug logs in development
if (process.env.NODE_ENV === "development") {
  console.log("Firebase initialized:", firebaseConfig.projectId);
}
