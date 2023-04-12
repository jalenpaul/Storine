import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import { getFirestore, collection, where, getDocs, getDoc, setDoc, doc, query, getDocFromCache, } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyC78JkE24QdpotT9CG_SFfMGPxSCNgL4kg",
    authDomain: "storine-d346e.firebaseapp.com",
    projectId: "storine-d346e",
    storageBucket: "storine-d346e.appspot.com",
    messagingSenderId: "201618568108",
    appId: "1:201618568108:web:685a236c038d4f330b0009",
    measurementId: "G-EV8XYDNQKS"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

function authenticateAccountStatus() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          sessionStorage.setItem("User", user);
          // ...
        } else {
          // User is signed out
          // ...
        }
    });
}

export { auth, onAuthStateChanged, 
    storage, 
    firestore, collection, where, getDocs, getDoc, setDoc, doc, query, getDocFromCache,
    authenticateAccountStatus, createUserWithEmailAndPassword, signInWithEmailAndPassword
}