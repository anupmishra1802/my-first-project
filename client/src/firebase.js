// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC2-obgr9Fm5BTDC8xxxMKSYEa5F2iKkw",
  authDomain: "resume-builder-mern-resume.firebaseapp.com",
  projectId: "resume-builder-mern-resume",
  storageBucket: "resume-builder-mern-resume.firebasestorage.app",
  messagingSenderId: "356804731665",
  appId: "1:356804731665:web:a2345ed0c66ddeea8b22b0",
  measurementId: "G-HLN83L71FS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase instances
export { app, auth, db };
