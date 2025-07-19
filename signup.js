import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const signupForm = document.getElementById('signupForm');
const signupError = document.getElementById('error-msg-signup');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    signupError.textContent = '';

    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, 'users', userCredential.user.uid), {
            role: 'user',
            email: email,
            createdAt: new Date()
        });

        alert('Signup successful! You can now log in.');
        signupForm.reset();
    } catch (error) {
        signupError.textContent = error.message;
    }
});
