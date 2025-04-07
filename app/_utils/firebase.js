// _utils/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8PfzFtC1RyIJnU2EtStlXB9-4vKO6Cl0",
  authDomain: "jeopartrivia.firebaseapp.com",
  projectId: "jeopartrivia",
  storageBucket: "jeopartrivia.firebasestorage.app",
  messagingSenderId: "380060213036",
  appId: "1:380060213036:web:8eee39f7d6da02c9d7d689",
  measurementId: "G-W07Y29PJPN"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
