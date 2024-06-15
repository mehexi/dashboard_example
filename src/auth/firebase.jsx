// firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCUgRGYiALhI8jiqgeF-MwCvGKwKLc9jQ8",
  authDomain: "admin-dashboard-aa920.firebaseapp.com",
  projectId: "admin-dashboard-aa920",
  storageBucket: "admin-dashboard-aa920.appspot.com",
  messagingSenderId: "534223167900",
  appId: "1:534223167900:web:41c36e77fa8b27a90b2859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
