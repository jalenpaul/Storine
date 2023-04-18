import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithPopup, sendPasswordResetEmail, GoogleAuthProvider } from 'firebase/auth';
import { getStorage, ref, uploadBytes, } from 'firebase/storage';
import { getFirestore, collection, where, getDocs, getDoc, setDoc, doc, query, getDocFromCache, addDoc, serverTimestamp } from 'firebase/firestore';


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
const googleProvider = new GoogleAuthProvider();

function authenticateAccountStatus() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
        sessionStorage.setItem("User", user);
        sessionStorage.setItem("UID", user.uid);
    } else {
        sessionStorage.setItem("User", null);
        sessionStorage.setItem("UID", null);
    }
  });
}

export { auth, onAuthStateChanged, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, googleProvider, signInWithPopup, sendPasswordResetEmail, GoogleAuthProvider,
    storage, ref, uploadBytes,
    firestore, collection, where, getDocs, getDoc, setDoc, doc, query, getDocFromCache, addDoc, serverTimestamp,
    authenticateAccountStatus,
}