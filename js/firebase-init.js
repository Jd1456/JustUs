import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue, get, remove, update, runTransaction } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
// Copiar la misma configuración que en los HTMLs
const firebaseConfig = {
    apiKey: "AIzaSyCNK7tnh__ZO55p1cffDSPBYmSHMxHDnJ4",
    authDomain: "cartas-justus.firebaseapp.com",
    databaseURL: "https://cartas-justus-default-rtdb.firebaseio.com",
    projectId: "cartas-justus",
    storageBucket: "cartas-justus.firebasestorage.app",
    messagingSenderId: "312127744196",
    appId: "1:312127744196:web:95cffb7f072a70a6874191",
    measurementId: "G-NKWGFCS248"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Re-export, para usar en otros archivos
export { app, db, auth, provider, ref, push, onValue, get, remove, update, runTransaction, signInWithPopup, signOut, onAuthStateChanged };
