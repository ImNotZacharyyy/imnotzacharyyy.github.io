// main.js

// THEME TOGGLE
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

function updateThemeBtnText(theme) {
    themeToggleBtn.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

// On load: apply saved theme
let savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeBtnText(savedTheme);

// Toggle theme on click
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeBtnText(newTheme);
});

// /main.js
// 1) Replace with your own Firebase config from the Firebase Console
const firebaseConfig = {

    apiKey: "AIzaSyCXCvtJjto-D9rDw19fAOHe1lE85uxhyOA",

    authDomain: "zacharys-creator-hub.firebaseapp.com",

    projectId: "zacharys-creator-hub",

    storageBucket: "zacharys-creator-hub.firebasestorage.app",

    messagingSenderId: "673541614337",

    appId: "1:673541614337:web:08dda860dfd2109e6f4900",

    measurementId: "G-MG408V56NM"

};


// 2) Init
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 3) DOM
const logoutBtn = document.getElementById('logout-btn');
const adminLoginBtn = document.querySelector('button[onclick*="logi.html"]');

// 4) Helpers
async function ensureUserDoc(user) {
    const ref = db.collection('users').doc(user.uid);
    const snap = await ref.get();
    if (!snap.exists) {
        // New users default to role="user"
        await ref.set({
            email: user.email || '',
            displayName: user.displayName || '',
            role: 'user',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    return (await ref.get()).data();
}

// 5) Auth state
auth.onAuthStateChanged(async (user) => {
    if (!user) {
        // Signed out
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (adminLoginBtn) {
            adminLoginBtn.textContent = 'Admin Login';
            adminLoginBtn.onclick = () => (window.location.href = 'logi.html');
        }
        return;
    }

    // Signed in
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-block';
        logoutBtn.onclick = () => auth.signOut();
    }

    // Make sure they have a profile doc; get role
    const { role = 'user' } = await ensureUserDoc(user);

    // If admin, turn the button into an Admin Panel link
    if (adminLoginBtn) {
        if (role === 'admin') {
            adminLoginBtn.textContent = 'Admin Panel';
            adminLoginBtn.onclick = () => (window.location.href = 'admin.html');
        } else {
            adminLoginBtn.textContent = 'Admin Login';
            adminLoginBtn.onclick = () => (window.location.href = 'logi.html');
        }
    }
});
