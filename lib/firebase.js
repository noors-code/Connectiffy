// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1BxBBunQPWOZsy0AWKXMJjaqhMSZaERs",
  authDomain: "connectify-6df80.firebaseapp.com",
  databaseURL: "https://connectify-6df80-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "connectify-6df80",
  storageBucket: "connectify-6df80.firebasestorage.app",
  messagingSenderId: "179274040778",
  appId: "1:179274040778:web:7afe4f52704c7ad806fb33",
  measurementId: "G-5KXHG6J59X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Optional: Initialize analytics (only in browser)
let analytics = null;

if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  }).catch((error) => {
    console.error("Failed to initialize Firebase Analytics:", error);
  });
}

export { app, database };