// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCYhrVcYYQEJ2W2unBXinvI1f4lkpSa8ic",
    authDomain: "ecedtiet.firebaseapp.com",
    projectId: "ecedtiet",
    storageBucket: "ecedtiet.appspot.com",
    messagingSenderId: "880633014696",
    appId: "1:880633014696:web:c99ef8eef66d39f286159d"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
