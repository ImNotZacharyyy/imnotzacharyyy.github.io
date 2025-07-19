import { auth, db } from './firebase.js';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('error-msg-login');
const googleBtn = document.getElementById('google-signin-btn');
const provider = new GoogleAuthProvider();

async function getUserRole(uid) {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return userDoc.data().role || 'user';
        }
        return 'user';
    } catch (err) {
        console.error('Error fetching user role:', err);
        return 'user';
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const role = await getUserRole(userCredential.user.uid);

        if (role === 'owner' || role === 'mod') {
            alert(`Welcome back, ${role}! Redirecting to admin...`);
            window.location.href = '/admin.html';
        } else {
            alert("You don't have admin access.");
            window.location.href = '/index.html';
        }
    } catch (error) {
        loginError.textContent = error.message;
    }
});

googleBtn.addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const role = await getUserRole(user.uid);

        if (role === 'owner' || role === 'mod') {
            alert(`Welcome, ${role}! Redirecting to admin...`);
            window.location.href = '/admin.html';
        } else {
            alert("You don't have admin access.");
            window.location.href = '/index.html';
        }
    } catch (error) {
        alert('Google sign-in failed: ' + error.message);
    }
});

