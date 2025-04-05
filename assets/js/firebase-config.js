
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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

console.log(firebase.app().name)
