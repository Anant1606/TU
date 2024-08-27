// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";  // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyCYhrVcYYQEJ2W2unBXinvI1f4lkpSa8ic",
    authDomain: "ecedtiet.firebaseapp.com",
    projectId: "ecedtiet",
    storageBucket: "ecedtiet.appspot.com",
    messagingSenderId: "880633014696",
    appId: "1:880633014696:web:c99ef8eef66d39f286159d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);  // Initialize Firestore
const storage = getStorage(app);  // Initialize Storage

// Export the Firestore and Storage instances
export { db, storage };  // Export only once