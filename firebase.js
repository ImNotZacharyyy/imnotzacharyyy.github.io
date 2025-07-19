// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";




const firebaseConfig = {
    apiKey: "AIzaSyCXCvtJjto-D9rDw19fAOHe1lE85uxhyOA",
    authDomain: "zacharys-creator-hub.firebaseapp.com",
    projectId: "zacharys-creator-hub",
    storageBucket: "zacharys-creator-hub.appspot.com",
    messagingSenderId: "673541614337",
    appId: "1:673541614337:web:e4b1afbcedf1ea2e6f4900",
    measurementId: "G-KHWXN1714X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
