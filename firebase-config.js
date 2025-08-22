// Firebase configuration for ToddlerChef AI
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBtDOx9TCWjXiFfViy9QIdaAKKKvc5TBk",
  authDomain: "toddlerchef-ai.firebaseapp.com",
  projectId: "toddlerchef-ai",
  storageBucket: "toddlerchef-ai.firebasestorage.app",
  messagingSenderId: "311740566187",
  appId: "1:311740566187:web:7925f8eb378112bb9085ee",
  measurementId: "G-LQ53VERFYR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Export for use in other files
window.auth = auth;
window.db = db;
window.firebase = firebase;