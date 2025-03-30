// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSKBs-zNsRZi8AXM64IfvXReWk-Cs270o",
  authDomain: "end-part1.firebaseapp.com",
  projectId: "end-part1",
  storageBucket: "end-part1.firebasestorage.app",
  messagingSenderId: "703556073876",
  appId: "1:703556073876:web:200281a40ddcf0718d7781",
  measurementId: "G-T8B8H0ZPLW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
